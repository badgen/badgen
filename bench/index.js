const { Suite } = require('benchmark')
const badgen = require('..')
const dockerIcon = require('../test/docker-icon-b64.js')

const longParams = { subject: 'build-build-build', status: 'passing-passing-passing' }
const fullParams = { subject: 'license', status: 'Apache 2.0', color: 'cyan' }
const emojiParams = { subject: 'emojis', status: '💩🤱🦄💩🤱🦄', emoji: true }
const iconParams = { subject: 'docker', status: 'badge', icon: dockerIcon }

new Suite()
  .add('[classic] style, long params', () => badgen(longParams))
  .add('[classic] style, full params', () => badgen(fullParams))
  .add('   [flat] style, long params', () => badgen({ style: 'flat', ...longParams }))
  .add('   [flat] style, full params', () => badgen({ style: 'flat', ...fullParams }))
  .add('[classic] style, with emoji ', () => badgen(emojiParams))
  .add('[classic] style, with icon  ', () => badgen(iconParams))
  .on('cycle', event => console.log(String(event.target)))
  .run()
