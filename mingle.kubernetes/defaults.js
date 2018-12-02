var UserAgent = require('vizsla')

module.exports = function (properties) {
    return {
        ua: properties.ua || new UserAgent,
        format: properties.format || '%s:%d',
        token: properties.token || '/var/run/secrets/kubernetes.io/serviceaccount/token',
        ca: properties.ca || '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
        namespace: properties.namespace,
        pod: properties.pod,
        container: properties.container,
        port: properties.port || properties.container,
        kubernetes: properties.kubernetes ||
            process.env.KUBERNETES_SERVICE_HOST + ':' + process.env.KUBERNETES_SERVICE_PORT
    }
}
