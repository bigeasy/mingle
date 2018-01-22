/*
    ___ usage ___ en_US ___
    mingle kubernetes <options>

    options:

        -b, --bind <address:port>

            Address and port to bind to.

        -f, --format <format>

          A sprintf format for address and port. A `sprintf` is invoked with
          with the pattern and host name and port as first and second arguments
          respectively. The pattern defaults to "%s:%d" to create a result like
          "127.0.0.1:8080".

        -n, --namespace <string>

         Namespace of pod to check for readiness.

        -p, --pod <string>

          Name of pod to check for readiness.

        -c, --container <string>

          Container inside pod to check for readiness.

        -P, --port <string>

          Name of port. Defaults to container name if not specified.

        -t, --token <string>

          Path to security token.

        -C, --ca <string>

          Path to certificate authority.

        -k, --kubernetes <address:port>

          Address and port of the kubernetes API.

        --help

          Display help message.
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    program.helpIf(program.ultimate.help)

    var http = require('http')

    var delta = require('delta')

    var Shuttle = require('prolific.shuttle')

    var destroyer = require('server-destroy')

    var createResolver = require('./resolver')
    var UserAgent = require('vizsla')
    var Service = require('./middleware')
    var Destructible = require('destructible')

    var destructible = new Destructible('mingle.kubernetes')
    program.on('shutdown', destructible.destroy.bind(destructible))

    var logger = require('prolific.logger').createLogger('mingle.kubernetes')
    var argv = require('./constructor.argv')

    var shuttle = Shuttle.shuttle(program, logger)
    destructible.addDestructor('shuttle', shuttle, 'close')

    var options = JSON.parse(JSON.stringify(program.ultimate))

    var server
    async(function () {
        argv([ { ua: new UserAgent }, program.ultimate ], async())
    }, function (resolver) {
        var service = new Service(resolver)
        server = http.createServer(service.reactor.middleware)
        destroyer(server)
        server.listen(resolver.bind.port, resolver.bind.address, async())
    }, function () {
        destructible.addDestructor('http', server, 'destroy')
        delta(async()).ee(server).on('close')
        program.ready.unlatch()
    })
}))
