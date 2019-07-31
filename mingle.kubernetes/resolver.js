const axios = require('axios')
const assert = require('assert')
const sprintf = require('sprintf-js').sprintf
const https = require('https')

class Resolver {
    constructor (options) {
        this.bind = options.bind
        this._ua = options.ua
        this._namespace = options.namespace
        this._pod = options.pod
        this._container = options.container
        this._port = options.port
        this._format = options.format
        this._axios = axios.create({
            headers: {
                authorization: `Bearer ${Buffer.from(options.token).toString('base64')}`
            },
            httpsAgent: new https.Agent({ ca: options.ca })
        })
        this._url = `https://${options.kubernetes}/api/v1/namespaces/${this._namespace}/pods`
    }

    async resolve () {
        try {
            return this._select((await this._axios.get(this._url)).data)
        } catch (error) {
            console.log(error.stack)
            // TODO Log the error.
            return []
        }
    }

    _select (json) {
        const sought = { pod: this._pod, container: this._container, port: this._port }
        const pod = this._pod, container = this._container
        const items = json.items.filter(function (item) {
            return item.metadata.labels.name == pod &&
                item.metadata.deletionTimestamp == null &&
                item.status.podIP &&
                item.status.containerStatuses &&
                item.status.containerStatuses.filter(function (container) {
                    return container.name == sought.container && container.ready
                })
        })
        const format = this._format
        return items.map(function (item) {
            const container = item.spec.containers.filter(function (container) {
                return container.name == sought.container
            }).shift()
            const port = container.ports.filter(function (port) {
                return port.name == sought.port
            }).shift()
            assert(port, 'cannot find port')
            return sprintf(format, item.status.podIP, +port.containerPort)
        })
    }
}

module.exports = Resolver
