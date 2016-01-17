require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var path = require('path')
    var bin = require('../../balanced.bin')
    var UserAgent = require('vizsla')
    var io
    async(function () {
        io = bin({}, [ '--bind', '127.0.0.1:8088' ], {}, async())
    }, function () {
        setTimeout(async(), 250)
    }, function () {
        var ua = new UserAgent
        ua.fetch({
            url: 'http://127.0.0.1:8088'
        }, async())
    }, function (body) {
        assert(body.toString(), 'Mingle Balanced API', 'running')
        io.events.emit('SIGINT')
    })
}
