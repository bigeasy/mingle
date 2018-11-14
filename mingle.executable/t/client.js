var cadence = require('cadence')
var http = require('http')
var delta = require('delta')
var Conduit = require('conduit/conduit')

module.exports = cadence(function (async, destructible, binder) {
    var logger = require('prolific.logger').createLogger('olio.http')
    var Reactor = require('reactor')
    var Caller = require('conduit/caller')
    async(function () {
        binder.listen(null, async())
    }, function (olio) {
        olio.sender('olio', cadence(function (async, destructible, inbox, outbox) {
            destructible.monitor('conduit', Conduit, inbox, outbox, null, async())
        }), async())
    })
})
