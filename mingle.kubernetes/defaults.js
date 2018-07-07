var UserAgent = require('vizsla')

module.exports = function (ultimate, attributes) {
    return {
        ua: attributes.ua || new UserAgent,
        bind: ultimate.bind,
        format: ultimate.format || '%s:%d',
        token: ultimate.token || '/var/run/secrets/kubernetes.io/serviceaccount/token',
        ca: ultimate.ca || '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
        namespace: ultimate.namespace,
        pod: ultimate.pod,
        container: ultimate.container,
        port: ultimate.port || ultimate.container,
        kubernetes: ultimate.kubernetes
    }
}
