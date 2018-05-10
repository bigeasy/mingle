require('proof')(1, require('cadence')(prove))

function prove (async, okay) {
    var bin = require('../srv.argv')
    var program
    async(function () {
        bin([ '--name', '_mingle._tcp.mingle.prettyrobots.com' ], async())
    }, function (resolver) {
        async(function () {
            resolver.resolve(async())
        }, function (resolved) {
            okay(resolved, [ '52.70.58.47:1337' ], 'resolved')
        })
    })
}
