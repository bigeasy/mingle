var cadence = require('cadence')
var assert = require('assert')

function Balanced () {
    this._listings = []
}

Balanced.prototype.index = cadence(function (async) {
    return 'Mingle Balanced API'
})

Balanced.prototype.health = cadence(function (async, request) {
    if (this._listings.length == 0) {
        request.raise(503, 'Unavailable')
    }
    return { count: this._listings.length }
})

Balanced.prototype.register = cadence(function (async, request) {
    var index = this._listings.indexOf(request.body.value)
    if (index == -1) {
        this._listings.push(request.body.value)
    }
    return {}
})

Balanced.prototype.unregister = cadence(function (async, request) {
    var index = this._listings.indexOf(request.body.value)
    if (index != -1) {
        this._listings.splice(index, 1)
    }
    return {}
})

Balanced.prototype.list = cadence(function (async, request) {
    if (Object.keys(this._listings).length == 0) {
        request.raise(503, 'Unavailable')
    }
    return [ this._listings ]
})

module.exports = Balanced
