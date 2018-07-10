const tap = require('tap')
const calcWidth = require('../lib/calc-text-width.js').Verdana11

tap.test('calc width for "npm"', t => {
  t.ok(typeof calcWidth === 'function', 'export function: Verdana12')
  t.ok(Number.isFinite(calcWidth('npm')), 'result is a number')
  t.is(calcWidth('npm'), 24.51, 'result is correct value')
  t.end()
})
