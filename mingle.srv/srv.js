var cadence = require('cadence')
var coalesce = require('extant')
var dns = require('dns')
var resolve = require('./resolve')

function Resolver (properties) {
    this._name = properties.name
    this._format = coalesce(properties.format, '%s:%d')
}

Resolver.prototype.resolve = cadence(function (async) {
    resolve(dns, this._name, this._format, async())
})

module.exports = cadence(function (async, destructible, properties) {
    return new Resolver(properties)
})
