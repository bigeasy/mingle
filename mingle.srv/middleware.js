var cadence = require('cadence')
var Dispatcher = require('inlet/dispatcher')
var resolve = require('./resolve')
var dns = require('dns')

function Resolver (name) {
    this._name = name
    var dispatcher = new Dispatcher({ object: this, workers: 256 })
    dispatcher.dispatch('GET /', 'index')
    dispatcher.dispatch('GET /discover', 'discover')
    dispatcher.dispatch('GET /health', 'health')
    this.dispatcher = dispatcher
}

Resolver.prototype.index = cadence(function () {
    return 'Mingle SRV Discovery API'
})

Resolver.prototype.discover = cadence(function (async) {
    resolve(dns, this._name, async())
})

Resolver.prototype.health = cadence(function () {
    return { http: this.dispatcher.turnstile.health }
})

module.exports = Resolver
