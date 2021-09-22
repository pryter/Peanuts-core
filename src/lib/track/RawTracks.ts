import {RawTrack} from "./RawTrack";
import {shuffleQueue} from "../utils/shuffleQueue";
import {DestructedData, StorableData} from "../storage/StorableData";

export class RawTracks extends Array<RawTrack> {

  constructor(source: Array<RawTrack>) {
    super(...source);
  }

  public skip(): RawTrack | undefined {
    return this.shift()
  }

  public shuffle(): RawTracks {
    const shifted = this.shift()
    if (!shifted) return this

    shuffleQueue(this)

    this.insert(0, shifted)

    return this
  }

  public insert(index: number, track: RawTrack) {
    if (index === 0) {
      this.unshift(track)
      return
    }
    this.splice(index, 0, track)
  }

  public getStorableData(): StorableData {
    let tracks: DestructedData[] = []
    this.forEach((track) => {
      tracks.push([track.title || "", track.url || track.query || ""])
    })

    return new StorableData(tracks)
  }

}
