const Interrupt = require('interrupt').create('mingle.kubernetes')
const Resolver = require('./resolver')
const defaults = require('./defaults')
const rescue = require('rescue')
const fs = require('fs').promises

async function load (file, message) {
    try {
        return await fs.readFile(file, 'utf8')
    } catch (error) {
        rescue(/^code:ENOENT$/, () => {
            throw new Interrupt(message, { file })
        })(error)
    }
}

exports.create = async function (destructible, properties) {
    const options = defaults(properties, process.env)
    options.token = (await load(options.token, 'token file not found')).replace(/\n$/, '')
    options.ca = (await load(options.ca, 'ca file not found'))
    return new Resolver(options)
}
