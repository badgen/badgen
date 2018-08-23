const widthsVerdana110 = require('./widths-verdana-110.json')

const calcWidth = (charWidthTable) => {
  const fallbackWidth = widthTable[64] // Width as "@" for overflows

  return (text, astral) => {
    if (astral) text = [...text]

    let total = 0
    let i = text.length
    let char = ''
    while (i--) {
      char = text[i]
      total += charWidthTable[char.charCodeAt()] ||
        charWidthTable[char.normalize('NFD').charCodeAt()] ||
        fallbackWidth
    }
    return total
  }
}

module.exports = {
  Verdana110: calcWidth(widthsVerdana110)
}
