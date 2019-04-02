require('proof')(3, prove)

function prove (okay, callback) {
    var Destructible = require('destructible')
    var destructible = new Destructible('test/http.t')
    var path = require('path')

    destructible.completed.wait(callback)

    var cadence = require('cadence')

    var UserAgent = require('vizsla')
    var Mock = require('olio/mock')

    cadence(function (async) {
        async(function () {
            destructible.durable('mock', Mock, {
                socket: path.join(__dirname, 'socket'),
                constituents: {
                    http: {
                        path: path.resolve(__dirname, '../olio.js'),
                        properties: { port: 8888, iface: '127.0.0.1' }
                    },
                    mingle: {
                        path: path.resolve(__dirname, './mingle.js'),
                        properties: {}
                    }
                }
            }, async())
        }, function () {
            var ua = new UserAgent
            async(function () {
                ua.fetch({
                    url: 'http://127.0.0.1:8888/',
                    parse: 'text',
                    raise: true
                }, async())
            }, function (body) {
                okay(body, 'Mingle API\n', 'index')
                ua.fetch({
                    url: 'http://127.0.0.1:8888/health',
                    parse: 'json',
                    raise: true
                }, async())
            }, function (body) {
                okay(body, {
                    http: { occupied: 1, waiting: 0, rejecting: 0, turnstiles: 24 }
                }, 'health')
                ua.fetch({
                    url: 'http://127.0.0.1:8888/discover',
                    parse: 'json',
                    raise: true
                }, async())
            }, function (body) {
                okay(body, [ '127.0.0.1:8080' ], 'discover')
            })
        })
    })(destructible.durable('test'))
}
