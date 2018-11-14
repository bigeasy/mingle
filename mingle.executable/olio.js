var cadence = require('cadence')
var Conduit = require('conduit/conduit')

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
    async(function () {
        constructor(properties, async())
    }, function (resolver) {
        return new Listener(resolver)
    })
})
