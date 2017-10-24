var cadence = require('cadence')
var Reactor = require('reactor')
var resolve = require('./resolve')
var dns = require('dns')

function Resolver (name, format) {
    this._name = name
    this._format = format
    this.reactor = new Reactor(this, function (dispatcher) {
        dispatcher.dispatch('GET /', 'index')
        dispatcher.dispatch('GET /discover', 'discover')
        dispatcher.dispatch('GET /health', 'health')
    })
}

Resolver.prototype.index = cadence(function () {
    return 'Mingle SRV Discovery API'
})

Resolver.prototype.discover = cadence(function (async) {
    resolve(dns, this._name, this._format, async())
})

Resolver.prototype.health = cadence(function () {
    return { http: this.reactor.turnstile.health }
})

module.exports = Resolver
