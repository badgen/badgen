const tap = require('tap')
const { Verdana12 } = require('../lib/calc-text-width.js')

tap.test('calc width for "npm"', t => {
  t.ok(typeof Verdana12 === 'function', 'export function: Verdana12')
  t.ok(Number.isFinite(Verdana12('npm')), 'result is a number')
  t.is(Verdana12('npm'), 26.77, 'result is correct value')
  t.end()
})
