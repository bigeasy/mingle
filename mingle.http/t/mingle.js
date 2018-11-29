var cadence = require('cadence')
var Conduit = require('conduit/conduit')

function Mingle () {
}

Mingle.prototype.connect = cadence(function (async, destructible, inbox, outbox) {
    destructible.durable('conduit', Conduit, inbox, outbox, cadence(function (async, request, inbox, outbox) {
        return [[ '127.0.0.1:8080' ]]
    }), async())
})

module.exports = cadence(function (async, destructible) {
    return new Mingle
})
