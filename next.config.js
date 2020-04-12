const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-images');
const webpack = require('webpack');
const withSourceMaps = require('@zeit/next-source-maps');
const withPWA = require('next-pwa');

module.exports = withPWA(withSourceMaps(withCSS(withSass(withFonts({
  pwa: {
    dest: 'public'
  },
  env: {
    STRIPE_SECRET_KEY: "sk_test_LE4KxozC6O8d3krb3FEjbBp00erufO2Bm",
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
      }
    });
    config.plugins.push(new webpack.EnvironmentPlugin(['REACT_APP_API_URL']));
    return config;
  }
})))));
