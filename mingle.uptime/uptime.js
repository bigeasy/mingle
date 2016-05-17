var util = require('util')

function Uptime (options) {
    this._discoveryUrl = options.discoveryUrl
    this._healthUrl = options.healthUrl
    this._duration = 0
    this._previous = []
}

Uptime.prototype.get = cadence(function (async) {
    async(function () {
        this._ua.fetch({ url: this._discoveryUrl }, async())
    }, function (response) {
        async.map(function (addressPort) {
            var url = util.format(this._healthUrl, addressPort)
            async(function () {
                this._ua.fetch({ url: url }, async())
            }, function (response) {
            })
        })(response)
    }, function (next) {
    })
})
