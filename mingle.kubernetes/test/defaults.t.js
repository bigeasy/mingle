require('proof')(2, prove)

function prove (okay) {
    var defaults = require('../defaults')
    okay(defaults({
        ua: {},
        format: 'http://%s:%d/',
        token: '/home/mingle/token',
        ca: '/home/mingle/ca',
        namespace: 'namespace',
        pod: 'pod',
        container: 'mingle',
        port: 'mingle',
        kubernetes: '127.0.0.1:8080'
    }, { ua: {} }), {
        ua: {},
        format: 'http://%s:%d/',
        token: '/home/mingle/token',
        ca: '/home/mingle/ca',
        namespace: 'namespace',
        pod: 'pod',
        container: 'mingle',
        port: 'mingle',
        kubernetes: '127.0.0.1:8080'
    }, 'no defaults')
    okay(defaults({
        ua: {},
        namespace: 'namespace',
        pod: 'pod',
        container: 'noport',
        kubernetes: '127.0.0.1:8080'
    }, { ua: {} }), {
        ua: {},
        format: '%s:%d',
        token: '/var/run/secrets/kubernetes.io/serviceaccount/token',
        ca: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
        namespace: 'namespace',
        pod: 'pod',
        container: 'noport',
        port: 'noport',
        kubernetes: '127.0.0.1:8080'
    }, 'defaults')
}
