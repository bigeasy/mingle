require('proof/redux')(3, require('cadence')(prove))

function prove (async, assert) {
    var Service = require('../http')
    var service = new Service({
        resolve: function (callback) {
            callback(null, [ '127.0.0.1:8080' ])
        }
    })
    async(function () {
        service.index(async())
    }, function (index) {
        assert(index, 'Mingle Kubernetes Discovery API\n', 'index')
        service.discover(async())
    }, function (discovered) {
        assert(discovered, [ '127.0.0.1:8080' ], 'discovery')
        service.health(async())
    }, function (health) {
        assert(health, {
            http: { occupied: 0, waiting: 0, rejecting: 0, turnstiles: 24 }
        }, 'health')
    })
}
