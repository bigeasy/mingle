require('proof')(4, (okay) => {
    const steadfast = require('../steadfast')
    okay(!steadfast([{ id: 'x' }], []), 'empty')
    okay(!steadfast([{ id: 'x' }], [{ id: 'x' }, { id: 'y' }]), 'wrong length')
    okay(!steadfast([{ id: 'x' }, { id: 'z' }], [{ id: 'x' }, { id: 'y' }]), 'wrong values')
    okay(steadfast([{ id: 'x' }, { id: 'y' }], [{ id: 'x' }, { id: 'y' }]), 'steadfast')
})
