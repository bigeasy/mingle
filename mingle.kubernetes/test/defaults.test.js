describe('defaults', () => {
    const assert = require('assert')
    const defaults = require('../defaults')
    it('can no defaults', () => {
        assert.deepStrictEqual(defaults({
            format: 'http://%s:%d/',
            token: '/home/mingle/token',
            ca: '/home/mingle/ca',
            namespace: 'namespace',
            pod: 'pod',
            container: 'mingle',
            port: 'mingle'
        }, {
            KUBERNETES_SERVICE_PORT: '8081',
            KUBERNETES_SERVICE_HOST: '127.0.0.1'
        }), {
            format: 'http://%s:%d/',
            token: '/home/mingle/token',
            ca: '/home/mingle/ca',
            namespace: 'namespace',
            pod: 'pod',
            container: 'mingle',
            port: 'mingle',
            kubernetes: '127.0.0.1:8081'
        }, 'no defaults')
    })
    it('can defaults', () => {
        assert.deepStrictEqual(defaults({
            namespace: 'namespace',
            pod: 'pod',
            container: 'noport',
            kubernetes: '127.0.0.1:8081'
        }), {
            format: '%s:%d',
            token: '/var/run/secrets/kubernetes.io/serviceaccount/token',
            ca: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
            namespace: 'namespace',
            pod: 'pod',
            container: 'noport',
            port: 'noport',
            kubernetes: '127.0.0.1:8081'
        }, 'defaults')
    })
})
