var Procedure = require('conduit/procedure')
var cadence = require('cadence')
var Olio = require('olio')

module.exports = cadence(function (async, destructible, ee, resolver) {
    console.log(arguments)
    async(function () {
        destructible.monitor('olio', Olio, ee, function (constructor) {
            constructor.receiver = function (destructible, argv, callback) {
                destructible.monitor('procedure', Procedure, function (envelope, callback) {
                    console.log('called?', resolver.resolve)
                    console.log(resolver)
                    resolver.resolve(callback)
                }, callback)
            }
        }, async())
    }, function () {
        console.log('returnering')
        return []
    })
})
