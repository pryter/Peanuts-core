import {PlayableTrack} from "./PlayableTrack";
import {checkUrlSource} from "../utils/urls";
import {getTracks} from "spotify-url-info";
import {Error} from "../console/Error";
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

        switch (checkUrlSource(this.url)) {
          case "spotify":
          {
            const spotify = await getTracks(this.url)
            const query = `${spotify[0].name}${spotify[0].artists?.map((person) => (` ${person.name}`))}`
            const context = await ytsr(query, {limit: 1})
            const suggested = context.items[0]
            return new PlayableTrack(suggested.title, suggested.url)
          }
          case "apple":
          {
            new Error("Apple music's track url is not supported yet!").emit()
            return null
          }
          case "youtube":
            return new PlayableTrack(this.title || this.url, this.url)
          default:
            return null
        }

      }
    }

    return null
  }

}
