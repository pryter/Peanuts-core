import {PlayableTrack} from "./PlayableTrack";
const ytsr = require('ytsr')

export class RawTrack {

  public title: string | undefined
  public url: string | undefined
  public query: string | undefined

  constructor(url: string, title?: string)
  constructor(query: string, title?: string)

  constructor(...params: Array<string>) {
    this.title = params[1]
    if (params[0].includes("http") && params[0].includes("//")) {
      this.url = params[0]
    }else{
      this.query = params[0]
    }
  }

  public hasUrl(): boolean {
    return !!this.url
  }

  public async getPlayableTrack(): Promise<PlayableTrack | null> {

    if (this.query || this.url) {
      if (this.query) {

        // normal youtube search
        const context = await ytsr(this.query, {limit: 1})
        const searched: {title: string, url: string} = context.items[0]
        return new PlayableTrack(this.title || searched.title, searched.url)
      }

      if (this.url) {

        //TODO Spotify & apple music track
        if (this.url.includes("spotify.com")) {

        }

        if (this.url.includes("music.apple.com")) {

        }

        return new PlayableTrack(this.title || this.url, this.url)
      }
    }

    return null
  }

}
