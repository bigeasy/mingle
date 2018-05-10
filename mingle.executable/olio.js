var Procedure = require('conduit/procedure')
var cadence = require('cadence')
var Olio = require('olio')

module.exports = cadence(function (async, destructible, ee, resolver) {
    async(function () {
        destructible.monitor('olio', Olio, ee, function (constructor) {
            constructor.receiver = function (destructible, callback) {
                destructible.monitor('procedure', Procedure, function (envelope, callback) {
                    resolver.resolve(callback)
                }, callback)
            }
        }, async())
    }, function () {
        console.log('returnering')
        return []
    })
})
