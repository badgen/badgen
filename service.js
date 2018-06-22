const http = require('http')
const router = require('find-my-way')()
const badgen = require('./lib/index')

function serveBadge (req, res, params) {
  res.writeHead(200, { 'Content-Type': 'image/svg+xml;charset=utf-8' })
  res.end(badgen(params))
}

function redirect (req, res) {
  res.writeHead(302, { 'Location': 'https://amio.github.io/badgen' })
  res.end()
}

router.get('/badge/:subject/:status', serveBadge)
router.get('/badge/:subject/:status/:color', serveBadge)
router.get('/', redirect)

const server = http.createServer((req, res) => router.lookup(req, res))
server.listen(3000)
