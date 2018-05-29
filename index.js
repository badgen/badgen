module.exports = function ({subject, status, color = '#97CA00'}) {
  const sbl = subject.length
  const stl = status.length
  const charWidth = 8

  const sbTextWidth = sbl * charWidth
  const sbRectWidth = sbTextWidth + 12
  const sbTextCenter = sbRectWidth / 2

  const stTextWidth = stl * charWidth - 2
  const stRectWidth = stTextWidth + 12
  const stTextCenter = sbRectWidth + stRectWidth / 2

  const width = sbRectWidth + stRectWidth

  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      width="${width}" height="20">
      <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <clipPath id="a">
        <rect width="${width}" height="20" rx="3" fill="#fff"/>
      </clipPath>
      <g clip-path="url(#a)">
        <path fill="#555" d="M0 0h${sbRectWidth}v20H0z"/>
        <path fill="${color}" d="M${sbRectWidth} 0h${stRectWidth}v20H${sbRectWidth}z"/>
        <path fill="url(#b)" d="M0 0h${sbRectWidth + stRectWidth}v20H0z"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="SF Mono,Consolas,monospace" font-size="13">
        <text x="${sbTextCenter}" y="15" textLength="${sbTextWidth}" fill="#010101" fill-opacity=".3">${subject}</text>
        <text x="${sbTextCenter}" y="14" textLength="${sbTextWidth}">${subject}</text>
        <text x="${stTextCenter}" y="15" textLength="${stTextWidth}" fill="#010101" fill-opacity=".3">${status}</text>
        <text x="${stTextCenter}" y="14" textLength="${stTextWidth}">${status}</text>
      </g> <script xmlns=""/>
    </svg>
  `
}
