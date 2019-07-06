const calcWidth = require('./calc-text-width.js').Verdana110
const colorPresets = require('./color-presets.js')
const sanitize = str => str.replace(/\u0026/g, '&amp;').replace(/\u003C/g, '&lt;')

const bare = require('./bare.js')

module.exports = ({
  label,
  subject,
  status,
  color = 'blue',
  style,
  icon,
  iconWidth = 13,
  labelColor = '555'
}) => {
  typeAssert(typeof status === 'string', '<status> must be string')

  label = label === undefined ? subject : label // subject is deprecated
  if (!label && !icon) {
    return bare({ status, color, style })
  }

  color = colorPresets[color] || color
  labelColor = colorPresets[labelColor] || labelColor
  iconWidth = iconWidth * 10

  const iconSpanWidth = icon ? (label.length ? iconWidth + 30 : iconWidth - 18) : 0
  const sbTextStart = icon ? (iconSpanWidth + 50) : 50
  const sbTextWidth = calcWidth(label)
  const stTextWidth = calcWidth(status)
  const sbRectWidth = sbTextWidth + 100 + iconSpanWidth
  const stRectWidth = stTextWidth + 100
  const width = sbRectWidth + stRectWidth
  const xlink = icon ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : ''

  label = sanitize(label)
  status = sanitize(status)

  if (style === 'flat') {
    return `<svg width="${width / 10}" height="20" viewBox="0 0 ${width} 200" xmlns="http://www.w3.org/2000/svg"${xlink}>
  <g>
    <rect fill="#${labelColor}" width="${sbRectWidth}" height="200"/>
    <rect fill="#${color}" x="${sbRectWidth}" width="${stRectWidth}" height="200"/>
  </g>
  <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="${sbTextStart + 10}" y="148" textLength="${sbTextWidth}" fill="#000" opacity="0.1">${label}</text>
    <text x="${sbTextStart}" y="138" textLength="${sbTextWidth}">${label}</text>
    <text x="${sbRectWidth + 55}" y="148" textLength="${stTextWidth}" fill="#000" opacity="0.1">${status}</text>
    <text x="${sbRectWidth + 45}" y="138" textLength="${stTextWidth}">${status}</text>
  </g>
  ${icon ? `<image x="40" y="35" width="${iconWidth}" height="132" xlink:href="${icon}"/>` : ''}
</svg>`
  }

  return `<svg width="${width / 10}" height="20" viewBox="0 0 ${width} 200" xmlns="http://www.w3.org/2000/svg"${xlink}>
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="${width}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="${sbRectWidth}" height="200" fill="#${labelColor}"/>
    <rect width="${stRectWidth}" height="200" fill="#${color}" x="${sbRectWidth}"/>
    <rect width="${width}" height="200" fill="url(#a)"/>
  </g>
  <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="${sbTextStart + 10}" y="148" textLength="${sbTextWidth}" fill="#000" opacity="0.25">${label}</text>
    <text x="${sbTextStart}" y="138" textLength="${sbTextWidth}">${label}</text>
    <text x="${sbRectWidth + 55}" y="148" textLength="${stTextWidth}" fill="#000" opacity="0.25">${status}</text>
    <text x="${sbRectWidth + 45}" y="138" textLength="${stTextWidth}">${status}</text>
  </g>
  ${icon ? `<image x="40" y="35" width="${iconWidth}" height="130" xlink:href="${icon}"/>` : ''}
</svg>`
}

module.exports.default = module.exports

const typeAssert = (assertion, message) => {
  if (!assertion) throw new TypeError(message)
}
