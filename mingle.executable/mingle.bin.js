#!/usr/bin/env node

/*
    ___ usage ___ en_US ___
    usage: mingle <protocol> <protocol args>

            --help                      display this message
            --bind <string>             address to bind too

    ___ $ ___ en_US ___

        udp is required:
            the `--udp` address and port is a required argument

        port is not an integer:
            the `--udp` port must be an integer

    ___ . ___
*/
require('arguable')(module, require('cadence')(function (async, program) {
    program.helpIf(program.ultimate.help)

    var Destructible = require('destructible')
    var destructible = new Destructible('t/mingle.bin')

    var constructor = require('mingle.' + program.argv.shift())

    async(function () {
        constructor(program.argv, async())
    }, function (resolver) {
        if (program.ultimate.bind == 'olio') {
            destructible.monitor('server', require('./olio'), program, resolver, async())
        } else {
            destructible.monitor('server', require('./http'), resolver, async())
        }
    }, function () {
        console.log('most ready')
        program.ready.unlatch()
    })
}))
