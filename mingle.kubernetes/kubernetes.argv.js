/*
    ___ usage ___ en_US ___
    mingle kubernetes <options>

    options:

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
    var Resolver = require('./resolver')
    var rescue = require('rescue')
    var fs = require('fs')
    var defaults = require('./defaults')

    program.required('namespace', 'pod', 'container', 'kubernetes')

    var options = defaults(program.ultimate, program.attribute)

    async(function () {
        async([function () {
            fs.readFile(options.token, 'utf8', async())
        }, rescue(/^code:ENOENT$/, function () {
            program.abend('token file not found', options.token)
        })])
        async([function () {
            fs.readFile(options.ca, async())
        }, rescue(/^code:ENOENT$/, function () {
            program.abend('ca file not found', options.ca)
        })])
    }, function (token, ca) {
        options.token = token.replace(/\n$/, '')
        options.ca = ca
        return new Resolver(options)
    })
}))
