require('proof')(5, require('cadence')(prove))

function prove (async, assert) {
    var Balanced = require('../../balanced')

    function raise (code) {
        throw new Error(code)
    }

    var balanced = new Balanced
    async(function () {
        balanced.index({}, async())
    }, [function (result) {
        assert(result, 'Mingle Balanced API', 'index')
        balanced.health({ raise: raise }, async())
    }, function (error) {
        assert(error.message, 503, 'health not ready')
    }], [function (result) {
        balanced.list({ raise: raise }, async())
    }, function (error) {
        assert(error.message, 503, 'list not ready')
    }], function () {
        balanced.register({ body: { value: 'x' } }, async())
    }, function () {
        balanced.register({ body: { value: 'x' } }, async())
    }, function () {
        balanced.register({ body: { value: 'y' } }, async())
    }, function () {
        balanced.list({ raise: raise }, async())
    }, function (result) {
        assert(result, [ 'x', 'y' ], 'listing')
        balanced.unregister({ body: { value: 'y' } }, async())
    }, function () {
        balanced.unregister({ body: { value: 'y' } }, async())
    }, function () {
        balanced.list({ raise: raise }, async())
    }, function (result) {
        assert(result, [ 'x' ], 'unregister')
    })
}
