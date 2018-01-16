var Keyify = require('keyify')

function keyify (value) { return Keyify.stringify(value) }

module.exports = function (previous, next) {
    if (previous.length == 0 || next.length == 0) {
        return false
    }
    if (previous.length != next.length) {
        return false
    }
    var verify = previous.map(keyify).sort()
    return next.map(keyify).sort().filter(function (value, index) {
        return verify[index] == value
    }).length == verify.length
}
