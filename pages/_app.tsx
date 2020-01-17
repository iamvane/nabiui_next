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
import { fetchUser, setInvitationToken, setAuthToken } from '../src/redux/actions/UserActions';
import '../assets/css/overrides.css';
import '../assets/css/index.css';
import store from '../src/redux/reducers/store';
import { parseCookies } from '../src/utils/parseCookies';
import { theme } from '../theme/theme';

require('../src/utils/axiosClient');

class NabiApp extends App<any, any> {
  static async getInitialProps({ Component, ctx}) {
    const pageProps = Component.getInitialProps ? await
      Component.getInitialProps(ctx) : {};
      const cookies = parseCookies(ctx.req)
    return {
      pageProps,
      token: cookies.token
     };
  }

  public componentDidMount(): void {
    if (this.props.token) {
      this.props.store.dispatch(setAuthToken(this.props.token));
    }
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Head>
          <title>Nabi Music - Music Lessons for Children and Qualified Music Teachers</title>
        </Head>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <Header {...pageProps} />
            <Component {...pageProps} />
            <Footer />
          </MuiThemeProvider>
        </Provider>
      </>
    );
  }
}

export default withRedux(store)(NabiApp);
