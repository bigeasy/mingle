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
    var destroyer = require('server-destroy')

    var Static = require('./middleware.js')

    var Shuttle = require('prolific.shuttle')

    var Destructible = require('destructible')
    var Terminator = require('destructible/terminator')

    program.helpIf(program.ultimate.help)
    program.required('bind')
    program.validate(require('arguable/bindable'), 'bind')

    var destructible = new Destructible('mingle.static')
    destructible.events.pump(new Terminator(1000), 'push')
    program.on('shutdown', destructible.destroy.bind(destructible))

    var logger = require('prolific.logger').createLogger('mingle.static')
    var shuttle = Shuttle.shuttle(program, logger)
    destructible.addDestructor('shuttle', shuttle, 'close')

    var bind = program.ultimate.bind

    var mingle = new Static(program.argv)
    var server = http.createServer(mingle.reactor.middleware)
    destroyer(server)
    server.listen(bind.port, bind.address, async())
    destructible.addDestructor('http', server, 'destroy')
    logger.info('started', { parameters: program.ultimate })
}))
