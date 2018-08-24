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
  icon: 'data:image/svg+xml;base64,PHN2Zy...', // Use icon, optional
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

## Benchmarks

`npm run bench` on my MacBook Pro (Early 2015), 2.7G i5, with Node.js 10.9.0:

```bash
[classic] style, long params x 1,317,650 ops/sec ±0.44% (88 runs sampled)
[classic] style, full params x 1,711,139 ops/sec ±0.51% (94 runs sampled)
[classic] style, with emoji  x 1,308,026 ops/sec ±1.94% (88 runs sampled)
[classic] style, with icon   x 1,476,024 ops/sec ±0.48% (92 runs sampled)
   [flat] style, long params x 663,252 ops/sec ±0.65% (93 runs sampled)
   [flat] style, full params x 739,821 ops/sec ±1.56% (94 runs sampled)
   [flat] style, with emoji  x 674,228 ops/sec ±3.05% (88 runs sampled)
   [flat] style, with icon   x 764,540 ops/sec ±2.58% (88 runs sampled)
```

[npm-src]: https://badgen.net/npm/v/badgen
[npm-href]: https://www.npmjs.com/package/badgen
[packagephobia-src]: https://badgen.net/packagephobia/install/badgen
[packagephobia-href]: https://packagephobia.now.sh/result?p=badgen
[coveralls-src]: https://badgen.net/coveralls/c/github/amio/badgen/master
[coveralls-href]: https://coveralls.io/github/amio/badgen?branch=master
[license-src]: https://badgen.net/github/license/amio/badgen
[license-href]: LICENSE.md
