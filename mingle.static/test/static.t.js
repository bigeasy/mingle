require('proof')(1, (okay) => {
    const resolver = require('../static').create(null, {
        format: 'http://%s:%d/',
        addresses: [ '127.0.0.1:8080' ]
    })
    const resolved = resolver.resolve()
    okay(resolved, [ 'http://127.0.0.1:8080/' ], 'resolve')
})
