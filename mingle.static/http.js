var cadence = require('cadence')
var Dispatcher = require('inlet/dispatcher')

function Static (addresses) {
    this._addresses = addresses
    var dispatcher = new Dispatcher({ object: this, workers: 256 })
    dispatcher.dispatch('GET /', 'index')
    dispatcher.dispatch('GET /discover', 'discover')
    dispatcher.dispatch('GET /health', 'health')
    this.dispatcher = dispatcher
}

Static.prototype.index = cadence(function () {
    return 'Mingle Static Discovery API'
})

Static.prototype.discover = cadence(function () {
    return [ this._addresses ]
})

Static.prototype.health = cadence(function () {
    return { http: this.dispatcher.turnstile.health }
})

module.exports = Static
