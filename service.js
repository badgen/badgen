const http = require('http')
const router = require('find-my-way')()
const badgen = require('.')

function generate (req, res, params) {
  res.writeHead(200, { 'Content-Type': 'image/svg+xml;charset=utf-8' })
  res.end(badgen(params))
}

const readme = require('fs').readFileSync('./README.md', 'utf-8')
function serveReadme (req, res) {
  res.end(readme)
}

router.get('/badge/:subject/:status', generate)
router.get('/badge/:subject/:status/:color', generate)
router.get('/', serveReadme)

const server = http.createServer((req, res) => router.lookup(req, res))
server.listen(3000)
