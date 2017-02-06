require('proof/redux')(3, require('cadence')(prove))

function prove (async, assert) {
    var Static = require('../http')

    var mingle = new Static([ '127.0.0.1:8081' ])

    async(function () {
        mingle.index(async())
    }, function (response) {
        assert(response, 'Mingle Static Discovery API\n', 'index')
        mingle.discover(async())
    }, function (response) {
        assert(response, [ '127.0.0.1:8081' ], 'discover')
        mingle.health(async())
    }, function (response) {
        assert(response, {
            http: { occupied: 0, waiting: 0, rejecting: 0, turnstiles: 256 }
        }, 'health')
    })
}
