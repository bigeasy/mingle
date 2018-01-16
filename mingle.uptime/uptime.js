var cadence = require('cadence')
var util = require('util')
var steadfast = require('./steadfast')

function Uptime (options) {
    options = (options || {})
    this._Date = options.Date || Date
    this.since = 0
    this._previous = []
    this._lastChecked = null
}

Uptime.prototype.calculate = function (machines) {
    var now = this._Date.now()
    if (steadfast(this._previous, machines)) {
       this.since += (now - this._lastChecked)
    } else {
        this.since = 0
    }
    this._lastChecked = now
    this._previous = machines
    return this.since
}

module.exports = Uptime
