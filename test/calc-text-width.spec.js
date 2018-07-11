const tap = require('tap')
const calcWidth = require('../lib/calc-text-width.js').Verdana11

tap.test('calc width for "npm"', t => {
  t.ok(typeof calcWidth === 'function', 'export calcWidth function')
  t.ok(Number.isFinite(calcWidth('npm')), 'result is a number')
  t.is(calcWidth('npm'), 24.9, 'result is correct value')
  t.end()
})
