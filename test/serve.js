const http = require('http')
const badgen = require('..')

// @example
// http://localhost:3000/npm/v1.2.3
const serveBadge = (req, res) => {
  const [ subject, status, color ] = req.url.split('/').filter(Boolean)
  res.writeHead(200, { 'Content-Type': 'image/svg+xml;charset=utf-8' })
  res.end(badgen({subject, status, color}))
}

http.createServer(serveBadge).listen(3000)
