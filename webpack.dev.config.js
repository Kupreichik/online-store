const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 8081,
        contentBase: path.resolve(__dirname, '../dist'),
    },
};
