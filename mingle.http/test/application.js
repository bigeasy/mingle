exports.configure = function (configuration) {
    return {
        socket: configuration.socket,
        constituents: {
            mingle: {
                path: './test/mingle.js',
                workers: 1,
                properties: {}
            },
            serve: {
                path: './olio.js',
                workers: 1,
                properties: {
                    sibling: 'mingle',
                    bind: { port: 8081, iface: '127.0.0.1' }
                }
            }
        }
    }
}
