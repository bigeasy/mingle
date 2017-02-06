function sort (machines) {
    return machines.map(function (machine) { return String(machine.id) }).sort()
}

module.exports = function (previous, next) {
    if (previous.length == 0 || next.length == 0) {
        return false
    }
    if (previous.length != next.length) {
        return false
    }
    next = sort(next)
    if (sort(previous).filter(function (id, index) {
        return next[index] == id
    }).length != previous.length) {
        return false
    }
    return true
}
