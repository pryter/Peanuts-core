import path from "path"
import * as fs from "fs";
import {StorableData} from "./StorableData";

export class Storage {

  private readonly ABS_PATH = process.env.PWD?.toString() || ""
  private readonly root: string

  constructor(name: string) {
    this.root = path.join(this.ABS_PATH, name)
  }

  public store(key: string, value: StorableData) {
    fs.writeFileSync(path.join(this.root, key), value.stringfy())
  }

  public read(key: string): StorableData {
    const rawText = fs.readFileSync(path.join(this.root, key)).toString()

    return new StorableData(rawText)
  }

  public append(key: string, value: StorableData) {
    fs.appendFileSync(path.join(this.root, key), `${value.stringfy()}\n`)
  }

}
