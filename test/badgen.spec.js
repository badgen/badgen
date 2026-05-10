const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { badgen } = require('../dist')
const icons = require('./assets/icon-data-uri.js')
const { matchSnapshot } = require('./snapshot')

const mockMath = Object.create(global.Math)
mockMath.random = () => 0.5

const snapshotFile = path.join(__dirname, '..', 'tap-snapshots', 'test', 'badgen.spec.js.test.cjs')
const snapshotKey = name => `test/badgen.spec.js TAP ${name} > snapshot 1`

function withDeterministicRandom(run) {
  const originalMath = global.Math
  global.Math = mockMath

  try {
    return run()
  } finally {
    global.Math = originalMath
  }
}

test('generate badge with { label, status }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ label: 'npm', status: 'v1.0.0' })
    assert.equal(typeof svg, 'string')
    matchSnapshot(snapshotFile, snapshotKey('generate badge with { label, status }'), svg)
  })
})

test('generate badge with { label, status, color }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ label: 'npm', status: 'v1.0.0', color: 'ADF' })
    assert.equal(typeof svg, 'string')
    matchSnapshot(snapshotFile, snapshotKey('generate badge with { label, status, color }'), svg)
  })
})

test('generate badge with { label, status, style }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ label: 'npm', status: 'v1.0.0', style: 'flat' })
    assert.equal(typeof svg, 'string')
    matchSnapshot(snapshotFile, snapshotKey('generate badge with { label, status, style }'), svg)
  })
})

test('generate badge with { label, status, color, style }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ label: 'npm', status: 'v1.0.0', color: 'ADF', style: 'flat' })
    assert.equal(typeof svg, 'string')
    matchSnapshot(snapshotFile, snapshotKey('generate badge with { label, status, color, style }'), svg)
  })
})

test('generate badge with { label, status, icon }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ label: 'docker', status: 'icon', icon: icons.chrome })
    matchSnapshot(snapshotFile, snapshotKey('generate badge with { label, status, icon }'), svg)
  })
})

test('generate badge with { status, icon }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ label: '', status: 'icon', icon: icons.chrome })
    matchSnapshot(snapshotFile, snapshotKey('generate badge with { status, icon }'), svg)
  })
})

test('generate badge with { status, icon, iconWidth }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ label: '', status: 'icon', icon: icons.lgtm, iconWidth: 19 })
    matchSnapshot(snapshotFile, snapshotKey('generate badge with { status, icon, iconWidth }'), svg)
  })
})

test('generate badge with { label, status, icon, style }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ label: 'docker', status: 'icon', style: 'flat', icon: icons.lgtm })
    matchSnapshot(snapshotFile, snapshotKey('generate badge with { label, status, icon, style }'), svg)
  })
})

test('ensure badgen() correctly escapes string inputs', () => {
  withDeterministicRandom(() => {
    const svg = badgen({
      label: '<escape me>',
      status: '<escape me>',
      color: '<escape me>',
      icon: '<escape me>',
      labelColor: '<escape me>',
    })
    matchSnapshot(snapshotFile, snapshotKey('ensure badgen() correctly escapes string inputs'), svg)
  })
})

test('generate bare badge with { status }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ status: 'v1.0.0' })
    assert.equal(typeof svg, 'string')
    matchSnapshot(snapshotFile, snapshotKey('generate bare badge with { status }'), svg)
  })
})

test('generate bare badge with { status, color }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ status: 'v1.0.0', color: 'ADF' })
    assert.equal(typeof svg, 'string')
    matchSnapshot(snapshotFile, snapshotKey('generate bare badge with { status, color }'), svg)
  })
})

test('generate bare badge with { status, style }', () => {
  withDeterministicRandom(() => {
    const svg = badgen({ status: 'v1.0.0', style: 'flat' })
    assert.equal(typeof svg, 'string')
    matchSnapshot(snapshotFile, snapshotKey('generate bare badge with { status, style }'), svg)
  })
})

test('ensure bare() correctly escapes string inputs', () => {
  withDeterministicRandom(() => {
    const svg = badgen({
      status: '<escape me>',
      color: '<escape me>',
    })
    matchSnapshot(snapshotFile, snapshotKey('ensure bare() correctly escapes string inputs'), svg)
  })
})

test('type checking', () => {
  // @ts-ignore
  assert.throws(() => badgen({}), TypeError)
})

test('supports Node ESM import', async () => {
  const imported = await import('badgen')

  assert.equal(typeof imported.badgen, 'function')
  assert.equal(typeof imported.calcWidth, 'function')
  assert.equal(typeof imported.default, 'function')
  assert.equal(imported.default, imported.badgen)

  withDeterministicRandom(() => {
    assert.equal(
      imported.default({ label: 'npm', status: 'v1.0.0' }),
      badgen({ label: 'npm', status: 'v1.0.0' })
    )
  })
})

test('supports direct browser script usage', () => {
  const browserBundle = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.browser.js'), 'utf8')
  const sandbox = { Math: mockMath, window: {} }
  vm.createContext(sandbox)
  vm.runInContext(browserBundle, sandbox)

  assert.equal(typeof sandbox.window.badgen, 'function')
  assert.equal(typeof sandbox.window.badgen({ status: 'ok' }), 'string')

  withDeterministicRandom(() => {
    assert.equal(
      sandbox.window.badgen({ label: 'npm', status: 'v1.0.0' }),
      badgen({ label: 'npm', status: 'v1.0.0' })
    )
  })
})
