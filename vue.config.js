const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin');


const PurifyCSSPlugin = require('purifycss-webpack')
const path = require('path')
const glob = require('glob-all')

module.exports = {
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin(),
            new CompressionPlugin(),
            new PurifyCSSPlugin({
                paths: glob.sync([
                    path.join(__dirname, 'src/**/*.html'),
                    path.join(__dirname, 'src/**/*.js'),
                    path.join(__dirname, 'src/**/*.vue')
                ]),
                minimize: true,
                purifyOptions: {
                    whitelist: []
                }
            }),
        ]
    }
};

