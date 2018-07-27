# badgen

[![npm version][npm-badge]][npm-link]
[![install size][pp-badge]][pp-link]
[![Coverage Status][cr-badge]][cr-link]

Fast handcraft svg badge generator.

- 🌀 1 dependency ([unicode-astral-regex][uar-link])
- ⚡️ Fast by design (see [benchmarks](#benchmarks))
- 👯‍ Pure JavaScript, running in node & browser

## Usage

### npm package

`npm install badgen`

```javascript
const badgen = require('badgen')

const svgString = badgen({
  subject: 'npm',   // <Text>
  status: 'v1.2.3', // <Text>
  color: 'blue',    // <Color RGB> or <Color Name>, optional
  style: 'flat',    // 'flat' or undefined, optional
  emoji: true,      // Support emoji in text, optional
  icon: 'data:image/svg+xml;base64,PHN2Zy...' // Use icon, optional
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

### Badge As A Service

https://badgen.net

## Benchmarks

`npm run bench` on my iMac5K(Late 2014), 3.5G i5, with Node.js 10.5.0:

```bash
[classic] style, long params  x 1,071,083 ops/sec ±0.82% (89 runs sampled)
[classic] style, full params  x 1,332,181 ops/sec ±0.80% (92 runs sampled)
   [flat] style, long params  x 1,145,825 ops/sec ±0.73% (94 runs sampled)
   [flat] style, full params  x 1,416,453 ops/sec ±0.69% (91 runs sampled)
```

## License

![ISC](https://badgen.net/badge/license/ISC/blue)

[npm-badge]: https://badgen.net/npm/v/badgen
[npm-link]: https://www.npmjs.com/package/badgen
[pp-badge]: https://packagephobia.now.sh/badge?p=badgen
[pp-link]: https://packagephobia.now.sh/result?p=badgen
[cr-badge]: https://coveralls.io/repos/github/amio/badgen/badge.svg?branch=master
[cr-link]: https://coveralls.io/github/amio/badgen?branch=master
[uar-link]: https://www.npmjs.com/package/unicode-astral-regex
