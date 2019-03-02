require('proof')(1, prove)

function prove (okay, callback) {
    var Destructible = require('destructible')
    var destructible = new Destructible('test/olio.t')

    var Mock = require('olio/mock')

    destructible.completed.wait(callback)

    var cadence = require('cadence')

    var path = require('path')

    cadence(function (async) {
        async(function () {
            destructible.durable('mock', Mock, {
                socket: path.join(__dirname, 'socket'),
                children: {
                    olio: {
                        path: path.resolve(__dirname, '../olio.js'),
                        workers: 1,
                        properties: {
                            module: 'mingle.test'
                        }
                    },
                    client: {
                        path: path.resolve(__dirname, 'client.js'),
                        workers: 1,
                        properties: {}
                    }
                }
            }, async())
        }, function (children) {
            children.client[0].processes[0].conduit.connect({}).inbox.dequeue(async())
        }, function (response) {
            okay(response, [ '127.0.0.1:8888' ], 'olio')
        })
    })(destructible.durable('test'))
}
