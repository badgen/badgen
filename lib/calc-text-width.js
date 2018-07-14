const widthsVerdana11 = require('./widths-verdana-11.json')

function calcWidth (charWidthTable) {
  const SCALE = 10
  const widthTable = charWidthTable.map(w => Math.round(w * SCALE))
  return function (text) {
    if (typeof text !== 'string') {
      return 0
    } else {
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
}

module.exports = {
  Verdana11: calcWidth(widthsVerdana11)
}
