import path from "path"
import * as fs from "fs";
import {StorableData} from "./StorableData";
import {Error} from "../console/Error";

export class Storage {

  private readonly ABS_PATH = process.env.PWD?.toString() || ""
  private readonly root: string

  constructor(name: string) {
    this.root = path.join(this.ABS_PATH, name)
    if (!this.isWritable()) {
      new Error(`Folder \`${name}\` does not exist.`, "Create one at project's root folder.").emit()
    }
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

  public isWritable() {
    return fs.existsSync(this.root)
  }

}
