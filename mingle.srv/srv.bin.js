/*

    ___ usage ___ en_US ___
    mingle srv <options>

    options:

        -b, --bind <address:port>

          Address and port to bind to.

        -f, --format <format>

          A sprintf format for address and port. A `sprintf` is invoked with
          with the pattern and host name and port as first and second arguments
          respectively. The pattern defaults to "%s:%d" to create a result like
          "127.0.0.1:8080".

        -n, --name <stirng>

          The fqdn of the service.

        --help

          Display help message.

    ___ $ ___ en_US ___

        bind is required:
            the `--bind` argument is a required argument

        name is required:
            the `--name` argument is a required argument
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    var http = require('http')

    var Shuttle = require('prolific.shuttle')

    var Resolver = require('./middleware.js')

    var logger = require('prolific.logger').createLogger('mingle.srv')

    program.helpIf(program.ultimate.help)
    program.required('bind', 'name')
    program.validate(require('arguable/bindable'), 'bind')

    var bind = program.ultimate.bind

    var shuttle = Shuttle.shuttle(program, logger)

    var resolver = new Resolver(program.ultimate.name, '%s:%d')
    var server = http.createServer(resolver.reactor.middlware)
    server.listen(bind.port, bind.address, async())
    program.on('shutdown', server.close.bind(server))
    program.on('shutdown', shuttle.close.bind(server))
}))
