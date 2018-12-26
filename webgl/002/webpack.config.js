const path = require('path');

module.exports = {
    // mode: 'development',
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'threejsmap.js',
        library: 'TMap',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    externals: ["three"]
};