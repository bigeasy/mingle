const logger = require('prolific.logger').create('mingle.srv')
const sprintf = require('sprintf-js').sprintf
const callback = require('comeuppance')

async function resolve (dns, name, type) {
    try {
        const [ record ] = await callback(callback => dns.resolve(name, type, callback))
        return record
    } catch (error) {
        console.log(error.stack)
        logger.error('dns', { type, stack: error.stack })
        throw error
    }
}

module.exports = async function (dns, name, format) {
    try {
        const resolved = []
        const records = await resolve(dns, name, 'SRV')
        for (const record of records) {
              const address = await resolve(dns, record.name, 'A')
              resolved.push(sprintf(format, address, +record.port))
        }
        return resolved
    } catch (error) {
        return []
    }
}
