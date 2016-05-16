function unhealthy (machines) {
    return machines.filter(function (machine) {
        return machine == null || machine.instanceId == null
    }).length != 0
}
function sort (machines) {
    return machines.map(function (machine) {
        return String(machine.instanceId)
    }).sort()
}

module.exports = function (previous, next) {
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
