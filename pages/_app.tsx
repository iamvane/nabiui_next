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
import Header from '../src/components/common/Header';
import { fetchUser, setInvitationToken } from '../src/redux/actions/UserActions';
import '../assets/css/overrides.css';
import '../assets/css/index.css';
import { getStore } from '../src/redux/reducers/store';
import { theme } from '../theme/theme';

require('../src/utils/axiosClient');

const { makeStore, persistor } = getStore();

class NabiApp extends App<any, any> {
  static async getInitialProps({ Component, ctx }) {
    const { store } = ctx;
    const pageProps = Component.getInitialProps ? await
      Component.getInitialProps(ctx) : {};
    return { pageProps, reduxStore: ctx.store.getState() };
  }

  public componentDidMount(): void {
    let { token } = this.props.router.query;
    token = token || '';
    this.props.store.dispatch(fetchUser());
    if (token) {
      this.props.dispatch(setInvitationToken(token));
    }
  }

  render() {
    const { Component, pageProps, store, reduxStore } = this.props;
    return (
      <>
        <Head>
          <title>Nabi Music - Music Lessons for Children and Qualified Music Teachers</title>
        </Head>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor(store)}>
            <MuiThemeProvider theme={theme}>
              <Header {...pageProps} />
              <Component {...pageProps} {...reduxStore} />
              <Footer />
            </MuiThemeProvider>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default withRedux(makeStore)(NabiApp);
