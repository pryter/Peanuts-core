import {Controller} from "../../lib/controls/Controller";
import {VoiceConnection} from "discord.js";
import {Player} from "../../lib/controls/Player";
import {ExampleController} from "../ExampleController";

// Create commands from a custom Controller to apply registered Queue or Player instance
export class Skip extends ExampleController {

  constructor() {
    super();
  }

  getNamespace(): string | null {
    return "m-skip"
  }

  protected isRequireConnection(): boolean {
    return false
  }

  protected async runtime(args: Array<string>, connection?: VoiceConnection): Promise<void> {
    this.Queue?.skip()
    await this.Player.play()
  }
}
