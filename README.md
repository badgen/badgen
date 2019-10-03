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

// only `status` is required.
const svgString = badgen({
  label: 'npm',     // <Text>
  labelColor: 'ADF' // <Color RGB> or <Color Name> (default 555)
  status: 'v1.2.3', // <Text>, required
  color: 'blue',    // <Color RGB> or <Color Name> (default blue)
  style: 'flat',    // 'flat' or undefined
  icon: 'data:image/svg+xml;base64,...', // Use icon
  iconWidth: 13,    // Set this if icon is not square
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
<script src="https://wzrd.in/standalone/badgen@latest"></script>
<script>
  var svgString = badgen({ /*...*/ })
</script>
```

## Benchmarks

`npm run bench` on iMac 5K (Late 2014), 3.5G i5, with Node.js 12.11.0:

```bash
[classic] style, long params x 985,898 ops/sec ±0.37% (94 runs sampled)
[classic] style, full params x 1,284,886 ops/sec ±0.42% (95 runs sampled)
[classic] style, with emoji  x 1,291,768 ops/sec ±0.28% (95 runs sampled)
[classic] style, with icon   x 1,177,120 ops/sec ±0.94% (95 runs sampled)
   [flat] style, long params x 780,504 ops/sec ±0.39% (94 runs sampled)
   [flat] style, full params x 1,012,111 ops/sec ±0.40% (97 runs sampled)
   [flat] style, with emoji  x 1,013,695 ops/sec ±0.91% (95 runs sampled)
   [flat] style, with icon   x 994,481 ops/sec ±0.30% (94 runs sampled)
```

## See Also

- [gradient-badge][gradient-badge] - Badge generator with color gradient support

[npm-src]: https://badgen.net/npm/v/badgen
[npm-href]: https://www.npmjs.com/package/badgen
[packagephobia-src]: https://badgen.net/packagephobia/install/badgen
[packagephobia-href]: https://packagephobia.now.sh/result?p=badgen
[coveralls-src]: https://badgen.net/coveralls/c/github/amio/badgen/master
[coveralls-href]: https://coveralls.io/github/amio/badgen?branch=master
[license-src]: https://badgen.net/github/license/amio/badgen
[license-href]: LICENSE.md
[gradient-badge]: https://github.com/bokub/gradient-badge
