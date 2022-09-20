const path = require('path');

export default () => (
    {
        mode: 'production',
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'webpack-module-two.js',
            libraryTarget: 'umd',
            globalObject: 'this',
            // libraryExport: 'default',
            library: 'webpackModuleTwo'
        },
        externals: {
            'moduleone': {
                amd: 'moduleone',
                commonjs: 'moduleone',
                commonjs2: 'moduleone',
                'root' : 'webpackModuleOne'
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                }
            ]
        },
    }
);
