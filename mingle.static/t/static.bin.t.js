require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var bin = require('../static.bin')
    var io
    async(function () {
        io = bin({}, [ '--bind', '127.0.0.1:8888' ], {}, async())
    }, function () {
        assert(true, 'started')
        io.events.emit('SIGINT')
    })
}