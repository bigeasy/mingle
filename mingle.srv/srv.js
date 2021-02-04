const { coalesce } = require('extant')
const dns = require('dns')
const resolve = require('./resolve')

class Resolver {
    constructor (properties) {
        this._name = properties.name
        this._format = coalesce(properties.format, '%s:%d')
    }

    resolve () {
        return resolve(dns, this._name, this._format)
    }
}

exports.create = function (destructible, properties) {
    return new Resolver(properties)
}
