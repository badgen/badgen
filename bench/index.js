const { Suite } = require('benchmark')
const badgen = require('..')

const shortParams = { subject: '1', status: '2' }
const longParams = { subject: 'build-build-build', status: 'passing-passing-passing' }
const fullParams = { subject: 'license', status: 'MIT', color: 'cyan' }

new Suite()
  .add('generate by short params', () => badgen(shortParams))
  .add('generate by long params ', () => badgen(longParams))
  .add('generate by full params ', () => badgen(fullParams))
  .on('cycle', event => console.log(String(event.target)))
  .run()
