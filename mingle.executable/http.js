var cadence = require('cadence')
var Middleware = require('./middleware')
var http = require('http')
var destroyer = require('server-destroy')
var delta = require('delta')

module.exports = cadence(function (async, destructible, program, resolver) {
    var middleware = new Middleware(resolver)
    var server = http.createServer(middleware.reactor.middleware)
    destroyer(server)
    delta(destructible.monitor('http')).ee(server).on('close')
    destructible.destruct.wait(server, 'destroy')
    async(function () {
        program.ultimate.bind.listen(server, async())
    }, function () {
        return []
    })
})
