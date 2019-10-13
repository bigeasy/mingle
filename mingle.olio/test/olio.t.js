require('proof')(3, async (okay) => {
    const fs = require('fs').promises
    const once = require('prospective/once')
    const path = require('path')
    const children = require('child_process')
    const axios = require('axios')
    try {
        await fs.unlink(path.join(__dirname, 'socket'))
    } catch (error) {
        if (error.code != 'ENOENT') {
            throw error
        }
    }
    const olio = children.spawn(path.resolve(__dirname, '../node_modules/.bin/olio'), [
        '--application', path.join(__dirname, 'application.js'),
        '--configuration', path.join(__dirname, 'configuration.js'),
    ], {
        stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ]
    })
    const exit = once(olio, 'close')
    const [ message ] = await once(olio, 'message')
    okay(message, 'olio:ready', 'ready')
    const discover = await axios.get('http://127.0.0.1:8081/discover')
    okay(discover.data, [ '127.0.0.1:8888' ], 'discover')
    olio.kill()
    const [ code ] = await exit
    okay(code, 0, 'exit')
})
