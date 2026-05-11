import widthsVerdana110 from './widths-verdana-110.json'

const calcWidth = (charWidthTable: readonly number[]): ((text: string) => number) => {
  const fallbackWidth = charWidthTable[64] ?? 110 // Width as "@" for overflows

  return (text: string): number => {
    let total = 0

    for (const char of text) {
      total += charWidthTable[char.charCodeAt(0)] ?? fallbackWidth
    }

    return total
  }
}

export const Verdana110 = calcWidth(widthsVerdana110)
