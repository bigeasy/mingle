var cadence = require('cadence')
var http = require('http')
var delta = require('delta')
var Conduit = require('conduit/conduit')

module.exports = cadence(function (async, destructible, olio) {
    var logger = require('prolific.logger').createLogger('olio.http')
    var Reactor = require('reactor')
    var Caller = require('conduit/caller')
    var interval = setInterval(function () {}, 1000)
    destructible.destruct.wait(clearInterval.bind(null, interval))
    console.log('will wait')
    olio.sender('olio', cadence(function (async, destructible, inbox, outbox) {
        destructible.monitor('conduit', Conduit, inbox, outbox, null, async())
    }), async())
})
