var cadence = require('cadence')
var assert = require('assert')
var sprintf = require('sprintf-js').sprintf

function Resolver (options) {
    this.bind = options.bind
    this._ua = options.ua
    this._namespace = options.namespace
    this._pod = options.pod
    this._container = options.container
    this._port = options.port
    this._format = options.format
    this._session = {
        ca: options.ca,
        token: options.token,
        url: 'https://' + options.kubernetes
    }
}

Resolver.prototype.resolve = cadence(function (async) {
    async(function () {
        this._ua.fetch(this._session, {
            url: '/api/v1/namespaces/' + this._namespace + '/pods',
            parse: 'json'
        }, async())
    }, function (body) {
        return [ this._select(body) ]
    })
})

Resolver.prototype._select = function (json) {
    var sought = { pod: this._pod, container: this._container, port: this._port }
    var pod = this._pod, container = this._container
    var items = json.items.filter(function (item) {
        return item.metadata.labels.name == pod &&
            item.metadata.deletionTimestamp == null &&
            item.status.containerStatuses &&
            item.status.containerStatuses.filter(function (container) {
                return container.name == sought.container && container.ready
            })
    })
    var format = this._format
    return items.map(function (item) {
        var container = item.spec.containers.filter(function (container) {
            return container.name == sought.container
        }).shift()
        item.status.podIp
        var port = container.ports.filter(function (port) {
            return port.name == sought.port
        }).shift()
        assert(port, 'cannot find port')
        return sprintf(format, item.status.podIP, +port.containerPort)
    })
}

module.exports = Resolver
