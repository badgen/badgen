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

function getSvgAttribute(svg, name) {
  const root = svg.match(/^<svg\b[^>]*>/)

  assert.ok(root, 'SVG root element should be present')

  const match = root[0].match(new RegExp(`\\b${name}="([^"]+)"`))

  assert.ok(match, `SVG root should expose ${name}`)

  return match[1]
}

function assertSvgDimensionsAreFinite(svg) {
  const viewBox = getSvgAttribute(svg, 'viewBox').split(/\s+/)

  assert.equal(viewBox.length, 4, 'SVG viewBox should expose four dimensions')
  assert.doesNotMatch(
    svg,
    /\b(?:NaN|Infinity|-Infinity)\b/,
    'SVG should not contain non-finite numbers'
  )

  for (const [name, value] of [
    ['width', getSvgAttribute(svg, 'width')],
    ['height', getSvgAttribute(svg, 'height')],
    ['viewBox width', viewBox[2]],
    ['viewBox height', viewBox[3]],
  ]) {
    assert.equal(Number.isFinite(Number(value)), true, `${name} should be finite`)
  }
}

function getEmbeddedImageHref(svg) {
  const imageTags = svg.match(/<image\b[^>]*\/>/g) || []

  assert.equal(imageTags.length, 1, 'SVG should contain exactly one embedded image')

  const href = imageTags[0].match(/\bxlink:href="([^"]*)"/)
  assert.ok(href, 'embedded image should expose xlink:href')

  return href[1]
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

test('escapes XML metacharacters in text and accessible labels', () => {
  withDeterministicRandom(() => {
    const payload = `"><script>alert('x')</script>&<tag>`
    const escapedPayload = [
      '&quot;&gt;',
      '&lt;script&gt;alert(&apos;x&apos;)&lt;/script&gt;',
      '&amp;&lt;tag&gt;'
    ].join('')
    const svg = badgen({ label: payload, status: payload })
    const accessibleText = `${escapedPayload}: ${escapedPayload}`

    assertSvgDimensionsAreFinite(svg)
    assert.ok(svg.includes(escapedPayload), 'text payload should be entity-escaped')
    assert.ok(svg.includes(`<title>${accessibleText}</title>`), 'title should use escaped text')
    assert.ok(svg.includes(`aria-label="${accessibleText}"`), 'aria-label should use escaped text')
    assert.doesNotMatch(svg, /<script\b/i, 'script tags must not be emitted from text payloads')
    assert.doesNotMatch(svg, /<tag\b/i, 'arbitrary XML tags must not be emitted from text payloads')
  })
})

test('escapes attribute-breaking color values', () => {
  withDeterministicRandom(() => {
    const payload = `bad" onload="alert(1)`
    const svg = badgen({
      label: 'color',
      status: 'safe',
      color: payload,
      labelColor: payload
    })

    assertSvgDimensionsAreFinite(svg)
    assert.ok(
      svg.includes('fill="#bad&quot; onload=&quot;alert(1)"'),
      'color payload should be escaped inside fill attributes'
    )
    assert.doesNotMatch(
      svg,
      /fill="#[^"]*"\s+onload=/i,
      'color payload must not break out into an onload attribute'
    )
  })
})

test('escapes malicious icon data before embedding in xlink:href', () => {
  withDeterministicRandom(() => {
    const payload = [
      `data:image/svg+xml,<svg onload="alert('x')"></svg>`,
      `" /><script>alert(1)</script>`
    ].join('')
    const svg = badgen({ label: 'icon', status: 'safe', icon: payload })
    const href = getEmbeddedImageHref(svg)
    const escapedIconFragment = '&lt;svg onload=&quot;alert(&apos;x&apos;)&quot;&gt;&lt;/svg&gt;'
    const escapedScriptFragment = '&lt;script&gt;alert(1)&lt;/script&gt;'

    assertSvgDimensionsAreFinite(svg)
    assert.ok(href.includes(escapedIconFragment), 'icon SVG markup should be escaped')
    assert.ok(href.includes(escapedScriptFragment), 'script markup in icon data should be escaped')
    assert.doesNotMatch(svg, /<script\b/i, 'script tags must not be emitted from icon payloads')
    assert.doesNotMatch(
      svg,
      /<svg\s+onload=/i,
      'icon payload must not emit an executable nested SVG tag'
    )
  })
})

test('handles long mixed unicode and emoji inputs without invalid dimensions', () => {
  withDeterministicRandom(() => {
    const longLabel = `${'build-'.repeat(512)}${'🚀'.repeat(64)}`
    const longStatus = `${'passed-'.repeat(512)}${'測試'.repeat(128)}${'👩‍💻'.repeat(64)}`
    const svg = badgen({
      label: longLabel,
      status: longStatus,
      color: 'green',
      style: 'flat',
      scale: 0.5
    })

    assertSvgDimensionsAreFinite(svg)
    assert.ok(svg.includes('🚀'), 'emoji label content should be preserved')
    assert.ok(svg.includes('👩‍💻'), 'ZWJ emoji status content should be preserved')
    assert.ok(
      svg.length > longLabel.length + longStatus.length,
      'SVG should include generated markup around long text'
    )
  })
})

test('handles finite unusual scale and iconWidth values without invalid dimensions', () => {
  withDeterministicRandom(() => {
    for (const params of [
      { label: 'scale-zero', status: 'ok', scale: 0 },
      { label: 'scale-fraction', status: 'ok', scale: 0.25 },
      { label: 'icon-zero', status: 'ok', icon: icons.chrome, iconWidth: 0 },
      { label: 'icon-fraction', status: 'ok', icon: icons.chrome, iconWidth: 1.5 },
      { label: 'icon-large', status: 'ok', icon: icons.chrome, iconWidth: 1000, scale: 2 },
    ]) {
      const svg = badgen(params)

      assertSvgDimensionsAreFinite(svg)
      if (params.icon) getEmbeddedImageHref(svg)
    }
  })
})

test('rejects non-finite scale and iconWidth values', () => {
  for (const params of [
    { status: 'ok', scale: Number.NaN },
    { status: 'ok', scale: Number.POSITIVE_INFINITY },
    { label: 'icon', status: 'ok', icon: icons.chrome, iconWidth: Number.NaN },
    { label: 'icon', status: 'ok', icon: icons.chrome, iconWidth: Number.POSITIVE_INFINITY },
  ]) {
    assert.throws(() => badgen(params), TypeError)
  }
})

test('rejects non-string icon values before rendering', () => {
  assert.throws(
    () => badgen({ label: 'icon', status: 'safe', icon: {} }),
    TypeError
  )
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
