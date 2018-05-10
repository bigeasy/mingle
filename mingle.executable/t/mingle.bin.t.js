require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var bin = require('..'), io
    async(function () {
        async(function () {
            io = bin([ '--bind', 'olio', 'test' ], {}, async())
        }, function (code) {
            console.log('here')
            assert(code, 0, 'code')
        })
    })
}
