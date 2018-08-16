// Converts results like 60.599999999999994 to 60.6
module.exports = value => Math.round(value * 10) / 10
