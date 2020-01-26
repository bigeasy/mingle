module.exports = async function (destructible, olio, properties) {
    const resolver = await require(properties.module).create(destructible, properties)
    return async function (request, inbox, outbox) {
        return await resolver.resolve()
    }
}
