require('proof')(5, require('cadence')(prove))

function prove (async, assert) {
    var Uptime = require('../uptime')

    var cadence = require('cadence')

    var Vizsla = require('vizsla')

    var Dispatcher = require('inlet/dispatcher')

    var Service = function Service () {
        var dispatcher = new Dispatcher(this)
        dispatcher.dispatch('GET /discover', 'discover')
        dispatcher.dispatch('GET /health', 'health')
        this.dispatcher = dispatcher
    }

    Service.prototype.discover = cadence(function (async) {
        return [ [ '127.0.0.1:8888' ] ]
    })

    Service.prototype.health = cadence(function (async) {
        return { instanceId: 'copacetic' }
    })

    var service = new Service

    var ua = new Vizsla(service.dispatcher.createWrappedDispatcher())

    var uptime

    async(function () {
        uptime = new Uptime('http://127.0.0.1/discoverish', 'http://%s/health', ua)
        uptime.get(async())
    }, function (response) {
        assert(response, {
            uptime: 0,
            machines: []
        }, 'failed discovery')
        uptime = new Uptime('http://127.0.0.1/discover', 'http://%s/healthish', ua)
        uptime.get(async())
    }, function (response) {
        assert(response, {
            uptime: 0,
            machines: [{
                location: '127.0.0.1:8888',
                health: {}
            }]
        }, 'failed health')
        uptime = new Uptime('http://127.0.0.1/discover', 'http://%s/health', ua)
        uptime.get(async())
    }, function (response) {
        assert(response, {
            uptime: 0,
            machines: [{
                location: '127.0.0.1:8888',
                health: { instanceId: 'copacetic' }
            }]
        }, 'get')
        uptime.get(async())
    }, function (response) {
        assert(response.uptime != 0, 'uptime')
        assert(response, {
            uptime: response.uptime,
            machines: [{
                location: '127.0.0.1:8888',
                health: { instanceId: 'copacetic' }
            }]
        }, 'steadfast')
    })
}
