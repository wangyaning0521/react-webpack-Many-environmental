
const path      = require('path')

module.exports = {
    entry:'./src/app.jsx',
    resolve:{
        extensions: [".js", ".json", ".jsx"],
        alias: {
            '@'     : path.resolve(__dirname,'../src'),
            '&'     : path.resolve(__dirname,'../src/components'),
            'pages' : path.resolve(__dirname,'../src/pages'),
            'style' : path.resolve(__dirname,'../src/style'),
            'lib'   : path.resolve(__dirname,'../src/lib'),
            'router': path.resolve(__dirname,'../src/router'),
            'store' : path.resolve(__dirname,'../src/store'),
            'Axios' : path.resolve(__dirname,'../src/lib/axiosTool'),
            'assets' : path.resolve(__dirname,'../src/assets'),
        }
    },
    module:{
        rules:[
            {
               test:/\.jsx$/,
               use:{
                   loader:'babel-loader'
               } 
            }
        ]
    }
}