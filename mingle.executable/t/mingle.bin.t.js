require('proof')(4, require('cadence')(prove))

function prove (async, okay) {
    var bin = require('..'), io
    var Mock = require('olio/mock')
    var Caller = require('conduit/caller')
    var Destructible = require('destructible')
    var destructible = new Destructible('t/mock')
    async([function  () {
        destructible.completed.wait(async())
    }, function (error) {
        console.log(error.stack)
        throw error
    }])
    async([function () {
        destructible.destroy()
    }], function () {
        async(function () {
            io = bin([ '--bind', 'olio', 'test' ], {}, async())
            var mock = new Mock(io)
            async(function () {
                mock.ready.wait(async())
            }, function () {
                mock.initialize('self', 0)
            }, function () {
                destructible.monitor('caller', Caller, async())
            }, function (caller) {
                destructible.destruct.wait(function () { caller.inbox.push(null) })
                mock.sender('caller', 0, caller)
                return [ caller ]
            }, function (caller) {
                async(function () {
                    io.ready.wait(async())
                }, [function () {
                    caller.invoke({}, async())
                }, function (error) {
                    console.log(error.stack)
                    throw error
                }], function (response) {
                    okay(response, [], 'invoke olio')
                    io.emit('SIGTERM')
                })
            })
        })
    }, function () {
        var Vizsla = require('vizsla')
        var ua = new Vizsla
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
}
