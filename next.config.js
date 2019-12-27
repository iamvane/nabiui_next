const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-images');
module.exports = withCSS(withSass(withFonts({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
            }
        });
        return config;
    }
})));
