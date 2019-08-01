const coalesce = require('extant')
const sprintf = require('sprintf-js').sprintf

class Resolver {
    constructor (properties) {
        const format = coalesce(properties.format, '%s:%d')
        this._addresses = properties.addresses.map((address) => {
            const pair = address.split(':')
            return sprintf(format, pair[0], +pair[1])
        })
    }

    resolve () {
        return this._addresses
    }
}

exports.create = function (destructible, properties) {
    return new Resolver(properties)
}
