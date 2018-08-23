const widthsVerdana11 = require('./widths-verdana-11.json')

const calcWidth = (charWidthTable) => {
  return (text, astral) => {
    if (astral) text = [...text]

    let total = 0
    let code = 0
    let i = text.length
    while (i--) {
      code = text[i].charCodeAt()
      total += charWidthTable[code < 127 ? code : 64] // Width as "@" for overflows
    }
    return total
  }
}

module.exports = {
  Verdana11: calcWidth(widthsVerdana11)
}
