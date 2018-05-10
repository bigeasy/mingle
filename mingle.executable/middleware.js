var cadence = require('cadence')
var Reactor = require('reactor')

function Middleware (resolver) {
    this._resolver = resolver
    this.reactor = new Reactor(this, function (dispatcher) {
        dispatcher.dispatch('GET /', 'index')
        dispatcher.dispatch('GET /discover', 'discover')
        dispatcher.dispatch('GET /health', 'health')
    })
}

Middleware.prototype.index = cadence(function () {
    return [ 200, { 'content-type': 'text/plain' }, this._resolver.index ]
})

Middleware.prototype.discover = function (request, callback) {
    this._resolver.resolve(callback)
}

Middleware.prototype.health = cadence(function () {
    return { http: this.reactor.turnstile.health }
})

module.exports = Middleware
