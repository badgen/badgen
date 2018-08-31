const fs = require('fs')
const path = require('path')

const readAsDataURI = file => {
  const svg = fs.readFileSync(path.join(__dirname, file))
  return `data:image/svg+xml;base64,${svg.toString('base64')}`
}

module.exports = {
  chrome: readAsDataURI('chrome.svg'),
  lgtm: readAsDataURI('lgtm.svg')
}
