const Keyify = require('keyify')

module.exports = function (previous, next) {
    if (previous.length == 0 || next.length == 0) {
        return false
    }
    if (previous.length != next.length) {
        return false
    }
    const verify = previous.map(Keyify.stringify).sort()
    return next.map(Keyify.stringify).sort().filter(function (value, index) {
        return verify[index] == value
    }).length == verify.length
}
