var cadence = require('cadence')
var Conduit = require('conduit/conduit')

module.exports = cadence(function (async, destructible, olio) {
    olio.sender('olio', cadence(function (async, destructible, inbox, outbox) {
        destructible.monitor('conduit', Conduit, inbox, outbox, null, async())
    }), async())
})
