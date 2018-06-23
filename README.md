# badgen [![npm-version][npm-badge]][npm-link] [![install size][pp-badge]][pp-link]

Fast, handcraft, pure JavaScript badge generator.

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
|![](https://badgen.now.sh/badge/style/standard/f2a) | https://badgen.now.sh/badge/style/standard/f2a |
|![](https://badgen.now.sh/badge/license/Apache-2.0/blue) | https://badgen.now.sh/badge/license/Apache-2.0/blue |
|![](https://badgen.now.sh/badge/platform/ios%20%7C%20osx%20%7C%20tvos%20%7C%20watchos/grey) | https://badgen.now.sh/badge/platform/ios%20%7C%20osx%20%7C%20tvos%20%7C%20watchos/grey |


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

## License

MIT @ Amio

[npm-badge]: https://img.shields.io/npm/v/badgen.svg
[npm-link]: https://www.npmjs.com/package/badgen
[pp-badge]: https://packagephobia.now.sh/badge?p=badgen
[pp-link]: https://packagephobia.now.sh/result?p=badgen
