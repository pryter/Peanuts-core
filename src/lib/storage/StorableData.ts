
export type DestructedData = string[]

export class StorableData {

  private readonly value: DestructedData | DestructedData[] | string
  private readonly separator = "!-!"

  constructor(data: string)
  constructor(data: DestructedData)
  constructor(data: DestructedData[])

  constructor(data: DestructedData | DestructedData[] | string) {
    this.value = data
  }

  public stringfy(): string {
    if (typeof this.value === "string") {
      return this.value
    }

    const isDataList = this.value.some((data: string | DestructedData) => (typeof data !== "string"))
    let parsedText = ""

    if (isDataList) {
      const dataList = <DestructedData[]> this.value
      parsedText = dataList.map((data: DestructedData) => (data.join(this.separator))).join("\n")
      parsedText += "\n"
    }else{
      const data = <DestructedData> this.value
      parsedText = data.join(this.separator)
    }

    return parsedText
  }

  private parse(): DestructedData | DestructedData[] | string | undefined {
    if (typeof this.value !== "string") return undefined

    let dataList = this.value.split("\n")

    if (dataList.length === 1) {
      return this.value
    }

    dataList = dataList.filter(item => (item !== ""))

    const parsedDataList = dataList.map((data) => (data.split(this.separator)))

    if (parsedDataList.length === 1 && !this.value.includes("\n")) {
      return parsedDataList[0]
    }

    return parsedDataList
  }

  public get(index: number): StorableData | string | undefined {
    if (typeof this.value === "string") {
      const parsed = this.parse()
      if (!parsed) return undefined

      if (typeof parsed === "string") {
        return parsed
      }else{
        const inner = parsed[index]
        if (typeof inner === "string") {
          return inner
        }else{
          return new StorableData(<DestructedData> inner)
        }
      }
    }
  }

  public toDestructedData(): DestructedData | DestructedData[] | string | undefined {
    return this.parse()
  }
}

