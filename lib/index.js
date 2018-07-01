const calcWidth = require('./calc-text-width.js').Arial12
const colorPresets = require('./color-presets.js')

module.exports = function ({subject, status, color}) {
  color = colorPresets[color] || color || colorPresets['green']

  const sbTextWidth = calcWidth(subject)
  const sbRectWidth = sbTextWidth + 10

  const stTextWidth = calcWidth(status)
  const stRectWidth = stTextWidth + 11
  const stTextStart = sbRectWidth + 5

  const width = sbRectWidth + stRectWidth

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">
      <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <rect rx="3" width="${width}" height="20" fill="#555"/>
      <rect rx="3" x="${sbRectWidth}" width="${stRectWidth}" height="20" fill="#${color}"/>
      <path fill="#${color}" d="M${sbRectWidth} 0h4v20h-4z"/>
      <rect rx="3" width="${width}" height="20" fill="url(#a)"/>
      <g fill="#fff" text-anchor="start" font-family="Arial,sans-serif" font-size="12">
        <text x="6" y="15" textLength="${sbTextWidth}" fill="#000" opacity="0.2">${subject}</text>
        <text x="5" y="14" textLength="${sbTextWidth}">${subject}</text>
        <text x="${stTextStart + 1}" y="15" textLength="${stTextWidth}" fill="#000" opacity="0.2">${status}</text>
        <text x="${stTextStart}" y="14" textLength="${stTextWidth}">${status}</text>
      </g><script/>
    </svg>
  `
}
