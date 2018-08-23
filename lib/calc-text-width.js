const widthsVerdana11 = require('./widths-verdana-11.json')

const SCALE = 10 // Prevent results like 60.599999999999994

const calcWidth = (charWidthTable) => {
  const widthTable = charWidthTable.map(w => Math.round(w * SCALE))
  widthTable[64] = widthTable[64] + 6 // Slightly increase width of "@" by 0.6px
  const fallbackWidth = widthTable[64] // Width as "@" for overflows

  return (text, astral) => {
    if (astral) text = [...text]

    let total = 0
    let i = text.length
    let char = ''
    while (i--) {
      char = text[i]
      total += widthTable[char.charCodeAt()] ||
        widthTable[char.normalize('NFD').charCodeAt()] ||
        fallbackWidth
    }
    return total
  }
}

module.exports = {
  Verdana11: calcWidth(widthsVerdana11)
}
