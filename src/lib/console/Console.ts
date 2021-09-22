import {ConsoleColours} from "./ConsoleColours";

function pad(num: number, size: number) {
  let s = "000000000" + num;
  return s.substr(s.length-size);
}

export class Console {

  private readonly lines: Array<string>
  private readonly colours: Array<string>

  constructor(...lines: Array<string | undefined>) {
    const filtered = lines.filter((v) => (v !== undefined))
    this.lines = <Array<string>>filtered
    this.colours = filtered.map(() => (""))
  }

  public emit() {
    this.lines.forEach((text, index) => {
      const timer = new Date()

      console.error(`${this.colours[index] || ""}${pad(timer.getHours(), 2)}:${pad(timer.getMinutes(), 2)}:${pad(timer.getSeconds(), 2)} ${text}${ConsoleColours.CLEAR}`)
    })
  }

  public addLine(text: string, colour?: string): Console {
    this.lines.push(text)
    this.colours.push(colour || "")
    return this
  }

  get length(): number {
    return this.lines.length
  }

  public getLine(index: number) {
    if (index > this.lines.length - 1) {
      return undefined
    }

    return {text: this.lines[index], colour: this.colours[index]}
  }

  public setLine(index: number, text: string, colour?: string): Console {
    this.lines[index] = text
    this.colours[index] = colour || ""
    return this
  }

  public setColour(index: number, colour?: string): Console {
    this.colours[index] = colour || ""
    return this
  }

}
