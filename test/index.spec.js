const tap = require('tap')
const badgen = require('..')
const icon = require('./icon-data-uri.js')

tap.test('generate badge with { subject, status }', t => {
  const svg = badgen({ subject: 'npm', status: 'v1.0.0' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { subject, status, color }', t => {
  const svg = badgen({ subject: 'npm', status: 'v1.0.0', color: 'ADF' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { subject, status, style }', t => {
  const svg = badgen({ subject: 'npm', status: 'v1.0.0', style: 'flat' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { subject, status, color, style }', t => {
  const svg = badgen({ subject: 'npm', status: 'v1.0.0', color: 'ADF', style: 'flat' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { subject, status, icon }', t => {
  const svg = badgen({ subject: 'docker', status: 'icon', icon })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { status, icon }', t => {
  const svg = badgen({ subject: '', status: 'icon', icon })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { status, icon, iconWidth }', t => {
  const svg = badgen({ subject: '', status: 'icon', icon, iconWidth: 15 })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { subject, status, icon, style }', t => {
  const svg = badgen({ subject: 'docker', status: 'icon', style: 'flat', icon })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('type checking', t => {
  t.throws(() => badgen({ status: '' }), TypeError, 'throw if subject is non-string')
  t.throws(() => badgen({ subject: '' }), TypeError, 'throw if status is non-string')
  t.end()
})
