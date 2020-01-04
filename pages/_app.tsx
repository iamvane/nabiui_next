import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper';
import {
  MuiThemeProvider
} from '@material-ui/core/styles';

import { Footer } from '../src/components/common/Footer';
import Header from '../src/components/Header/Header';
import '../assets/css/overrides.css';
import '../assets/css/index.css';
import { getStore } from '../src/redux/reducers/store';
import { theme } from '../theme/theme';

require('../src/utils/axiosClient');

const { makeStore, persistor } = getStore();

class NabiApp extends App<any, any> {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await
      Component.getInitialProps(ctx) : {};
    return { pageProps };
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Head>
          <title>Nabi Music - Music Lessons for Children and Qualified Music Teachers</title>
        </Head>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor(store)}>
            <MuiThemeProvider theme={theme}>
              <Header {...pageProps} />
              <Component {...pageProps} />
              <Footer />
            </MuiThemeProvider>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default withRedux(makeStore)(NabiApp);
