const fs = require('fs')
const path = require('path')

const iconSVG = fs.readFileSync(path.join(__dirname, 'icon.svg'))
const iconDataURI = 'data:image/svg+xml;base64,' + iconSVG.toString('base64')

module.exports = iconDataURI
