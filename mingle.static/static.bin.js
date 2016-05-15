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
    var Shuttle = require('prolific.shuttle')
    var Static = require('./http.js')
    var http = require('http')

    program.helpIf(program.command.param.help)
    program.command.required('bind')

    async(function () {
        Shuttle.shuttle(program, 1000, {}, function (error) {
            var message = { stack: error.stack, cause: null }
            if (error.cause) {
                message.cause = error.cause.stack
            }
            logger.error('uncaught', message)
        }, async())
    }, function () {
        var mingle = new Static(program.argv)
        var dispatcher = mingle.dispatcher.createWrappedDispatcher()
        var server = http.createServer(dispatcher)
        var bind = program.command.param.bind.split(':')
        if (bind.length == 0) {
            bind.unshift('0.0.0.0')
        }
        server.listen(+bind[1], bind[0], async())
        program.on('SIGINT', server.close.bind(server))
    })
}))
