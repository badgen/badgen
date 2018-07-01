const tap = require('tap')
const { Arial12 } = require('../lib/calc-text-width.js')

tap.test('calc width for "npm"', t => {
  t.ok(typeof Arial12 === 'function', 'export function: Arial12')
  t.ok(Number.isFinite(Arial12('npm')), 'result is a number')
  t.is(Arial12('npm'), 24.6, 'result is correct value')
  t.end()
})
