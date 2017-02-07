require('proof/redux')(3, require('cadence')(prove))

function prove (async, assert) {
    var Uptime = require('../uptime')

    var now = 0
    var uptime = new Uptime({
        Date: { now: function () { return now } }
    })

    assert(uptime.calculate([{ id: '1', health: true }]), 0, 'no uptime')
    now++
    assert(uptime.calculate([{ id: '1', health: true }]), 1, 'uptime')

    uptime = new Uptime
    assert(uptime._Date === Date, 'defaults')
}
