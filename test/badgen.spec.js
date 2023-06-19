const tap = require('tap')
const { badgen } = require('../dist')
const icons = require('./assets/icon-data-uri.js')

const originalMath = global.Math
const mockMath = Object.create(global.Math)
mockMath.random = () => 0.5

tap.beforeEach(async t => { global.Math = mockMath })
tap.afterEach(async t => { global.Math = originalMath })

tap.test('generate badge with { label, status }', t => {
  const svg = badgen({ label: 'npm', status: 'v1.0.0' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { label, status, color }', t => {
  const svg = badgen({ label: 'npm', status: 'v1.0.0', color: 'ADF' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { label, status, style }', t => {
  const svg = badgen({ label: 'npm', status: 'v1.0.0', style: 'flat' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { label, status, color, style }', t => {
  const svg = badgen({ label: 'npm', status: 'v1.0.0', color: 'ADF', style: 'flat' })
  t.ok(typeof svg === 'string', 'successfully generated')
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { label, status, icon }', t => {
  const svg = badgen({ label: 'docker', status: 'icon', icon: icons.chrome })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { status, icon }', t => {
  const svg = badgen({ label: '', status: 'icon', icon: icons.chrome })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { status, icon, iconWidth }', t => {
  const svg = badgen({ label: '', status: 'icon', icon: icons.lgtm, iconWidth: 19 })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('generate badge with { label, status, icon, style }', t => {
  const svg = badgen({ label: 'docker', status: 'icon', style: 'flat', icon: icons.lgtm })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('ensure badgen() correctly escapes string inputs', t => {
  const svg = badgen({
    label: '<escape me>',
    status: '<escape me>',
    color: '<escape me>',
    icon: '<escape me>',
    labelColor: '<escape me>',
  })
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

tap.test('ensure bare() correctly escapes string inputs', t => {
  const svg = badgen({
    status: '<escape me>',
    color: '<escape me>',
  })
  t.matchSnapshot(svg, 'snapshot')
  t.end()
})

tap.test('type checking', t => {
  // @ts-ignore
  t.throws(() => badgen({}), TypeError, 'throw if status is non-string')
  t.end()
})
