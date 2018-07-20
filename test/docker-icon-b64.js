const fs = require('fs')
const path = require('path')

const dockerSVG = fs.readFileSync(path.join(__dirname, 'docker.svg'))
const dockerIcon = 'data:image/svg+xml;base64,' + dockerSVG.toString('base64')

module.exports = dockerIcon
