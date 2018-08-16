const calcWidth = require('./calc-text-width').Verdana11
const colorPresets = require('./color-presets')
const round = require('./round')

module.exports = ({ subject, status, color, style, emoji, icon, iconWidth = 13 }) => {
  typeAssert(typeof subject === 'string', '<subject> must be string')
  typeAssert(typeof status === 'string', '<status> must be string')
  color = colorPresets[color] || color || colorPresets['blue']

  const iconSpanWidth = icon ? (subject.length ? iconWidth + 4 : iconWidth - 2) : 0
  const sbTextWidth = calcWidth(subject, emoji)
  const stTextWidth = calcWidth(status, emoji)
  const sbRectWidth = round(sbTextWidth + 10.2 + iconSpanWidth)
  const stRectWidth = round(stTextWidth + 10)
  const width = sbRectWidth + stRectWidth
  const xlink = icon ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : ''

  if (style === 'flat') {
    return `
        <g>
          <rect width="${sbRectWidth}" height="20" fill="#555"/>
          <rect x="${sbRectWidth}" width="${stRectWidth}" height="20" fill="#${color}"/>
        </g>
        <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">
          <text x="${icon ? '22.5' : '6.3'}" y="14.8" textLength="${sbTextWidth}" fill="#000" opacity="0.1">${subject}</text>
      <svg width="${width}" height="20" xmlns="http://www.w3.org/2000/svg"${xlink}>
          <text x="${icon ? '21.5' : '5.3'}" y="13.8" textLength="${sbTextWidth}">${subject}</text>
          <text x="${sbRectWidth + 5.5}" y="14.8" fill="#000" opacity="0.1" textLength="${stTextWidth}">${status}</text>
          <text x="${sbRectWidth + 4.5}" y="13.8" textLength="${stTextWidth}">${status}</text>
        </g>
        ${icon ? `<image x="3.8" y="3.4" width="${iconWidth}" height="13.2" xlink:href="${icon}"/>` : ''}
      </svg>
    `
  }

  return `
    <svg width="${width}" height="20" xmlns="http://www.w3.org/2000/svg"${xlink}>
      <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#EEE" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <mask id="m"><rect width="${width}" height="20" rx="3" fill="#FFF"/></mask>
      <g mask="url(#m)">
        <rect width="${sbRectWidth}" height="20" fill="#555"/>
        <rect x="${sbRectWidth}" width="${stRectWidth}" height="20" fill="#${color}"/>
        <rect width="${width}" height="20" fill="url(#a)"/>
      </g>
      <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">
        <text x="${icon ? '22.5' : '6.5'}" y="14.8" textLength="${sbTextWidth}" fill="#000" opacity="0.25">${subject}</text>
        <text x="${icon ? '21.5' : '5.5'}" y="13.8" textLength="${sbTextWidth}">${subject}</text>
        <text x="${sbRectWidth + 5.5}" y="14.8" fill="#000" opacity="0.25" textLength="${stTextWidth}">${status}</text>
        <text x="${sbRectWidth + 4.5}" y="13.8" textLength="${stTextWidth}">${status}</text>
      </g>
      ${icon ? `<image x="3.9" y="3.5" width="${iconWidth}" height="13" xlink:href="${icon}"/>` : ''}
    </svg>
  `
}

const typeAssert = (assertion, message) => {
  if (!assertion) throw new TypeError(message)
}
