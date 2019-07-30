describe('olio', () => {
    const assert = require('assert')
    it('can serve', async () => {
        const once = require('prospective/once')
        const path = require('path')
        const children = require('child_process')
        const olio = children.spawn(path.resolve(__dirname, '../node_modules/.bin/olio'), [
            '--application', path.join(__dirname, 'application.js'),
            '--configuration', path.join(__dirname, 'configuration.js'),
        ], {
            stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ]
        })
        const exit = once(olio, 'close')
        const [ message ] = await once(olio, 'message')
        assert.equal(message, 'olio:ready', 'ready')
        olio.kill()
        const [ code ] = await exit
        assert.equal(code, 0, 'exit')
    })
})
