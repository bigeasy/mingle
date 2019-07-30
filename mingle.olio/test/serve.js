module.exports = async function (destructible, olio) {
    const sender = await olio.sender('mingle')
    const fastify = require('fastify')()
    fastify.get('/resolve', async request => {
        return await sender.processes[0].conduit.request({})
    })
    await fastify.listen(8081)
    destructible.destruct(() => fastify.close())
    return null
}
