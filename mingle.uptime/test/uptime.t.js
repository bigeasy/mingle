require('proof')(3, (okay) => {
    const Uptime = require('../uptime')

    let  now = 0
    const uptime = new Uptime({
        Date: { now: function () { return now } }
    })

    okay(uptime.calculate([{ id: '1', health: true }]), 0, 'no uptime')
    now++
    okay(uptime.calculate([{ id: '1', health: true }]), 1, 'uptime')

    okay(new Uptime()._Date === Date, 'defaults')
})
