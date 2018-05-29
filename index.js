module.exports = function ({subject, status, color = '#4C1'}) {
  const sbl = subject.length
  const stl = status.length
  const charWidth = 7.4

  const sbTextWidth = sbl * charWidth
  const sbRectWidth = sbTextWidth + 12
  const sbTextCenter = sbRectWidth / 2

  const stTextWidth = stl * charWidth
  const stRectWidth = stTextWidth + 14
  const stTextCenter = sbRectWidth + stRectWidth / 2

  const width = sbRectWidth + stRectWidth

  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      width="${width}" height="20">
      <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <rect rx="3" width="${width}" height="20" fill="#555"/>
      <rect rx="3" x="${sbRectWidth}" width="${stRectWidth}" height="20" fill="${color}"/>
      <path fill="${color}" d="M${sbRectWidth} 0h4v20h-4z"/>
      <rect rx="3" width="${width}" height="20" fill="url(#a)"/>
      <g fill="#fff" text-anchor="middle" font-family="SF Mono,Consolas,monospace" font-size="12">
        <text x="${sbTextCenter}" y="15" textLength="${sbTextWidth}" fill="#010101" fill-opacity=".3">${subject}</text>
        <text x="${sbTextCenter}" y="14" textLength="${sbTextWidth}">${subject}</text>
        <text x="${stTextCenter}" y="15" textLength="${stTextWidth}" fill="#010101" fill-opacity=".3">${status}</text>
        <text x="${stTextCenter}" y="14" textLength="${stTextWidth}">${status}</text>
      </g> <script xmlns=""/>
    </svg>
  `
}
