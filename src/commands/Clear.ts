import {Controller} from "../lib/controls/Controller";
import {VoiceConnection} from "discord.js";
import {Queue} from "../lib/controls/Queue";

export class Clear extends Controller {

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
