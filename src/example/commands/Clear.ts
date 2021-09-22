import {Controller} from "../../lib/controls/Controller";
import {VoiceConnection} from "discord.js";
import {Queue} from "../../lib/controls/Queue";
import {ExampleController} from "../ExampleController";

// Create commands from a custom Controller to apply registered Queue or Player instance
export class Clear extends ExampleController {

  constructor() {
    super();
  }

  getNamespace(): string | null {
    return "m-clear"
  }

  protected async runtime(args: Array<string>, connection?: VoiceConnection): Promise<void> {
    connection?.dispatcher?.end()
    this.Queue?.clear()
    await this.textChannel?.send("Cleared")
  }
}
