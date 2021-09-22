import {Console} from "./Console";
import {ConsoleColours} from "./ConsoleColours";

export class Error extends Console {

  constructor(reason?: string, hint?: string) {
    super(reason && `[Error]: ${reason}`, hint && `[Hint]: ${hint}`)
    if (reason) {
      this.setColour(0, ConsoleColours.RED)
    }
    if (hint) {
      this.setColour(1, ConsoleColours.YELLOW)
    }
  }

  emit() {
    if (!this.getLine(0)) {
      new Error("An [Error] class must have `reason` property.").emit()
      return
    }

    super.emit();
  }

  public setHint(hint: string): Error {
    if (this.length === 0) {
      this.addLine(`[Hint]: ${hint}`, ConsoleColours.YELLOW)
    }else{
      this.setLine(1, `[Hint]: ${hint}`,ConsoleColours.YELLOW)
    }
    return this
  }

  public setReason(reason: string): Error {
    if (this.length === 0) {
      this.addLine(`[Error]: ${reason}`, ConsoleColours.RED)
    }else{
      this.setLine(0, `[Error]: ${reason}`,ConsoleColours.RED)
    }
    return this
  }

}
