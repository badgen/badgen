const widthsVerdana110 = require('./widths-verdana-110.json')

const calcWidth = (charWidthTable) => {
  const fallbackWidth = charWidthTable[64] // Width as "@" for overflows

  return (text, astral) => {
    if (astral) text = [...text]

    let total = 0
    let charWidth = 0
    let i = text.length
    while (i--) {
      charWidth = charWidthTable[text[i].charCodeAt()]
      total += charWidth === undefined ? fallbackWidth : charWidth
    }
    return total
  }
}

module.exports = {
  Verdana110: calcWidth(widthsVerdana110)
}
