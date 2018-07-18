const { Suite } = require('benchmark')
const badgen = require('..')

const longParams = { subject: 'build-build-build', status: 'passing-passing-passing' }
const fullParams = { subject: 'license', status: 'MIT', color: 'cyan' }
const emojiParams = { subject: 'emojis', status: '💩🤱🦄' }

new Suite()
  .add('[classic] style, long params ', () => badgen(longParams))
  .add('[classic] style, full params ', () => badgen(fullParams))
  .add('   [flat] style, long params ', () => badgen({ style: 'flat', ...longParams }))
  .add('   [flat] style, full params ', () => badgen({ style: 'flat', ...fullParams }))
  .add('[classic] style, multi bytes ', () => badgen(emojiParams))
  .on('cycle', event => console.log(String(event.target)))
  .run()
