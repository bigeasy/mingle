var cadence = require('cadence')
var logger = require('prolific.logger').createLogger('mingle.srv')
var sprintf = require('sprintf-js').sprintf

module.exports = cadence(function (async, dns, name, format) {
    async([function () {
        dns.resolve(name, 'SRV', async())
    }, function (error) {
        logger.error('resolve.SRV', { stack: error.stack })
        return [ async.break, [] ]
    }], function (records) {
        async.map(function (record) {
            var block = async([function () {
                dns.resolve(record.name, 'A', async())
            }, function (error) {
                logger.error('resolve.A', { stack: error.stack, record: record })
                return [ block.break, null ]
            }], function (address) {
                return [ block.break, sprintf(format, address, +record.port) ]
            })()
        })(records)
    }, function (discovered) {
        return [ discovered ]
    })
})
