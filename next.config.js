const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-images');
const webpack = require('webpack');
const withSourceMaps = require('@zeit/next-source-maps');
const withPWA = require('next-pwa');

const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA(withSourceMaps(withCSS(withSass(withFonts({
  pwa: {
    dest: 'public',
    runtimeCaching
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
      }
    });
    config.plugins.push(new webpack.EnvironmentPlugin(['REACT_APP_API_URL', 'REACT_STRIPE_KEY']));
    return config;
  }
})))));
