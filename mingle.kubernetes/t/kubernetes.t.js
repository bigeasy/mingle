require('proof')(4, prove)

function prove (okay, callback) {
    var Destructible = require('destructible')
    var destructible = new Destructible('t/kubernetes.t')

    destructible.completed.wait(callback)

    var Reactor = require('reactor')
    var cadence = require('cadence')
    var path = require('path')

    var fs = require('fs')
    var path = require('path')

    function Service () {
        this.reactor = new Reactor(this, function (dispatcher) {
            dispatcher.dispatch('GET /api/v1/namespaces/namespace/pods', 'pods')
        })
        this.count = 0
    }

    Service.prototype.pods = cadence(function (async) {
        if (this.count++ == 0) {
            return 503
        }
        async(function () {
            fs.readFile(path.join(__dirname, 'fixtures', 'pods.json'), 'utf8', async())
        }, function (json) {
            return JSON.parse(json)
        })
    })

    var service = new Service

    var UserAgent = require('vizsla')
    var Interlocutor = require('interlocutor')

    var properties = {
        token: null,
        ca: null,
        format: '%s:%d',
        kubernetes: '127.0.0.1:8080',
        namespace: 'namespace',
        pod: 'service',
        container: 'conduit',
        port: 'conduit'
    }

    var Resolver = require('..')

    cadence(function (async) {
        async(function () {
            setTimeout(async(), 250)
        }, [function () {
            properties.token = path.join(__dirname, 'x')
            var destructible = new Destructible('token')
            destructible.monitor('resolver', Resolver, properties, async())
        }, function (error) {
            okay(error.label, 'token file not found',  'cannot find token')
        }], [function () {
            properties.token = path.join(__dirname, 'fixtures/token'),
            properties.ca = path.join(__dirname, 'x')
            var destructible = new Destructible('ca')
            destructible.monitor('resolver', Resolver, properties, async())
        }, function (error) {
            okay(error.label, 'ca file not found', 'cannot find ca file')
        }], function () {
            properties.ca = path.join(__dirname, 'fixtures/certs/ca-cert.pem')
            properties.ua = new UserAgent().bind({ http: new Interlocutor(service.reactor.middleware) })
            destructible.monitor('resolver', Resolver, properties, async())
        }, function (resolver) {
            async(function () {
                resolver.resolve(async())
            }, function (json) {
                okay(json, [], 'select error')
                resolver.resolve(async())
            }, function (json) {
                okay(json, [ '10.2.73.7:8486' ], 'select')
            })
        })
    })(destructible.monitor('test'))
}
