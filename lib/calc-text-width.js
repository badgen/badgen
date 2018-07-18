const widthsVerdana11 = require('./widths-verdana-11.json')

function calcWidth (charWidthTable) {
  const SCALE = 10
  const widthTable = charWidthTable.map(w => Math.round(w * SCALE))
  return function (text) {
    typeAssert(typeof text === 'string', 'Input must be string')

    let total = 0
    let i = text.length
    let charCode = 0
    while (i--) {
      charCode = text[i].charCodeAt()
      total += widthTable[charCode < 127 ? charCode : 64] // "@" for overflows
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
