const emojis = ["😸", "😺", "😻", "😿", "😾", "🙀", "😹", "😼", "😽"]
const percentages = [30, 25, 4, 7, 7, 5, 8, 10, 4]
const maxPercentage = percentages.reduce((prev, curr) => (prev + curr), 0)

export const randomCat = () => {
  const randNumber = Math.floor(Math.random() * maxPercentage) + 1
  let sum = 0
  let pos = 0
  for (let chunk of percentages) {
    if (randNumber > sum && randNumber <= sum + chunk) {
      return emojis[pos]
    } else {
      sum = sum + chunk
      pos++
    }
  }
}
