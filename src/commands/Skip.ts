import {Controller} from "../lib/controls/Controller";
import {VoiceConnection} from "discord.js";
import {Player} from "../lib/controls/Player";

export class Skip extends Controller {

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
