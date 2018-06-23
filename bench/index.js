const { Suite } = require('benchmark')
const badgen = require('..')

new Suite().add('generate by short params', function () {
  badgen({ subject: 'b', status: 'p' })
}).add('generate by long params ', function () {
  badgen({ subject: 'build-build-build', status: 'passing-passing-passing' })
}).add('generate by full params ', function () {
  badgen({ subject: 'license', status: 'Apache-2.0', color: 'blue' })
}).on('cycle', function (event) {
  console.log(String(event.target))
}).run()
