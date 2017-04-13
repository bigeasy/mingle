var cadence = require('cadence')
var Reactor = require('reactor')

function Service (resolver) {
    this._resolver = resolver
    this.reactor = new Reactor(this, function (dispatcher) {
        dispatcher.dispatch('GET /', 'index')
        dispatcher.dispatch('GET /discover', 'discover')
        dispatcher.dispatch('GET /health', 'health')
    })
}

Service.prototype.index = cadence(function () {
    return 'Mingle Kubernetes Discovery API\n'
})

Service.prototype.discover = cadence(function (async) {
    this._resolver.resolve(async())
})

Service.prototype.health = cadence(function () {
    return { http: this.reactor.turnstile.health }
})

module.exports = Service
