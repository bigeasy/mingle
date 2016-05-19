require('proof')(6, prove)

function prove (assert) {
    var uptime = require('../steadfast')
    assert(!uptime([], [null, {}]), 'unhealthy machines')
    assert(!uptime([], [{ health: { instanceId: '1' } }]), 'machine added')
    assert(uptime([{ health: { instanceId: '1' } }], [{ health: { instanceId: '1' }}]), 'copacetic')
    assert(!uptime([{ health: { instanceId: '1' } }], [{ health: { instanceId: '2' }}]), 'difference')
    assert(!uptime([{ health: { instanceId: '1' } }],
        [{ health: { instanceId: '1' } }, { health: { instanceId: '2' }}]), 'longer')
    assert(!uptime([{ health: { instanceId: '1' } }], [{ health: {}}]), 'unhealthy')
}
