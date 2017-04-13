require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var bin = require('../kubernetes.bin')
    var path = require('path')
    var program
    async(function () {
        program = bin([
            '--bind', '127.0.0.1:8888',
            '--token', path.join(__dirname, 'fixtures/token'),
            '--ca', path.join(__dirname, 'fixtures/certs/ca-cert.pem'),
            '--namespace', 'namespace',
            '--pod', 'service',
            '--container', 'conduit',
            '--kubernetes', '127.0.0.1:8080'
        ], async())
    }, function () {
        assert(true, 'started')
        program.emit('SIGINT')
    })
}
