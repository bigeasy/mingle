require('proof')(1, require('cadence')(prove))

function prove (async, okay) {
    var argv = require('../static.argv')
    async(function () {
        argv([ '--format', 'http://%s:%d/', '127.0.0.1:8080' ], async())
    }, function (resolver) {
        resolver.resolve(async())
    }, function (addresses) {
        okay(addresses, [ 'http://127.0.0.1:8080/' ], 'resolve')
    })
}
