// Generate on https://codesandbox.io/s/lr4ynm652m
/* eslint-disable comma-spacing */
const Verdana12Widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.2,4.7,5.5,9.8,7.6,13,8.7,3.2,5.4,5.4,7.6,9.8,4.4,5.4,4.4,5.4,7.6,7.6,7.6,7.6,7.6,7.6,7.6,7.6,7.6,7.6,5.4,5.4,9.8,9.8,9.8,6.5,12,8.2,8.2,8.4,9.2,7.6,6.9,9.3,9,5.1,5.5,8.3,6.7,10,9,9.4,7.2,9.4,8.3,8.2,7.4,8.8,8.2,12,8.2,7.4,8.2,5.4,5.4,5.4,9.8,7.6,7.6,7.2,7.5,6.3,7.5,7.1,4.2,7.5,7.6,3.3,4.1,7.1,3.3,12,7.6,7.3,7.5,7.5,5.1,6.3,4.7,7.6,7.1,9.8,7.1,7.1,6.3,7.6,5.4,7.6,9.8]
const Verdana11Widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.9,4.3,5,9,7,12,8,3,5,5,7,9,4,5,4,5,7,7,7,7,7,7,7,7,7,7,5,5,9,9,9,6,11,7.5,7.5,7.7,8.5,7,6.3,8.5,8.3,4.6,5,7.6,6.1,9.3,8.2,8.7,6.6,8.7,7.6,7.5,6.8,8.1,7.5,11,7.5,6.8,7.5,5,5,5,9,7,7,6.6,6.9,5.7,6.9,6.6,3.9,6.9,7,3,3.8,6.5,3,11,7,6.7,6.9,6.9,4.7,5.7,4.3,7,6.5,9,6.5,6.5,5.8,7,5,7,9]

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
  Verdana12: calcWidth(Verdana12Widths),
  Verdana11: calcWidth(Verdana11Widths)
}
