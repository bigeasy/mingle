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

    var Shuttle = require('prolific.shuttle')

    var Static = require('./middleware.js')

    var logger = require('prolific.logger').createLogger('mingle.static')

    var shuttle = Shuttle.shuttle(program, logger)

    program.helpIf(program.ultimate.help)
    program.required('bind')
    program.validate(require('arguable/bindable'), 'bind')

    var bind = program.ultimate.bind

    var mingle = new Static(program.argv)
    var server = http.createServer(mingle.reactor.middleware)
    server.listen(bind.port, bind.address, async())
    program.on('shutdown', server.close.bind(server))
    program.on('shutdown', shuttle.close.bind(shuttle))
    logger.info('started', { parameters: program.ultimate })
}))
