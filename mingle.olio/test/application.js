exports.configure = function (configuration) {
    return {
        socket: configuration.socket,
        constituents: {
            mingle: {
                path: './olio.js',
                workers: 1,
                properties: { module: 'mingle.test' }
            },
            serve: {
                path: './test/serve.js',
                workers: 1,
                properties: {}
            }
        }
    }
}
