describe('olio', () => {
    const assert = require('assert')
    it('can serve', async () => {
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
        assert.equal(message, 'olio:ready', 'ready')
        const index = await axios.get('http://127.0.0.1:8081/')
        assert.equal(index.data, 'Mingle API\n', 'index')
        const discover = await axios.get('http://127.0.0.1:8081/discover')
        assert.deepStrictEqual(discover.data, [ '127.0.0.1:8888' ], 'discover')
        olio.kill()
        const [ code ] = await exit
        assert.equal(code, 0, 'exit')
    })
})
