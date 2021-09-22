import {Controller, VoiceConnCallback} from "./Controller";
import {MessageEmbed, TextChannel, VoiceChannel, VoiceConnection} from "discord.js";
import {Queue} from "./Queue";
import {PlayableTrack} from "../track/PlayableTrack";
import {Bot} from "./Bot";
import {VoiceAction} from "./VoiceAction";

export class Player extends VoiceAction {

  private BotInstance: Bot

  constructor(Controller: Controller) {
    super()
    const data = Controller.initPlayer()
    this.textChannel = data.textChannel
    this.guildId = data.guildId
    this.voiceChannel = data.voiceChannel
    this.Queue = data.Queue
    this.BotInstance = data.BotInstance
  }

  // Methods for overriding

  protected getNowPlayingText(track: PlayableTrack): string | MessageEmbed {
    return new MessageEmbed({title: "Now playing ✨", description: `[${track.title}](${track.url})`})
  }

  protected getAutoDisconnectText(): string | MessageEmbed {
    return new MessageEmbed({description: "Disconnected due to inactivity. If you want me to stay in the voice channel 24/7, request a song with meow command."})
  }

  protected isAutoDisconnect(): boolean {
    return true
  }

  protected getIdleTime(): number {
    return 5 * 60 * 1000
  }


  // Standard methods

  public async play(): Promise<void> {
    await this.connectAndRun(async (connection) => {
      const queue = this.Queue?.getQueue()

      if (queue) {

        this.BotInstance.clearActiveConnection(this.guildId)

        await this.playTrack(await queue[0].getPlayableTrack())

      } else {

        if(this.isAutoDisconnect()) {
          this.BotInstance.setActiveConnection(this.guildId, setTimeout(() => {
            connection.disconnect()
            this.textChannel?.send(this.getAutoDisconnectText())
          }, this.getIdleTime()))
        }

        connection.dispatcher?.end()
      }


    })

  }

  public async playTrack(track: PlayableTrack | null): Promise<void> {
    await this.connectAndRun((connection) => {

      if (track) {
        this.textChannel?.send(this.getNowPlayingText(track))

        connection.play(track.getStream()).on("finish", () => {
          this.Queue?.skip()
          this.play()
        })
      }

    })
  }
}
