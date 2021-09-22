import Discord, {Message} from "discord.js";
import {MessageListener} from "./MessageListener";
import Timeout = NodeJS.Timeout;
import {Controller, ControllerUpdater} from "./Controller";
import {Error} from "../console/Error";
import {Console} from "../console/Console";
import {ConsoleColours} from "../console/ConsoleColours";

export interface ActiveConnections {[guildId: string]: Timeout}

export class Bot {

  private client = new Discord.Client()
  private activeConnections: ActiveConnections = {}
  private listeners: { [command: string]: Controller } = {}
  private errors: Array<Error> = []

  public init(discordToken?: string): void {

    if (this.errors.length > 0) {
      new Error("Could not setup a bot instance.").emit()
      return
    }

    this.client.on("ready", () => {
      new Console("[Info]: Successfully setup a bot instance.").setColour(0, ConsoleColours.GREEN).emit()
    })

    this.client.on("error", (err) => {
      new Error(err.message).emit()
    })

    this.client.on("message", (message) => {
      if (message.author.id !== "784322197476343849") {
        const splitted = message.content.split(" ")
        const cmd = splitted[0]

        if (cmd in this.listeners) {
          this.listeners[cmd].setBotInstance(this)
          this.listeners[cmd].run(message)
        }
      }
    })

    this.client.login(discordToken)
  }

  public register(command: string, listener: Controller): void
  public register(controller: Controller): void
  public register(...controllers: Array<Controller>): void

  public register(...args: Array<string | Controller>): void {

    let controller: Controller
    let namespace: string | undefined
    const error = new Error()

    if (args.length === 2) {
      namespace = <string> args[0]
      controller = <Controller> args[1]
    }else{
      controller = <Controller> args[0]
    }

    if (typeof args[0] !== "string") {
      for (let ctrl of args) {
        this.registerController(namespace, <Controller>ctrl, error)
      }
    }else{
      this.registerController(namespace, controller, error)
    }

  }

  private registerController(namespace: string | undefined, controller: Controller, error: Error): void {
    if (!namespace) {
      const ns = controller.getNamespace()
      if (!ns) {
        error.setHint(`Missing \`getNamespace\` method`).emit()
        this.errors?.push(error)
        return;
      }
      namespace = ns
    }

    if (namespace in this.listeners) {
      error.setHint(`Duplicated namespace \`${namespace}\``).emit()
      this.errors?.push(error)
      return;
    }

    this.listeners[namespace] = controller
  }

  public getActiveConnection(guildId: string | undefined): Timeout | undefined {
    if (guildId) {
      return this.activeConnections[guildId]
    }

    return undefined
  }

  public clearActiveConnection(guildId: string | undefined): void {
    if (!guildId) return

    if (guildId in this.activeConnections) {
      clearTimeout(this.activeConnections[guildId])
    }
  }

  public setActiveConnection(guildId: string | undefined, timeout: Timeout): void {
    this.clearActiveConnection(guildId)
    if (guildId) {
      this.activeConnections[guildId] = timeout
    }
  }

}

