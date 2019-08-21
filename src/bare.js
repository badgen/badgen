const calcWidth = require('./calc-text-width.js').Verdana110
const colorPresets = require('./color-presets.js')
const { sanitize, typeAssert } = require('./utils.js')

module.exports = ({ status, color, style }) => {
  typeAssert(typeof status === 'string', '<status> must be string')
  color = colorPresets[color] || color || colorPresets.blue

  const stTextWidth = calcWidth(status)
  const stRectWidth = stTextWidth + 115

  status = sanitize(status)

  if (style === 'flat') {
    return `<svg width="${stRectWidth / 10}" height="20" viewBox="0 0 ${stRectWidth} 200" xmlns="http://www.w3.org/2000/svg">
  <g>
    <rect fill="#${color}" x="0" width="${stRectWidth}" height="200"/>
  </g>
  <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="65" y="148" textLength="${stTextWidth}" fill="#000" opacity="0.1">${status}</text>
    <text x="55" y="138" textLength="${stTextWidth}">${status}</text>
  </g>
</svg>`
  }

  return `<svg width="${stRectWidth / 10}" height="20" viewBox="0 0 ${stRectWidth} 200" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="${stRectWidth}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="${stRectWidth}" height="200" fill="#${color}" x="0"/>
    <rect width="${stRectWidth}" height="200" fill="url(#a)"/>
  </g>
  <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="65" y="148" textLength="${stTextWidth}" fill="#000" opacity="0.25">${status}</text>
    <text x="55" y="138" textLength="${stTextWidth}">${status}</text>
  </g>
</svg>`
}
