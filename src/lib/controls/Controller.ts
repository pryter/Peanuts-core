import {Bot} from "./Bot";
import {Message, TextChannel, VoiceChannel, VoiceConnection} from "discord.js";
import {Queue} from "./Queue";
import {Storage} from "../storage/Storage";
import {Player} from "./Player";
import {VoiceAction} from "./VoiceAction";


export type VoiceConnCallback = ((connection: VoiceConnection) => any) | ((connection: VoiceConnection) => Promise<any>)
export type ControllerUpdater = (message: Message) => void

export class Controller extends VoiceAction {

  protected BotInstance: Bot | undefined

  // Built-in player or extended player
  protected Player: Player

  constructor(BotInstance?: Bot) {
    super()
    this.BotInstance = BotInstance
    this.Player = this.getPlayerInstance()
  }

  // Main Methods

  protected getQueueInstance(): Queue {
    return new Queue(new Storage("queue"))
  }

  protected getPlayerInstance(): Player {
    return new Player(this)
  }

  public getNamespace(): string | null {
    return null
  }

  protected isRequireConnection(): boolean {
    return true
  }

  protected async runtime(args: Array<string>, connection?: VoiceConnection): Promise<void> {

  }


  // Utility Methods

  public setBotInstance(BotInstance: Bot) {
    this.BotInstance = BotInstance
  }

  public async run(messageInstance: Message) {

    this.textChannel = <TextChannel>messageInstance.channel
    this.voiceChannel = <VoiceChannel>messageInstance.member?.voice.channel
    this.guildId = messageInstance.member?.guild.id
    this.Queue = this.getQueueInstance().setGuildId(this.guildId)

    const splitted = messageInstance.content.split(" ")
    splitted.shift()
    const args = splitted

    if (this.isRequireConnection()) {
      await this.connectAndRun(async (connection) => {
        await this.runtime(args, connection)
      })
    } else {
      await this.runtime(args)
    }

  }

  public initPlayer(): { textChannel: TextChannel | undefined, voiceChannel: VoiceChannel | undefined, guildId: string | undefined, Queue: Queue | undefined, BotInstance: Bot } {
    return {textChannel: this.textChannel, voiceChannel: this.voiceChannel, guildId: this.guildId, Queue: this.Queue, BotInstance: <Bot>this.BotInstance}
  }

}
