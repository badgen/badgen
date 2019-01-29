const tap = require('tap')
const badgen = require('..')
const icons = require('./assets/icon-data-uri.js')

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
  const svg = badgen({ subject: 'docker', status: 'icon', icon: icons.chrome })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { status, icon }', t => {
  const svg = badgen({ subject: '', status: 'icon', icon: icons.chrome })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { status, icon, iconWidth }', t => {
  const svg = badgen({ subject: '', status: 'icon', icon: icons.lgtm, iconWidth: 19 })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { subject, status, icon, style }', t => {
  const svg = badgen({ subject: 'docker', status: 'icon', style: 'flat', icon: icons.lgtm })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate bare badge with { status }', t => {
  const svg = badgen({ status: 'v1.0.0' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate bare badge with { status, color }', t => {
  const svg = badgen({ status: 'v1.0.0', color: 'ADF' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate bare badge with { status, style }', t => {
  const svg = badgen({ status: 'v1.0.0', style: 'flat' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('type checking', t => {
  t.throws(() => badgen({}), TypeError, 'throw if status is non-string')
  t.end()
})
