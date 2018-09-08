# badgen

[![npm version][npm-src]][npm-href]
[![Coverage Status][coveralls-src]][coveralls-href]
[![Install size][packagephobia-src]][packagephobia-href]
[![License][license-src]][license-href]

Fast handcraft svg badge generator. Used on [badgen.net](https://badgen.net).

- 🌀 Zero dependency
- ⚡️ Fast by design (see [benchmarks](#benchmarks))
- 👯‍ Pure JavaScript, running in node & browser

## Usage

`npm install badgen`

```javascript
const badgen = require('badgen')

const svgString = badgen({
  subject: 'npm',   // <Text>
  status: 'v1.2.3', // <Text>
  color: 'blue',    // <Color RGB> or <Color Name>, optional
  style: 'flat',    // 'flat' or undefined, optional
  icon: 'data:image/svg+xml;base64,...', // Use icon, optional
  iconWidth: 13     // Use this if icon is not square.
})
```

Available color names:

![](https://badgen.net/badge/color/blue/blue)
![](https://badgen.net/badge/color/cyan/cyan)
![](https://badgen.net/badge/color/green/green)
![](https://badgen.net/badge/color/yellow/yellow)
![](https://badgen.net/badge/color/orange/orange)
![](https://badgen.net/badge/color/red/red)
![](https://badgen.net/badge/color/pink/pink)
![](https://badgen.net/badge/color/purple/purple)
![](https://badgen.net/badge/color/grey/grey)
![](https://badgen.net/badge/color/black/black)

### In browser

```html
<script src="https://cdn.jsdelivr.net/npm/badgen/badgen.min.js"></script>
<script>
  var svgString = badgen({ /*...*/ })
</script>
```

## Benchmarks

`npm run bench` on my MacBook Pro (Early 2015), 2.7G i5, with Node.js 10.9.0:

```bash
[classic] style, long params x 784,111 ops/sec ±1.53% (89 runs sampled)
[classic] style, full params x 1,096,667 ops/sec ±1.37% (90 runs sampled)
[classic] style, with emoji  x 1,086,230 ops/sec ±1.85% (92 runs sampled)
[classic] style, with icon   x 941,914 ops/sec ±0.41% (93 runs sampled)
   [flat] style, long params x 546,447 ops/sec ±0.52% (91 runs sampled)
   [flat] style, full params x 612,977 ops/sec ±1.08% (94 runs sampled)
   [flat] style, with emoji  x 620,193 ops/sec ±0.95% (92 runs sampled)
   [flat] style, with icon   x 566,848 ops/sec ±0.84% (93 runs sampled)
```

[npm-src]: https://badgen.net/npm/v/badgen
[npm-href]: https://www.npmjs.com/package/badgen
[packagephobia-src]: https://badgen.net/packagephobia/install/badgen
[packagephobia-href]: https://packagephobia.now.sh/result?p=badgen
[coveralls-src]: https://badgen.net/coveralls/c/github/amio/badgen/master
[coveralls-href]: https://coveralls.io/github/amio/badgen?branch=master
[license-src]: https://badgen.net/github/license/amio/badgen
[license-href]: LICENSE.md
