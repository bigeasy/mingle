var cadence = require('cadence')
var Reactor = require('reactor')
var sprintf = require('sprintf-js').sprintf

function Static (addresses, format) {
    this._addresses = addresses.map(function (address) {
        var pair = address.split(':')
        return sprintf(format, pair[0], +pair[1])
    })
    this.reactor = new Reactor(this, function (dispatcher) {
        dispatcher.dispatch('GET /', 'index')
        dispatcher.dispatch('GET /discover', 'discover')
        dispatcher.dispatch('GET /health', 'health')
    })
}

Static.prototype.index = cadence(function () {
    return 'Mingle Static Discovery API\n'
})

Static.prototype.discover = cadence(function () {
    return [ this._addresses ]
})

Static.prototype.health = cadence(function () {
    return { http: this.reactor.turnstile.health }
})

module.exports = Static
