const tap = require('tap')
const calcWidth = require('../lib/calc-text-width.js').Verdana11

tap.test('basic functions', t => {
  t.ok(typeof calcWidth === 'function', 'export calcWidth function')
  t.ok(Number.isFinite(calcWidth('')), 'result is a number')
  t.ok(calcWidth('') === 0, 'return 0 for empty string')
  t.end()
})

tap.test('calc width for "npm"', t => {
  t.matchSnapshot(calcWidth('npm'), 'result is correct')
  t.end()
})

tap.test('calc width for unicode', t => {
  t.matchSnapshot(calcWidth('壹佰贰拾叁'), 'result is correct')
  t.end()
})

tap.test('calc width for accented characters', t => {
  t.ok(calcWidth('ien') === calcWidth('ïéǹ'), 'normal and accented characters have the same width')
  t.end()
})

tap.test('calc width for emojis', t => {
  t.matchSnapshot(calcWidth('💩🤱🦄', true), 'result is correct')
  t.end()
})

tap.test('calc width for (not really) emojis', t => {
  t.matchSnapshot(calcWidth('', true), 'result is correct')
  t.end()
})
