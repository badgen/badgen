
const sanitize = str => str.replace(/\u0026/g, '&amp;').replace(/\u003C/g, '&lt;')

const typeAssert = (assertion, message) => {
  if (!assertion) throw new TypeError(message)
}

module.exports = {
  sanitize,
  typeAssert
}
