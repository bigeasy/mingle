describe('static', () => {
    const assert = require('assert')
    it('can static', () => {
        const resolver = require('../static').create(null, {
            format: 'http://%s:%d/',
            addresses: [ '127.0.0.1:8080' ]
        })
        const resolved = resolver.resolve()
        assert.deepStrictEqual(resolved, [ 'http://127.0.0.1:8080/' ], 'resolve')
    })
})
