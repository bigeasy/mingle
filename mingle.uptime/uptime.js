const util = require('util')
const steadfast = require('./steadfast')

class Uptime {
    constructor (options) {
        options = (options || {})
        this._Date = options.Date || Date
        this.since = 0
        this._previous = []
        this._lastChecked = null
    }

    calculate (machines) {
        const now = this._Date.now()
        if (steadfast(this._previous, machines)) {
           this.since += (now - this._lastChecked)
        } else {
            this.since = 0
        }
        this._lastChecked = now
        this._previous = machines
        return this.since
    }
}

module.exports = Uptime
