import {MessageEmbed, VoiceConnection} from "discord.js";
import {RawTrack} from "../../lib/track/RawTrack";
import {Player} from "../../lib/controls/Player";
import {randomCat} from "../../lib/utils/randomEmoji";
import {ExampleController} from "../ExampleController";
import {checkUrlSource, containsMultipleTracks} from "../../lib/utils/urls";
import {getTracks} from "spotify-url-info";
import {RawTracks} from "../../lib/track/RawTracks";

const apl = require("apple-music-playlist");

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

    let tracks: RawTracks = new RawTracks([])

    if (containsMultipleTracks(keyword)) {
      const trackType = checkUrlSource(keyword)

      switch (trackType) {
        case "spotify": {
          const tracksData = await getTracks(keyword)

          tracks = new RawTracks(tracksData.map(data => (
            new RawTrack(
              `${data.name}${data.artists?.map(
                (person) => (` ${person.name}`))
              }`,
              data.name
            )
          )))
        }
          break
        case "apple": {
          const tracksData = await apl.getPlaylist(keyword)

          tracks = new RawTracks(tracksData.map(
            (data: { title: string, artist: string }) => (
              new RawTrack(`${data.title} ${data.artist}`, data.title)
            )))

        }
          break
      }

    } else {
      tracks = new RawTracks([
        new RawTrack(keyword)
      ])
    }

    const currentTrack = await tracks[0].getPlayableTrack()

    if (currentTrack) {
      if (tracks.length == 1) {
        this.Queue?.addTrack(currentTrack)
        this.textChannel?.send(new MessageEmbed(
          {
            title: `Added to queue ${randomCat()}`,
            description: `[${currentTrack.title}](${currentTrack.url})`
          }
        ))
      }else{
        this.Queue?.addTracks(tracks)
        this.textChannel?.send(
          new MessageEmbed({title: `Playlist added ${randomCat()}`, description: `This playlist contains ${tracks.length} tracks`})
        )
      }

      if (!connection?.dispatcher) {
        await this.Player.play()
      }
    }

  }
}
