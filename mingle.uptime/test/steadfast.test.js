describe('steadfast', () => {
    const assert = require('assert')

    it('can steadfast', () => {
        var steadfast = require('../steadfast')
        assert(!steadfast([{ id: 'x' }], []), 'empty')
        assert(!steadfast([{ id: 'x' }], [{ id: 'x' }, { id: 'y' }]), 'wrong length')
        assert(!steadfast([{ id: 'x' }, { id: 'z' }], [{ id: 'x' }, { id: 'y' }]), 'wrong values')
        assert(steadfast([{ id: 'x' }, { id: 'y' }], [{ id: 'x' }, { id: 'y' }]), 'steadfast')
    })
})
