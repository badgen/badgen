const tap = require('tap')
const calcWidth = require('../lib/calc-text-width.js').Verdana11

tap.test('basic functions', t => {
  t.ok(typeof calcWidth === 'function', 'export calcWidth function')
  t.ok(Number.isFinite(calcWidth('')), 'result is a number')
  t.ok(calcWidth('') === 0, 'return 0 for empty string')
  t.end()
})

tap.test('calc width for "npm"', t => {
  t.is(calcWidth('npm'), 24.9, 'result is correct value')
  t.end()
})

tap.test('calc width for unicode', t => {
  t.is(calcWidth('壹佰贰拾叁'), 55, 'result is correct value')
  t.end()
})

tap.test('exception handling', t => {
  t.throws(() => calcWidth(0), TypeError, 'throw if feed with non-string input')
  t.end()
})
