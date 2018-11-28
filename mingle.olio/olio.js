var cadence = require('cadence')
var Conduit = require('conduit/conduit')
var coalesce = require('extant')

function Listener (resolver) {
    this.resolver = resolver
}

Listener.prototype.connect = cadence(function (async, destructible, inbox, outbox) {
    destructible.durable('conduit', Conduit, inbox, outbox, this, cadence(function (async, request, inbox, outbox) {
        this.resolver.resolve(async())
    }), async())
})

module.exports = cadence(function (async, destructible, olio, properties) {
    var Resolver = require(properties.module)
    async(function () {
        destructible.durable('resolver', Resolver, properties, async())
    }, function (resolver) {
        return new Listener(resolver)
    })
})
