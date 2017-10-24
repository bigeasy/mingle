require('proof')(3, require('cadence')(prove))

function prove (async, assert) {
    var Resolver = require('../middleware')

    var resolver = new Resolver('_mingle._tcp.mingle.prettyrobots.com', 'http://%s:%d')

    async(function () {
        resolver.index(async())
    }, function (response) {
        assert(response, 'Mingle SRV Discovery API', 'index')
        resolver.discover(async())
    }, function (response) {
        assert(response, [ 'http://52.70.58.47:1337' ], 'discover')
        resolver.health(async())
    }, function (response) {
        assert(response, {
            http: { occupied: 0, waiting: 0, rejecting: 0, turnstiles: 24 }
        }, 'health')
    })
}
