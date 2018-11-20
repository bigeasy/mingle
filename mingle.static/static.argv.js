var cadence = require('cadence')
var coalesce = require('extant')
var sprintf = require('sprintf-js').sprintf

function Resolver (properties) {
    var format = coalesce(properties.format, '%s:%d')
    this._addresses = properties.addresses.map(function (address) {
        var pair = address.split(':')
        return sprintf(format, pair[0], +pair[1])
    })
}

Resolver.prototype.resolve = cadence(function (async) {
    return [ this._addresses ]
})

module.exports = cadence(function (async, destructible, properties) {
    return new Resolver(properties)
})
