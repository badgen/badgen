const { Suite } = require('benchmark')
const { badgen, calcWidth } = require('..')
const icons = require('../test/assets/icon-data-uri.js')

/* eslint max-len: ["error", { "code": 90 }] */
const longText = 'build-'.repeat(512)
const longParams = { label: 'build-build-build', status: 'passing-passing-passing' }
const fullParams = { label: 'license', status: 'Apache 2.0', color: 'cyan' }
const emojiParams = { label: 'emojis', status: '💩🤱🦄💩🤱🦄' }
const iconParams = { label: 'docker', status: 'badge', icon: icons.chrome }
const unicodeParams = {
  label: 'unicode',
  status: `${'測試'.repeat(24)}${'👩‍💻'.repeat(12)}`,
  color: 'green'
}
const escapedParams = {
  label: `"><script>alert('x')</script>`,
  status: '& <done> "quoted"',
  color: `bad" onload="alert(1)`,
  labelColor: `bad" onclick="alert(1)`
}
const iconBoundaryParams = {
  label: 'icon-width',
  status: 'fractional',
  icon: icons.lgtm,
  iconWidth: 1.5,
  scale: 0.5
}

new Suite()
  .add('[classic] style, long params', () => badgen(longParams))
  .add('[classic] style, full params', () => badgen(fullParams))
  .add('[classic] style, with emoji ', () => badgen(emojiParams))
  .add('[classic] style, with icon  ', () => badgen(iconParams))
  .add('[classic] style, unicode   ', () => badgen(unicodeParams))
  .add('[classic] style, escaped   ', () => badgen(escapedParams))
  .add('   [flat] style, long params', () => badgen({ style: 'flat', ...longParams }))
  .add('   [flat] style, full params', () => badgen({ style: 'flat', ...fullParams }))
  .add('   [flat] style, with emoji ', () => badgen({ style: 'flat', ...emojiParams }))
  .add('   [flat] style, with icon  ', () => badgen({ style: 'flat', ...iconParams }))
  .add('   [flat] style, boundaries ', () => badgen({ style: 'flat', ...iconBoundaryParams }))
  .add('       calcWidth, long text ', () => calcWidth(longText))
  .on('cycle', event => console.log(String(event.target)))
  .run()
