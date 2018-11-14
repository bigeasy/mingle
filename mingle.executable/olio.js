var cadence = require('cadence')
var Conduit = require('conduit/conduit')

module.exports = cadence(function (async, destructible, binder, properties) {
    console.log('------', properties)
    var constructor = require(properties.module)
    delete properties.module
    async(function () {
        constructor(properties, async())
    }, function (resolver) {
        binder.listen(cadence(function (async, destructible, inbox, outbox) {
            destructible.monitor('conduit', Conduit, inbox, outbox, cadence(function (async, request, inbox, outbox) {
                resolver.resolve(async())
            }), async())
        }), async())
    }, function (olio) {
        return [ binder.index ]
    })
})
