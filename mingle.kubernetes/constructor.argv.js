/*
    ___ usage ___ en_US ___
    ___ $ ___ en_US ___

        bind is required:
            the `--bind` argument is a required argument

        name is required:
            the `--name` argument is a required argument

        token file not found:
            unable to find token file
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    var Resolver = require('./resolver')
    var rescue = require('rescue')
    var fs = require('fs')
    var defaults = require('./defaults')

    program.required('bind', 'namespace', 'pod', 'container', 'kubernetes')
    program.validate(require('arguable/bindable'), 'bind')

    var bind = program.ultimate.bind

    var options = defaults(program.ultimate)

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
