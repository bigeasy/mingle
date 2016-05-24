var cadence = require('cadence')
var util = require('util')
var steadfast = require('./steadfast')

function Uptime (discoveryUrl, healthUrl, ua) {
    this._discoveryUrl = discoveryUrl
    this._healthUrl = healthUrl
    this._Date = Date
    this._ua = ua
    this._duration = 0
    this._previous = []
    this._lastChecked = null
}

Uptime.prototype.get = cadence(function (async) {
    var now = this._Date.now()
    async(function () {
        this._ua.fetch({ url: this._discoveryUrl, nullify: true }, async())
    }, function (response) {
        if (response == null) {
            return [[]]
        }
        async.map(function (location) {
            var url = util.format(this._healthUrl, location)
            async(function () {
                this._ua.fetch({ url: url, nullify: true }, async())
            }, function (health) {
                return { location: location, health: health || {} }
            })
        })(response)
    }, function (machines) {
        if (steadfast(this._previous, machines)) {
            this._duration += (now - this._lastChecked)
        } else {
            this._duration = 0
        }
        this._lastChecked = now
        this._previous = machines
        return {
            uptime: this._duration,
            machines: machines
        }
    })
})

module.exports = Uptime
