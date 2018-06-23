# badgen [![npm-version][npm-badge]][npm-link] [![install size][pp-badge]][pp-link]

Fast, handcraft, pure JavaScript badge generator.

- 🌀 No dependeny.
- ⚡️ 200K+ ops on average. (see [benchamrks](#Benchmarks))

## Usage

### Badge Service

`https://badgen.now.sh/badge/:subject/:status/:color`

- `subject` Text
- `status` Text
- `color` Color RGB (default '3C1') or Color Preset (`green`, `yellow`, ...see below)

Color Presets:

![](https://badgen.now.sh/badge/color/green/green)
![](https://badgen.now.sh/badge/color/yellow/yellow)
![](https://badgen.now.sh/badge/color/orange/orange)
![](https://badgen.now.sh/badge/color/red/red)
![](https://badgen.now.sh/badge/color/pink/pink)
![](https://badgen.now.sh/badge/color/purple/purple)
![](https://badgen.now.sh/badge/color/blue/blue)
![](https://badgen.now.sh/badge/color/grey/grey)
![](https://badgen.now.sh/badge/color/black/black)

Examples:

| Preview | URL |
| --- | --- |
|![](https://badgen.now.sh/badge/build/passing) | https://badgen.now.sh/badge/build/passing |
|![](https://badgen.now.sh/badge/stars/★★★★☆) | https://badgen.now.sh/badge/stars/★★★★☆ |
|![](https://badgen.now.sh/badge/style/standard/f2a) | https://badgen.now.sh/badge/style/standard/f2a |
|![](https://badgen.now.sh/badge/license/Apache-2.0/blue) | https://badgen.now.sh/badge/license/Apache-2.0/blue |
|![](https://badgen.now.sh/list/platform/ios,macos,tvos/grey) | https://badgen.now.sh/list/platform/ios,macos,tvos/grey |


### Programmatically

`npm install badgen`

```javascript
const badgen = require('badgen')

const svgString = badgen({
  subject: 'npm',
  status: 'v1.2.3',
  color: 'blue'
})
```

## Benchmarks

`npm run bench` on my iMac5K(Late 2014), 3.5G i5, with Node.js 10.5.0:

```bash
generate by short params x 420,831 ops/sec ±1.03% (87 runs sampled)
generate by long params  x 167,862 ops/sec ±1.21% (90 runs sampled)
generate by full params  x 245,303 ops/sec ±1.48% (92 runs sampled)
```

## License

ISC @ Amio

[npm-badge]: https://img.shields.io/npm/v/badgen.svg
[npm-link]: https://www.npmjs.com/package/badgen
[pp-badge]: https://packagephobia.now.sh/badge?p=badgen
[pp-link]: https://packagephobia.now.sh/result?p=badgen
