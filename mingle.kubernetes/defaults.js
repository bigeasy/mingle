module.exports = function (ultimate) {
    return {
        ua: ultimate.ua,
        bind: ultimate.bind,
        token: ultimate.token || '/var/run/secrets/kubernetes.io/serviceaccount/token',
        ca: ultimate.ca || '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
        namespace: ultimate.namespace,
        pod: ultimate.pod,
        container: ultimate.container,
        port: ultimate.port || ultimate.container,
        kubernetes: ultimate.kubernetes
    }
}
