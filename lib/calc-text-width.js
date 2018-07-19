const widthsVerdana11 = require('./widths-verdana-11.json')
const astralRegex = require('unicode-astral-regex')

function calcWidth (charWidthTable) {
  const SCALE = 10 // Prevent results like 60.599999999999994
  const widthTable = charWidthTable.map(w => Math.round(w * SCALE))
  widthTable[64] = widthTable[64] + 2 // Slightly increase width of "@" by 0.2px

  return function (text, astral) {
    typeAssert(typeof text === 'string', 'Input must be string')
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

const typeAssert = (assertion, message) => {
  if (!assertion) throw new TypeError(message)
}

module.exports = {
  Verdana11: calcWidth(widthsVerdana11)
}
