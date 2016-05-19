function unhealthy (machines) {
    return machines.filter(function (machine) {
        return machine == null || machine.health == null || machine.health.instanceId == null
    }).length != 0
}
function sort (machines) {
    return machines.map(function (machine) {
        return String(machine.health.instanceId)
    }).sort()
}

module.exports = function (previous, next) {
    if (previous.length == 0 || next.length == 0) {
        return false
    }
    if (unhealthy(previous) || unhealthy(next)) {
        return false
    }
    if (previous.length != next.length) {
        return false
    }
    next = sort(next)
    if (sort(previous).filter(function (instanceId, index) {
        return next[index] == instanceId
    }).length != previous.length) {
        return false
    }
    return true
}
