const { Suite } = require('benchmark')
const badgen = require('..')
const icon = require('../test/assets/icon-data-uri.js')

/* eslint max-len: ["error", { "code": 90 }] */
const longParams = { subject: 'build-build-build', status: 'passing-passing-passing' }
const fullParams = { subject: 'license', status: 'Apache 2.0', color: 'cyan' }
const emojiParams = { subject: 'emojis', status: '💩🤱🦄💩🤱🦄', emoji: true }
const iconParams = { subject: 'docker', status: 'badge', icon }

new Suite()
  .add('[classic] style, long params', () => badgen(longParams))
  .add('[classic] style, full params', () => badgen(fullParams))
  .add('[classic] style, with emoji ', () => badgen(emojiParams))
  .add('[classic] style, with icon  ', () => badgen(iconParams))
  .add('   [flat] style, long params', () => badgen({ style: 'flat', ...longParams }))
  .add('   [flat] style, full params', () => badgen({ style: 'flat', ...fullParams }))
  .add('   [flat] style, with emoji ', () => badgen({ style: 'flat', ...emojiParams }))
  .add('   [flat] style, with icon  ', () => badgen({ style: 'flat', ...iconParams }))
  .on('cycle', event => console.log(String(event.target)))
  .run()
