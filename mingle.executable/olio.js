var cadence = require('cadence')
var Conduit = require('conduit/conduit')
var coalesce = require('extant')

function Listener (resolver) {
    this.resolver = resolver
}

Listener.prototype.connect = cadence(function (async, destructible, inbox, outbox) {
    destructible.monitor('conduit', Conduit, inbox, outbox, this, cadence(function (async, request, inbox, outbox) {
        this.resolver.resolve(async())
    }), async())
})

module.exports = cadence(function (async, destructible, binder, properties) {
    var constructor = require(properties.module)
    delete properties.module
    var argv = coalesce(properties.argv, [])
    delete properties.argv
    async(function () {
        constructor([ properties, argv ], async())
    }, function (resolver) {
        return new Listener(resolver)
    })
})
