describe('kubernetes', () => {
    const assert = require('assert')
    const fs = require('fs')
    const path = require('path')
    const children = require('child_process')
    const { NotFound } = require('http-errors')

    children.execSync('make -C ' + path.join(__dirname, 'fixtures/certs'))

    const fastify = require('fastify')({
        https: {
            ca: (fs.readFileSync(path.join(__dirname, 'fixtures/certs/ca-cert.pem'), 'utf8')),
            key: (fs.readFileSync(path.join(__dirname, 'fixtures/certs/key.pem'), 'utf8')),
            cert: (fs.readFileSync(path.join(__dirname, 'fixtures/certs/cert.pem'), 'utf8'))
        }
    })

    let count = 0
    fastify.get('/api/v1/namespaces/namespace/pods', async () => {
        if (count++ == 0) {
            throw new NotFound()
        }
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'pods.json'), 'utf8'))
    })
    const properties = {
        token: null,
        ca: null,
        format: '%s:%d',
        kubernetes: '127.0.0.1:8081',
        namespace: 'namespace',
        pod: 'service',
        container: 'conduit',
        port: 'conduit'
    }

    before(async () => await fastify.listen(8081))
    after(async () => await fastify.close())
    it('can raise token file not found', async () => {
        properties.token = path.join(__dirname, 'x')
        const Destructible = require('destructible')
        const destructible = new Destructible('token')
        try {
            await require('../kubernetes').create(destructible, properties)
        } catch (error) {
            assert.equal(error.label, 'token file not found', 'token file not found')
        }
    })
    it('can raise ca file not found', async () => {
        properties.token = path.join(__dirname, 'fixtures/token'),
        properties.ca = path.join(__dirname, 'x')
        const Destructible = require('destructible')
        const destructible = new Destructible('ca')
        try {
            await require('../kubernetes').create(destructible, properties)
        } catch (error) {
            assert.equal(error.label, 'ca file not found', 'ca file not found')
        }
    })
    it('can discover', async () => {
        properties.token = path.join(__dirname, 'fixtures/token'),
        properties.ca = path.join(__dirname, 'fixtures/certs/ca-cert.pem')
        const Destructible = require('destructible')
        const destructible = new Destructible('discover')
        const resolver = await require('../kubernetes').create(destructible, properties)
        assert.deepStrictEqual((await resolver.resolve()), [], 'error')
        assert.deepStrictEqual((await resolver.resolve()), [ '10.2.73.7:8486' ], 'discover')
    })
})
