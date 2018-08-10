const path = require('path')
const http = require('http')
const url = require('url')
const qs = require('querystring')
const serveMarked = require('serve-marked')
const badgen = require('..')

const dockerIcon = require('../test/docker-icon-b64.js')

// @example
// http://localhost:3000/npm/v1.2.3
const serveBadge = (req, res) => {
  const { pathname, query } = url.parse(req.url)
  const { style, emoji, docker } = qs.parse(query)
  const icon = docker && dockerIcon
  const [ subject, status, color ] = pathname.split('/')
    .filter(Boolean)
    .map(s => qs.unescape(s))

  res.writeHead(200, { 'Content-Type': 'image/svg+xml;charset=utf-8' })
  res.end(badgen({ subject, status, color, style, emoji, icon }))
}

// @example
// http://localhost:3000
const md = path.join(__dirname, 'PREVIEW.md')
const serveIndex = serveMarked(md, {
  title: 'Badgen - Fast badge generator',
  preset: 'merri',
  inlineCSS: `
    body { color: #333; padding-bottom: 5em }
    a { text-decoration: none; color: #06D }
    a:hover { text-decoration: underline }
    table { border-spacing: 0 }
    td { padding: 0 1em 0 0; height: 24px; font: 14px/14px sans-serif }
    td a { font: 14px/14px monospace; vertical-align: top }
  `
})

const serve404 = (req, res) => {
  res.writeHead(404)
  res.end()
}

http.createServer((req, res) => {
  switch (req.url) {
    case '/': return serveIndex(req, res)
    case '/favicon.ico': return serve404(req, res)
    default: return serveBadge(req, res)
  }
}).listen(3000)
