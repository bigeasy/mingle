var cadence = require('cadence')
var logger = require('prolific.logger').createLogger('bigeasy.mingle.srv.resolve')

module.exports = cadence(function (async, dns, name) {
    async([function () {
        dns.resolve(name, 'SRV', async())
    }, function (error) {
        logger.error('resolve.SRV', { stack: error.stack })
        return [ async.break, [] ]
    }], function (records) {
        async.map(function (record) {
            async([function () {
                dns.resolve(record.name, 'A', async())
            }, function (error) {
                logger.error('resolve.A', { stack: error.stack, record: record })
                return [ async.break, null ]
            }], function (address) {
                return [ address + ':' + record.port ]
            })
        })(records)
    }, function (discovered) {
        return [ discovered ]
    })
})
