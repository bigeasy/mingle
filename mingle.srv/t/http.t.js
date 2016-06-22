require('proof')(3, require('cadence')(prove))

function prove (async, assert) {
    var Resolver = require('../http')

    var resolver = new Resolver('_mingle._tcp.mingle.prettyrobots.com')

    async(function () {
        resolver.index(async())
    }, function (response) {
        assert(response, 'Mingle SRV Discovery API', 'index')
        resolver.discover(async())
    }, function (response) {
        assert(response, [ '52.70.58.47:1337' ], 'discover')
        resolver.health(async())
    }, function (response) {
        assert(response, {
            http: { occupied: 0, waiting: 0, rejecting: 0, turnstiles: 256 }
        }, 'health')
    })
}