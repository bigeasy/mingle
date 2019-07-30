exports.configure = function (configuration) {
    return {
        socket: configuration.socket,
        constituents: {
            run: {
                path: './olio.js',
                workers: 1,
                properties: { module: 'mingle.test' }
            }
        }
    }
}
