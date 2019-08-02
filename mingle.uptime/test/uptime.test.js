describe('uptime', () => {
    const assert = require('assert')
    it('can uptime', () => {
        const Uptime = require('../uptime')

        let  now = 0
        const uptime = new Uptime({
            Date: { now: function () { return now } }
        })

        assert.equal(uptime.calculate([{ id: '1', health: true }]), 0, 'no uptime')
        now++
        assert.equal(uptime.calculate([{ id: '1', health: true }]), 1, 'uptime')

        assert(new Uptime()._Date === Date, 'defaults')
    })
})
