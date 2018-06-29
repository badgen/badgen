# badgen [![npm-version][npm-badge]][npm-link] [![install size][pp-badge]][pp-link]

Fast, handcraft, pure JavaScript badge generator.

- 🌀 Zero dependeny
- ⚡️ Fast (see [benchamrks](#benchmarks))

## Usage

### npm package

`npm install badgen`

```javascript
const badgen = require('badgen')

const svgString = badgen({
  subject: 'npm',
  status: 'v1.2.3',
  color: 'blue'
})
```

### Badge Service

https://badgen.now.sh/

## Benchmarks

`npm run bench` on my iMac5K(Late 2014), 3.5G i5, with Node.js 10.5.0:

```bash
generate by short params x 543,857 ops/sec ±0.98% (90 runs sampled)
generate by long params  x 512,747 ops/sec ±0.66% (91 runs sampled)
generate by full params  x 461,409 ops/sec ±0.78% (90 runs sampled)
```

## License

![ISC](https://badgen.now.sh/badge/license/ISC/blue)

[npm-badge]: https://img.shields.io/npm/v/badgen.svg
[npm-link]: https://www.npmjs.com/package/badgen
[pp-badge]: https://packagephobia.now.sh/badge?p=badgen
[pp-link]: https://packagephobia.now.sh/result?p=badgen
