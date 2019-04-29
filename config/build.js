/**
 * @param  {Object} dev   [启动配置项]
 * @param  {Object} build [打包配置项]
 */
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        productionSourceMap: true,
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        assetsPublicPath: '/',
        proxyTable: {},
    }
}