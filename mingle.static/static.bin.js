/*

    ___ usage ___ en_US ___
    mingle static [address:port, address:port...]

    options:

        -b, --bind      <address:port>  address and port to bind to
        --help                          display help message

    ___ $ ___ en_US ___

        bind is required:
            the `--bind` argument is a required argument
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    var http = require('http')

    var prolific = require('prolific')
    var Shuttle = require('prolific.shuttle')

    var Static = require('./http.js')

    var logger = prolific.createLogger('bigeasy.mingle.static.bin')

    Shuttle.shuttle(program, 1000, logger)

    program.helpIf(program.command.param.help)
    program.command.required('bind')

    var bind = program.command.bind('bind')

    var mingle = new Static(program.argv)
    var dispatcher = mingle.dispatcher.createWrappedDispatcher()
    var server = http.createServer(dispatcher)
    server.listen(bind.port, bind.address, async())
    program.on('SIGINT', server.close.bind(server))
}))
