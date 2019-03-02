require('proof')(1, prove)

function prove (okay, callback) {
    var Destructible = require('destructible')
    var destructible = new Destructible('t/srv.t')

    destructible.completed.wait(callback)

    var cadence = require('cadence')

    var Resolver = require('..')

    cadence(function (async) {
        async(function () {
            destructible.durable('resolver', Resolver, {
                name: '_mingle._tcp.mingle.prettyrobots.com',
                format: 'http://%s:%d/'
            }, async())
        }, function (resolver) {
            resolver.resolve(async())
        }, function (resolved) {
            okay(resolved, [ 'http://52.70.58.47:1337/' ], 'resolved')
        })
    })(destructible.durable('test'))
}
