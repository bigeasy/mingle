require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    assert(require('..'), 'require')
}
