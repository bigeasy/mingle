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
    var delta = require('delta')

    var Static = require('./middleware.js')

    var Shuttle = require('prolific.shuttle')

    var Destructible = require('destructible')

    program.helpIf(program.ultimate.help)
    program.required('bind')
    program.validate(require('arguable/bindable'), 'bind')

    var destructible = new Destructible('mingle.static')
    program.on('shutdown', destructible.destroy.bind(destructible))

    var logger = require('prolific.logger').createLogger('mingle.static')
    var shuttle = Shuttle.shuttle(program, logger)
    destructible.addDestructor('shuttle', shuttle, 'close')

    var bind = program.ultimate.bind

    var mingle = new Static(program.argv)
    var server = http.createServer(mingle.reactor.middleware)
    destroyer(server)
    async(function () {
        destructible.addDestructor('http', server, 'destroy')
        server.listen(bind.port, bind.address, async())
    }, function () {
        logger.info('started', { parameters: program.ultimate })
        delta(destructible.monitor('server')).ee(server).on('close')
        destructible.completed.wait(async())
        program.ready.unlatch()
    }, function () {
        return [ 0 ]
    })
}))
