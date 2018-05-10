/*

    ___ usage ___ en_US ___
    mingle static [address:port, address:port...]

    options:

        -f, --format <format>

          A sprintf format for address and port. A `sprintf` is invoked with
          with the pattern and host name and port as first and second arguments
          respectively. The pattern defaults to "%s:%d" to create a result like
          "127.0.0.1:8080".

        --help

          Display help message.

    ___ $ ___ en_US ___

        bind is required:
            the `--bind` argument is a required argument
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    program.helpIf(program.ultimate.help)
    program.validate(require('arguable/bindable'), 'bind')

    var sprintf = require('sprintf-js').sprintf
    var coalesce = require('extant')

    var format = coalesce(program.ultimate.format, '%s:%d')
    var addresses = program.argv.map(function (address) {
        var pair = address.split(':')
        return sprintf(format, pair[0], +pair[1])
    })

    return {
        resolve: function (callback) { callback(null, addresses) }
    }
}))
