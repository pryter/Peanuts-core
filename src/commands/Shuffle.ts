import {Controller} from "../lib/controls/Controller";
import {MessageEmbed, VoiceConnection} from "discord.js";

export class Shuffle extends Controller {
  constructor() {
    super();
  }

  getNamespace(): string | null {
    return "m-shuffle"
  }

  protected async runtime(args: Array<string>, connection?: VoiceConnection): Promise<void> {
    this.Queue?.shuffle()
    this.textChannel?.send(new MessageEmbed({title: "Queue shuffled 😵‍💫", description: `Sw${["o"].map(item => {let out = ""; for (let i = 0; i < Math.floor(Math.random() * 10) + 1;i++) {out += item} return out})}sh`}))
  }
}
