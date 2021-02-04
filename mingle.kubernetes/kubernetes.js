const Resolver = require('./resolver')
const defaults = require('./defaults')
const rescue = require('rescue')
const fs = require('fs').promises

const { Interrupt } = require('interrupt')

class Mingle {
    static Kubernetes = class {
        static Error = Interrupt.create('Mingle.Kubernetes.Error', {
            'FILE_NOT_FOUND': '%(fileType)s file not found'
        })
    }
}

async function load (file, type) {
    return await Mingle.Kubernetes.Error.resolve(fs.readFile(file, 'utf8'), 'FILE_NOT_FOUND', { file, type })
}

exports.create = async function (destructible, properties) {
    const options = defaults(properties, process.env)
    options.token = (await load(options.token, 'token')).replace(/\n$/, '')
    options.ca = (await load(options.ca, 'ca'))
    return new Resolver(options)
}
