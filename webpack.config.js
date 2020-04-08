const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src/dist'),
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: ['node_modules/**']
    }
};