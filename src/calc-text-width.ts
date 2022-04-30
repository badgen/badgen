// import widthsVerdana110 from './widths-verdana-110.json'
// @ts-ignore
const widthsVerdana110: number[] = require('./widths-verdana-110.json')

const calcWidth = (charWidthTable: number[]) => {
  const fallbackWidth = charWidthTable[64] // Width as "@" for overflows

  return ([...text]) => {
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

export const Verdana110 = calcWidth(widthsVerdana110)
