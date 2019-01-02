const tap = require('tap')
const bare = require('../lib/bare.js')

tap.test('generate bare badge with { status }', t => {
  const svg = bare({ status: 'v1.0.0' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate bare badge with { status, color }', t => {
  const svg = bare({ status: 'v1.0.0', color: 'ADF' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate bare badge with { status, style }', t => {
  const svg = bare({ status: 'v1.0.0', style: 'flat' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})
