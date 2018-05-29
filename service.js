const http = require('http')
const router = require('find-my-way')()
const badgen = require('.')

router.get('/gen/:subject/:status', (req, res, params) => {
  res.writeHead(200, { 'Content-Type': 'image/svg+xml;charset=utf-8' })
  res.end(badgen(params))
})

const server = http.createServer((req, res) => router.lookup(req, res))
server.listen(3000)
