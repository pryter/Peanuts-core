import {TextChannel, VoiceChannel, VoiceConnection} from "discord.js";
import {VoiceConnCallback} from "./Controller";
import { Bot } from "./Bot";
import { Queue } from "./Queue";

export class VoiceAction {

  protected textChannel: TextChannel | undefined
  protected voiceChannel: VoiceChannel | undefined
  protected guildId: string | undefined
  protected Queue: Queue | undefined

  protected async connectAndRun(callback: VoiceConnCallback): Promise<void> {

    const connection: VoiceConnection | undefined = await this.voiceChannel?.join()

    if (!connection) {
      await this.textChannel?.send("CONNECTION MESSAGE")
      return
    }

    connection.on("disconnect", () => {
      this.Queue?.clear()
    })

    await callback(connection)
  }
}
