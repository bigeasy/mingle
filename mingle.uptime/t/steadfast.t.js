require('proof')(3, prove)

function prove (assert) {
    var uptime = require('../steadfast')
    assert(!uptime([], [null, {}]), 'unhealthy machines')
    assert(!uptime([], [{ instanceId: '1' }]), 'machine added')
    assert(uptime([{ instanceId: '1' }], [{ instanceId: '1' }]), 'copacetic')
}
