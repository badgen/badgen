const calcWidth = require('./calc-text-width.js').Verdana11
const colorPresets = require('./color-presets.js')

module.exports = function ({subject, status, color, style, emoji, icon}) {
  typeAssert(typeof subject === 'string', '<subject> must be string')
  typeAssert(typeof status === 'string', '<status> must be string')

  color = colorPresets[color] || color || colorPresets['blue']

  const stTextWidth = calcWidth(status, emoji)
  const sbRectWidth = calcWidth(subject, emoji) + 10 + (icon ? 17 : 0)
  const stRectWidth = stTextWidth + 10
  const width = sbRectWidth + stRectWidth

  if (style === 'flat') {
    return `
      <svg width="${width}" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g>
          <rect width="${sbRectWidth}" height="20" fill="#555"/>
          <rect x="${sbRectWidth}" width="${stRectWidth}" height="20" fill="#${color}"/>
        </g>
        <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">
          <text x="${icon ? '23' : '6'}" y="14.8" fill="#000" opacity="0.1">${subject}</text>
          <text x="${icon ? '22' : '5'}" y="13.8">${subject}</text>
          <text x="${sbRectWidth + 5.5}" y="14.8" fill="#000" opacity="0.1" textLength="${stTextWidth}">${status}</text>
          <text x="${sbRectWidth + 4.5}" y="13.8" textLength="${stTextWidth}">${status}</text>
        </g>${icon ? genIconMarkup(icon) : ''}
      </svg>
    `
  }

  return `
    <svg width="${width}" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
        <text x="${icon ? '23' : '6.2'}" y="14.8" fill="#000" opacity="0.25">${subject}</text>
        <text x="${icon ? '22' : '5.2'}" y="13.8">${subject}</text>
        <text x="${sbRectWidth + 5.5}" y="14.8" fill="#000" opacity="0.25" textLength="${stTextWidth}">${status}</text>
        <text x="${sbRectWidth + 4.5}" y="13.8" textLength="${stTextWidth}">${status}</text>
      </g>${icon ? genIconMarkup(icon) : ''}
    </svg>
  `
}

function genIconMarkup (iconB64) {
  return `<image x="4.8" y="3" width="14" height="14" xlink:href="${iconB64}"/>`
}

function typeAssert (assertion, message) {
  if (!assertion) throw new TypeError(message)
}
