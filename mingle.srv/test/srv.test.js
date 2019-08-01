describe('srv', () => {
    const assert = require('assert')
    it('can resolve', async () => {
        const resolver = await require('../srv').create(null, {
            name: '_mingle._tcp.mingle.prettyrobots.com',
            format: 'http://%s:%d/'
        })
        const resolved = await resolver.resolve()
        assert.deepStrictEqual(resolved, [ 'http://52.70.58.47:1337/' ], 'resolved')
    })
})
