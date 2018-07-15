const { Suite } = require('benchmark')
const badgen = require('..')

const longParams = { subject: 'build-build-build', status: 'passing-passing-passing' }
const fullParams = { subject: 'license', status: 'MIT', color: 'cyan' }

new Suite()
  .add('[classic] style, long params ', () => badgen(longParams))
  .add('[classic] style, full params ', () => badgen(fullParams))
  .add('   [flat] style, long params ', () => badgen(longParams, { style: 'flat' }))
  .add('   [flat] style, full params ', () => badgen(fullParams, { style: 'flat' }))
  .on('cycle', event => console.log(String(event.target)))
  .run()
