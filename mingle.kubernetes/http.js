var cadence = require('cadence')
var Dispatcher = require('inlet/dispatcher')

function Service (resolver) {
    this._resolver = resolver
    var dispatcher = new Dispatcher(this)
    dispatcher.dispatch('GET /', 'index')
    dispatcher.dispatch('GET /discover', 'discover')
    dispatcher.dispatch('GET /health', 'health')
    this.dispatcher = dispatcher
}

Service.prototype.index = cadence(function () {
    return 'Mingle Kubernetes Discovery API\n'
})

Service.prototype.discover = cadence(function (async) {
    this._resolver.resolve(async())
})

Service.prototype.health = cadence(function () {
    return { http: this.dispatcher.turnstile.health }
})

module.exports = Service
