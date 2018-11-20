require('proof')(1, prove)

function prove (okay, callback) {
    var Destructbile = require('destructible')
    var destructible = new Destructbile('t/static.t')

    destructible.completed.wait(callback)

    var Resolver = require('../static.argv')

    var cadence = require('cadence')

    cadence(function (async) {
        async(function () {
            destructible.monitor('resolver', Resolver, {
                format: 'http://%s:%d/',
                addresses: [ '127.0.0.1:8080' ]
            }, async())
        }, function (resolver) {
            resolver.resolve(async())
        }, function (addresses) {
            okay(addresses, [ 'http://127.0.0.1:8080/' ], 'resolve')
        })
    })(destructible.monitor('test'))
}
