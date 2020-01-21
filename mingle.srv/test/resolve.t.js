require('proof')(1, async (okay) => {
    const resolve = require('../resolve')
    const addresses = await resolve({
        resolve: function (name, record, callback) {
            callback(new Error('message'))
        }
    }, '')
    okay(addresses, [], 'error')
})
