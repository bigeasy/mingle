/*
    ___ usage ___ en_US ___
    mingle kubernetes <options>

    options:

        -b, --bind <address:port>
            Address and port to bind to.
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

    var Shuttle = require('prolific.shuttle')

    var destroyer = require('server-destroy')

    var createResolver = require('./resolver')
    var UserAgent = require('vizsla')
    var Service = require('./http')

    var logger = require('prolific.logger').createLogger('bigeasy.mingle.kubernetes')
    var argv = require('./constructor.argv')

    var shuttle = Shuttle.shuttle(program, logger)

    var options = JSON.parse(JSON.stringify(program.ultimate))

    async(function () {
        argv([ { ua: new UserAgent }, program.ultimate ], async())
    }, function (resolver) {
        var service = new Service(resolver)
        var server = http.createServer(service.dispatcher.createWrappedDispatcher())
        server.listen(resolver.bind.port, resolver.bind.address, async())
        destroyer(server)
        program.on('shutdown', server.destroy.bind(server))
        program.on('shutdown', shuttle.close.bind(shuttle))
    })
}))
