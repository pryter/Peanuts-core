import {Storage} from "../storage/Storage";
import {RawTrack} from "../track/RawTrack";
import {RawTracks} from "../track/RawTracks";
import {DestructedData, StorableData} from "../storage/StorableData";
import {PlayableTrack} from "../track/PlayableTrack";
import {MessageEmbed, TextChannel} from "discord.js";
import {randomCat} from "../utils/randomEmoji";


export class Queue {

  protected readonly Storage: Storage
  protected targetGuildId: string | undefined

  constructor(Storage: Storage, guildId?: string) {
    this.Storage = Storage
    if (guildId) {
      this.targetGuildId = guildId
    }
  }

  public setGuildId(guildId: string | undefined): Queue {
    if(guildId) {
      this.targetGuildId = guildId
    }
    return this
  }

  public getQueue(guildId?: string): RawTracks | undefined {

    if (guildId || this.targetGuildId) {
      const rawQueue = <DestructedData[]> this.Storage.read(guildId || <string> this.targetGuildId).toDestructedData()

      if (rawQueue.length >= 1) {
        return new RawTracks(rawQueue.map((rawTrackData) => {
          const [title, sourceContext] = rawTrackData

          return new RawTrack(sourceContext.replace("!q", ""), title)
        }))
      }
    }

    return undefined

  }

  public addTrack(track: PlayableTrack, guildId?: string): void {
    const safeGuildId = guildId || <string> this.targetGuildId

    this.Storage.append(safeGuildId, track.getStorableData())
  }

  public addTracks(tracks: RawTracks, guildId?: string): void {
    const safeGuildId = guildId || <string> this.targetGuildId

    this.Storage.append(safeGuildId, tracks.getStorableData())
  }

  public clear(guildId?: string): void {
    const safeGuildId = guildId || <string> this.targetGuildId

    this.Storage.store(safeGuildId, new StorableData(""))
  }

  public skip(guildId?: string): RawTrack | undefined {

    const safeGuildId = guildId || <string> this.targetGuildId

    const queue = this.getQueue(safeGuildId)

    if (queue) {
      const skipped = queue.skip()
      this.Storage.store(safeGuildId, queue.getStorableData())
      return skipped
    }

    return undefined
  }

  public shuffle(guildId?: string): void {

    const safeGuildId = guildId || <string> this.targetGuildId
    const queue = this.getQueue(safeGuildId)

    if (queue) {
      queue.shuffle()
      this.Storage.store(safeGuildId, queue.getStorableData())
    }

  }

}
