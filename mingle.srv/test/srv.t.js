require('proof')(1, async (okay) => {
    const resolver = await require('../srv').create(null, {
        name: '_mingle._tcp.mingle.prettyrobots.com',
        format: 'http://%s:%d/'
    })
    const resolved = await resolver.resolve()
    okay(resolved, [ 'http://52.70.58.47:1337/' ], 'resolved')
})
