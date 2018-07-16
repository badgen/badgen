const calcWidth = require('./calc-text-width.js').Verdana11
const colorPresets = require('./color-presets.js')

module.exports = function ({subject, status, color, style}) {
  color = colorPresets[color] || color || colorPresets['blue']

  const sbRectWidth = calcWidth(subject) + 11
  const stRectWidth = calcWidth(status) + 11
  const width = sbRectWidth + stRectWidth

  if (style === 'flat') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">
        <g>
          <rect width="${sbRectWidth}" height="20" fill="#555"/>
          <rect x="${sbRectWidth}" width="${stRectWidth}" height="20" fill="#${color}"/>
        </g>
        <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">
          <text x="7" y="14.8" fill="#000" opacity="0.1">${subject}</text>
          <text x="6" y="13.8">${subject}</text>
          <text x="${sbRectWidth + 5.5}" y="14.8" fill="#000" opacity="0.1">${status}</text>
          <text x="${sbRectWidth + 4.5}" y="13.8">${status}</text>
        </g>
      </svg>
    `
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">
      <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <mask id="m"><rect width="${width}" height="20" rx="3" fill="#FFF"/></mask>
      <g mask="url(#m)">
        <rect width="${sbRectWidth}" height="20" fill="#555"/>
        <rect x="${sbRectWidth}" width="${stRectWidth}" height="20" fill="#${color}"/>
        <rect width="${width}" height="20" fill="url(#a)"/>
      </g>
      <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">
        <text x="7" y="14.8" fill="#000" opacity="0.25">${subject}</text>
        <text x="6" y="13.8">${subject}</text>
        <text x="${sbRectWidth + 5.5}" y="14.8" fill="#000" opacity="0.25">${status}</text>
        <text x="${sbRectWidth + 4.5}" y="13.8">${status}</text>
      </g>
    </svg>
  `
}
