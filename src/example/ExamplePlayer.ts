import {Player} from "../lib/controls/Player";
import {PlayableTrack} from "../lib/track/PlayableTrack";
import {MessageEmbed} from "discord.js";
import {Controller} from "../lib/controls/Controller";

export class ExamplePlayer extends Player {

  // IMPORTANT: Custom Player class needs to be registered in Controller class

  constructor(Controller: Controller) {
    super(Controller);
  }

  // Methods for overriding

  protected isAutoDisconnect(): boolean {
    return super.isAutoDisconnect() // Default: true
  }

  protected getIdleTime(): number {
    return super.getIdleTime() // Default: 5 * 60 * 1000
  }

  protected getNowPlayingText(track: PlayableTrack): string | MessageEmbed {
    return super.getNowPlayingText(track); // Default: new MessageEmbed({title: "Now playing ✨", description: `[${track.title}](${track.url})`})
  }

  protected getAutoDisconnectText(): string | MessageEmbed {
    return super.getAutoDisconnectText(); // Default: new MessageEmbed({description: "Disconnected due to inactivity. If you want me to stay in the voice channel 24/7, request a song with meow command."})
  }

}
