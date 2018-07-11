const http = require('http')
const path = require('path')
const serveMarked = require('serve-marked')
const badgen = require('..')

// @example
// http://localhost:3000/npm/v1.2.3
const serveBadge = (req, res) => {
  const [ subject, status, color ] = req.url.split('/').filter(Boolean)
  res.writeHead(200, { 'Content-Type': 'image/svg+xml;charset=utf-8' })
  res.end(badgen({subject, status, color}))
}

// @example
// http://localhost:3000
const md = path.join(__dirname, 'PREVIEW.md')
const serveIndex = serveMarked(md, {
  title: 'Badgen - Fast badge generator',
  preset: 'merri',
  inlineCSS: `
    body { color: #333 }
    a { text-decoration: none; color: #06D }
    a:hover { text-decoration: underline }
    table { border-spacing: 0 }
    td { padding: 0 1em 0 0; height: 24px; font: 14px/14px sans-serif }
    td a { font: 14px/14px monospace; vertical-align: top }
  `
})

http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      return serveIndex(req, res)
    default:
      return serveBadge(req, res)
  }
}).listen(3000)
