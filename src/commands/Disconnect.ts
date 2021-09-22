import {Controller} from "../lib/controls/Controller";
import {VoiceConnection} from "discord.js";

export class Disconnect extends Controller {

  protected isRequireConnection(): boolean {
    return true
  }

  getNamespace(): string | null {
    return "m-bye"
  }

  protected async runtime(args: Array<string>, connection?: VoiceConnection): Promise<void> {
    if (connection) {
      connection.disconnect()
    }
  }
}
