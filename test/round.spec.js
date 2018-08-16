const tap = require('tap')
const round = require('../lib/round')

tap.test('basic functions', t => {
  t.ok(typeof round === 'function', 'export round function')
  t.ok(Number.isFinite(round('')), 'result is a number')
  t.ok(round('') === 0, 'return 0 for empty string')
  t.end()
})

tap.test('rounds integer to zero decimal places', t => {
  t.matchSnapshot(round(1), 'result is correct')
  t.end()
})

tap.test('rounds decimal to one decimal place', t => {
  t.matchSnapshot(round(1.599999999999994), 'result is correct')
  t.end()
})
