const http = require('http')
const router = require('find-my-way')()
const badgen = require('./lib/index')
const readme = require('fs').readFileSync('./README.md', 'utf-8')

function serveBadge (req, res, params) {
  res.writeHead(200, { 'Content-Type': 'image/svg+xml;charset=utf-8' })
  res.end(badgen(params))
}

function serveReadme (req, res) {
  res.end(readme)
}

router.get('/badge/:subject/:status', serveBadge)
router.get('/badge/:subject/:status/:color', serveBadge)
router.get('/', serveReadme)

const server = http.createServer((req, res) => router.lookup(req, res))
server.listen(3000)
