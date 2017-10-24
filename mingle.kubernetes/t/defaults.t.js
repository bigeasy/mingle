require('proof')(2, prove)

function prove (assert) {
    var defaults = require('../defaults')
    assert(defaults({
        ua: {},
        format: 'http://%s:%d/',
        bind: { address: '0.0.0.0', port: 8888 },
        token: '/home/mingle/token',
        ca: '/home/mingle/ca',
        namespace: 'namespace',
        pod: 'pod',
        container: 'mingle',
        port: 'mingle',
        kubernetes: '127.0.0.1:8080'
    }), {
        ua: {},
        format: 'http://%s:%d/',
        bind: { address: '0.0.0.0', port: 8888 },
        token: '/home/mingle/token',
        ca: '/home/mingle/ca',
        namespace: 'namespace',
        pod: 'pod',
        container: 'mingle',
        port: 'mingle',
        kubernetes: '127.0.0.1:8080'
    }, 'no defaults')
    assert(defaults({
        ua: {},
        bind: { address: '0.0.0.0', port: 8888 },
        namespace: 'namespace',
        pod: 'pod',
        container: 'noport',
        kubernetes: '127.0.0.1:8080'
    }), {
        ua: {},
        format: '%s:%d',
        bind: { address: '0.0.0.0', port: 8888 },
        token: '/var/run/secrets/kubernetes.io/serviceaccount/token',
        ca: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
        namespace: 'namespace',
        pod: 'pod',
        container: 'noport',
        port: 'noport',
        kubernetes: '127.0.0.1:8080'
    }, 'defaults')
}
