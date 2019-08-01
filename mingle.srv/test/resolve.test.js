describe('resolve', () => {
    const resolve = require('../resolve')
    const assert = require('assert')
    it('can handle a DNS error', async () => {
        const addresses = await resolve({
            resolve: function (name, record, callback) {
                callback(new Error('message'))
            }
        }, '')
        assert.deepStrictEqual(addresses, [], 'error')
    })
})
return
require('proof')(2, require('cadence')(prove))

function prove (async, okay) {
    var resolve = require('../resolve')
    async(function () {
    }, function (addresses) {
        okay(addresses, [], 'SRV error')
        resolve({
            resolve: function (name, record, callback) {
                if (record == 'SRV') {
                    callback(null, [{ name: '', port: 8888 }])
                } else {
                    callback(new Error('message'))
                }
            }
        }, '', async())
    }, function (addresses) {
        okay(addresses, [ null ], 'A error')
    })
}
