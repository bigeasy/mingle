var Procedure = require('conduit/procedure')
var cadence = require('cadence')
var Olio = require('olio')

module.exports = cadence(function (async, destructible, resolver) {
    async(function () {
        destructible.monitor('olio', Olio, cadence(function (async, destructible) {
            destructible.monitor('procedure', Procedure, function (envelope, callback) {
                resolver.resolve(callback)
            }, async())
        }), async())
    }, function () {
        return []
    })
})
