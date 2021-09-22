import {Controller} from "../../lib/controls/Controller";
import {MessageEmbed, VoiceConnection} from "discord.js";
import {RawTrack} from "../../lib/track/RawTrack";
import {Player} from "../../lib/controls/Player";
import {randomCat} from "../../lib/utils/randomEmoji";
import {ExampleController} from "../ExampleController";

// Create commands from a custom Controller to apply registered Queue or Player instance
export class Play extends ExampleController {

  constructor() {
    super();
  }

  getNamespace(): string | null {
    return "m-play"
  }

  protected async runtime(args: Array<string>, connection?: VoiceConnection): Promise<void> {
    const keyword = args.join(" ")

    const track = await new RawTrack(keyword).getPlayableTrack()
    if (track) {
      this.Queue?.addTrack(track)
      this.textChannel?.send(new MessageEmbed({title: `Added to queue ${randomCat()}`, description: `[${track.title}](${track.url})`}))
    }

    if (!connection?.dispatcher) {
      await new Player(this).play()
    }
  }
}
