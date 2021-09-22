import {Controller} from "../../lib/controls/Controller";
import {VoiceConnection} from "discord.js";
import {ExampleController} from "../ExampleController";

// Create commands from a custom Controller to apply registered Queue or Player instance
export class Disconnect extends ExampleController {

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
