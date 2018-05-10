/*

    ___ usage ___ en_US ___
    mingle srv <options>

    options:

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
    program.helpIf(program.ultimate.help)
    program.required('name')
    program.validate(require('arguable/bindable'), 'bind')

    var coalesce = require('extant')
    var format = coalesce(program.ultimate.format, '%s:%d')
    var dns = require('dns')

    var resolve = require('./resolve')
    var name = program.ultimate.name
    return {
        resolve: function (callback) {
            resolve(dns, name, format, callback)
        }
    }
}))
