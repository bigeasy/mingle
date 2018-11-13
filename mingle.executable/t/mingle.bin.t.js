require('proof')(3, prove)

function prove (okay, callback) {
    var bin = require('..'), io
    var Mock = require('olio/mock')
    var Caller = require('conduit/caller')
    var Destructible = require('destructible')
    var destructible = new Destructible('t/mock')

    destructible.completed.wait(callback)

    var cadence = require('cadence')

    cadence(function (async) {
        async(function () {
            var UserAgent = require('vizsla')
            var ua = new UserAgent
            async(function () {
                io = bin([ '--bind', '127.0.0.1:8081', 'test' ], {}, async())
                async(function () {
                    io.ready.wait(async())
                }, function () {
                    ua.fetch({ url: 'http://127.0.0.1:8081/', parse: 'text' }, async())
                }, function (body) {
                    okay(body, 'Mingle Example API\n', 'index')
                    ua.fetch({ url: 'http://127.0.0.1:8081/discover', parse: 'json', raise: true }, async())
                }, function (body, response) {
                    okay(body, [], 'discover')
                    ua.fetch({ url: 'http://127.0.0.1:8081/health', parse: 'json' }, async())
                }, function (body) {
                    okay(body, {
                        http: { occupied: 1, waiting: 0, rejecting: 0, turnstiles: 24 }
                    }, 'discover')
                    io.emit('SIGTERM')
                })
            })
        })
    })(destructible.monitor('test'))
}
