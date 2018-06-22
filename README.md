# badgen [![npm-version][npm-badge]][npm-link] [![install size][pp-badge]][pp-link]

Fast, handcraft, pure JavaScript badge generator.

## Usage

### Micro Service

`https://badgen.now.sh/badge/:subject/:status/:color`

- `subject` Text
- `status` Text
- `color` RGB color (default '3C1')

Examples:  
| Preview | URL |
| --- | --- |
|![](https://badgen.now.sh/badge/build/passing) | https://badgen.now.sh/badge/build/passing |
|![](https://badgen.now.sh/badge/style/standard/f2a) | https://badgen.now.sh/badge/style/standard/f2a |
|![](https://badgen.now.sh/badge/license/Apache-2.0/07C) | https://badgen.now.sh/badge/license/Apache-2.0/07C |

### As npm package

```npm install badgen```

## License

MIT @ Amio

[npm-badge]: https://img.shields.io/npm/v/badgen.svg
[npm-link]: https://www.npmjs.com/package/badgen
[pp-badge]: https://packagephobia.now.sh/badge?p=badgen
[pp-link]: https://packagephobia.now.sh/result?p=badgen
