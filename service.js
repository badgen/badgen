const http = require('http')
const router = require('find-my-way')()
const badgen = require('./lib/index')
const LRU = require('lru-cache')

const cache = new LRU({ max: 1000 })

function serveBadge (req, res, params) {
  res.writeHead(200, { 'Content-Type': 'image/svg+xml;charset=utf-8' })

  const cached = cache.get(req.url)
  if (cached) {
    res.end(cached)
  } else {
    const created = badgen(params)
    cache.set(req.url, created)
    res.end(created)
  }
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
