const calcWidth = require('./calc-text-width.js').Verdana11
const colorPresets = require('./color-presets.js')

module.exports = function ({subject, status, color}) {
  color = colorPresets[color] || color || colorPresets['blue']

  const sbRectWidth = calcWidth(subject) + 10
  const stRectWidth = calcWidth(status) + 11
  const stTextStart = sbRectWidth + 5

  const width = sbRectWidth + stRectWidth

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">
      <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <rect rx="3" width="${width}" height="20" fill="#${color}"/>
      <rect rx="3" x="0" width="${sbRectWidth}" height="20" fill="#555"/>
      <path fill="#555" d="M${sbRectWidth} 0v20h-4v-20h4z"/>
      <rect rx="3" width="${width}" height="20" fill="url(#a)"/>
      <g fill="#fff" text-anchor="start" font-family="DejaVu Sans,Verdana,sans-serif" font-size="11">
        <text x="6" y="14.8" fill="#000" opacity="0.2">${subject}</text>
        <text x="5" y="13.8">${subject}</text>
        <text x="${stTextStart + 1}" y="14.8" fill="#000" opacity="0.2">${status}</text>
        <text x="${stTextStart}" y="13.8">${status}</text>
      </g><script/>
    </svg>
  `
}
