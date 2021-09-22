import {RawTrack} from "./RawTrack";
import {StorableData} from "../storage/StorableData";
import ytdl = require('ytdl-core');
import {MessageEmbed} from "discord.js";
import {Readable} from "stream";

export class PlayableTrack {

  public title: string
  public url: string

  constructor(title: string, url: string) {
    this.title = title
    this.url = url
  }

  public getStorableData(): StorableData {
    return new StorableData([this.title, this.url])
  }

  public getStream(): Readable {
    return ytdl(this.url, {filter: 'audioonly'})
  }

}
