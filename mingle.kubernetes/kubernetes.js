var cadence = require('cadence')
var Interrupt = require('interrupt').createInterrupter('mingle.kubernetes')
var Resolver = require('./resolver')
var defaults = require('./defaults')
var rescue = require('rescue/redux')
var fs = require('fs')

module.exports = cadence(function (async, destructible, properties) {
    var options = defaults(properties)
    async(function () {
        async([function () {
            fs.readFile(options.token, 'utf8', async())
        }, rescue(/^code:ENOENT$/, function () {
            throw new Interrupt('token file not found', { file: options.token })
        })])
        async([function () {
            fs.readFile(options.ca, async())
        }, rescue(/^code:ENOENT$/, function () {
            throw new Interrupt('ca file not found', { file: options.ca })
        })])
    }, function (token, ca) {
        options.token = token.replace(/\n$/, '')
        options.ca = ca
        return new Resolver(options)
    })
})
