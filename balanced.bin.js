/*

    ___ usage ___ en_US ___
    node emissary.bin.js <options> [sockets directory, sockets directory...]

    options:

        --help                          display help message
        -b, --bind          <integer>   port to bind to

    ___ $ ___ en_US ___

        bind is required:
            the `--bind` is a required argument

        bind not address:
            the `--bind` must be an address

    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    var url = require('url')
    var http = require('http')
    var Balanced = require('./balanced')

    if (!program.param.limit) program.param.limit = 0
    if (!program.param.connecting) program.param.connecting = 1

    program.helpIf(program.param.help)
    program.required('bind')

    var bind = program.param.bind.split(':')

    var balanced = new Balanced
    var server = http.createServer(balanced.dispatcher.createWrappedDispatcher())
    server.listen(bind[1], +bind[0], async())
    program.on('SIGINT', function () { server.close() })
}))
