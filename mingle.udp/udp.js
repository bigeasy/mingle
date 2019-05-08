// How to use? Simpified Compassion. Use it in your application with UDP mingle
// for local testing. You would have an argument to compassion that says that
// the consenus is not formed until at least two members arrive. That way we can
// use SWIM or some sort of Gossip to pass around who is available, and the
// Gossip protocol will be what we trust to determine who is available.

const events = require('events')
const dgram = require('dgram')

class UDP extends events.EventEmitter {
    constructor (interfaces, port, where) {
        super()
        this.destroyed = false
        this._port = port
        this._where = where
        this._when = Date.now()
        this._addresses = interfaces.forEach((iface) => {
            return broadcastAddress(require('os').networkInterfaces()[iface])
        })
    }

    destroy () {
        this.destroyed = true
        if (this._mingling) {
            this._client.close()
            this._mingling.call()
            this._mingling = null
        }
    }

    announce () {
        const server = dgram.createSocket('udp4')
        const message = Buffer.from(JSON.stringify({
            when: this._when,
            where: this._where
        }))
        server.setBroadcast(true)
        const broadcast = () => {
            this._addresses.forEach(address => {
                server.send(message, 0, message.length, this._port, address)
            })
        }
        broadcast()
        setInterval(broadcast, 1000)
    }

    unannounce () {
        if (!this._interval) {
            clearInterval(this._interval)
            this._interval = null
        }
    }

    mingle () {
        this._client = dgram.createSocket('udp4')
        client.on('listening', () => client.setBroadcast(true))
        client.on('message', (message, rinfo) => {
            const json = JSON.parse(message.toString())
            this.emit('announce', {
                when: json.when,
                where: {
                    address: json.where.address || rinfo.address,
                    port: json.where.port
                }
            })
        })
        client.bind(this._port)
        return new Promise(resolve => this._mingling = resolve)
    }
}

module.exports = UDP
