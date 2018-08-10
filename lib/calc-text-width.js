const widthsVerdana11 = require('./widths-verdana-11.json')
const astralRegex = require('unicode-astral-regex')

const calcWidth = (charWidthTable) => {
  const SCALE = 10 // Prevent results like 60.599999999999994
  const widthTable = charWidthTable.map(w => Math.round(w * SCALE))
  widthTable[64] = widthTable[64] + 6 // Slightly increase width of "@" by 0.6px

  return (text, astral) => {
    if (astral) text = text.match(astralRegex)

    let total = 0
    let code = 0
    let i = text.length
    while (i--) {
      code = text[i].charCodeAt()
      total += widthTable[code < 127 ? code : 64] // Width as "@" for overflows
    }
    return total / SCALE
  }
}

module.exports = {
  Verdana11: calcWidth(widthsVerdana11)
}
