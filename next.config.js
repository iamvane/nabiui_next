//const withSass = require('@zeit/next-sass');
//const withCSS = require('@zeit/next-css');
const withAntdLess = require('next-plugin-antd-less');

const withFonts = require('next-images');
const webpack = require('webpack');

const runtimeCaching = require('next-pwa/cache')

module.exports = withAntdLess(withFonts({
  images: {
    disableStaticImages: true
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    register: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|png)$/,
      use: {
        loader: 'url-loader',
      }
    });
    config.plugins.push(new webpack.EnvironmentPlugin(['REACT_APP_API_URL', 'REACT_STRIPE_KEY']));
    return config;
  }
}));
