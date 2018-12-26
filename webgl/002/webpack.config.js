const path = require('path');

module.exports = {
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