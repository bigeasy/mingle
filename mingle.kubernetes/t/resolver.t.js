require('proof')(3, require('cadence')(prove))

function prove (async, assert) {
    var Dispatcher = require('inlet/dispatcher')
    var cadence = require('cadence')
    var path = require('path')

    var fs = require('fs')
    var path = require('path')

    function Service () {
        var dispatcher = new Dispatcher({ object: this })
        dispatcher.dispatch('GET /api/v1/namespaces/namespace/pods', 'pods')
        this.dispatcher = dispatcher
    }

    Service.prototype.pods = cadence(function (async) {
        async(function () {
            fs.readFile(path.join(__dirname, 'fixtures', 'pods.json'), 'utf8', async())
        }, function (json) {
            return JSON.parse(json)
        })
    })

    var service = new Service

    var UserAgent = require('vizsla')

    var parameters = {
        ua: new UserAgent(service.dispatcher.createWrappedDispatcher()),
        token: path.join(__dirname, 'fixtures/token'),
        ca: path.join(__dirname, 'fixtures/certs/ca-cert.pem'),
        bind: 8080,
        kubernetes: '127.0.0.1:8080',
        namespace: 'namespace',
        pod: 'service',
        container: 'conduit',
        port: 'conduit'
    }

    var argv = require('../constructor.argv')
    var exec = require('child_process').exec
    async(function () {
        exec('make -C t/fixtures/certs', async())
    }, function () {
        setTimeout(async(), 250)
    }, [function () {
        argv([parameters, { token: path.join(__dirname, 'x') }], async())
    }, function (error) {
        assert(error.key, 'token file not found', 'cannot find token')
    }], [function () {
        argv([parameters, { ca: path.join(__dirname, 'x') }], async())
    }, function (error) {
        assert(error.key, 'ca file not found', 'cannot find ca file')
    }], function () {
        argv(parameters, async())
    }, function (resolver) {
        async(function () {
            resolver.resolve(async())
        }, function (json) {
            assert(json, [ '10.2.73.7:8486' ], 'select')
        })
    })
}
