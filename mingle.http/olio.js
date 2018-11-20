var cadence = require('cadence')
var coalesce = require('extant')
var Reactor = require('reactor')
var http = require('http')
var destroyer = require('server-destroy')
var Conduit = require('conduit/conduit')
var delta = require('delta')

function Middleware (conduit) {
    this._conduit = conduit
    this.reactor = new Reactor(this, function (dispatcher) {
        dispatcher.dispatch('GET /', 'index')
        dispatcher.dispatch('GET /discover', 'discover')
        dispatcher.dispatch('GET /health', 'health')
    })
}

Middleware.prototype.index = cadence(function () {
    return [ 200, { 'content-type': 'text/plain' }, 'Mingle API\n' ]
})

Middleware.prototype.discover = cadence(function (async) {
    this._conduit.connect({}).inbox.dequeue(async())
})

Middleware.prototype.health = cadence(function () {
    return { http: this.reactor.turnstile.health }
})

module.exports = cadence(function (async, destructible, olio, properties) {
    async(function () {
        olio.sender(coalesce(properties.sibling, 'mingle'), cadence(function (async, destructible, inbox, outbox) {
            destructible.monitor('conduit', Conduit, inbox, outbox, null, async())
        }), async())
    }, function (sender) {
        var middleware = new Middleware(sender.processes[0].conduit)
        var server = http.createServer(middleware.reactor.middleware)
        destroyer(server)
        destructible.destruct.wait(server, 'destroy')
        async(function () {
            delta(async()).ee(server).on('listening')
            server.listen(properties.port, properties.iface)
        }, function () {
            delta(destructible.monitor('http')).ee(server).on('close')
            return []
        })
    })
})
