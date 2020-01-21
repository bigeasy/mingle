module.exports = async function (destructible, olio, properties) {
    const sender = await olio.sender(properties.sibling)
    const fastify = require('fastify')()
    fastify.get('/', async () => 'Mingle API\n')
    fastify.get('/discover', async () => {
        return await sender.processes[0].conduit.invoke({})
    })
    await fastify.listen(properties.bind.port)
    destructible.destruct(() => fastify.close())
    return null
}
