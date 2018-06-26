const tap = require('tap')
const badgen = require('..')

tap.test('generate badge with { subject, status }', t => {
  const svg = badgen({ subject: 'npm', status: 'v1.0.0' })
  t.ok(typeof svg === 'string', 'generate without error')
  t.end()
})

tap.test('generate badge with { subject, status, color }', t => {
  const svg = badgen({ subject: 'npm', status: 'v1.0.0', color: 'ADF' })
  t.ok(typeof svg === 'string', 'generate without error')
  t.end()
})
