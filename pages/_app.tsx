import * as React from "react";
import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import * as Sentry from "@sentry/browser";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { fetchUser , setAuthToken} from "../src/redux/actions/UserActions";

import "../assets/css/overrides.css";
import "../assets/css/index.css";

//GLOBAL CSS
import '../assets/scss/Testimonials.scss';


import { parseCookies } from "../src/utils/parseCookies";
import { theme } from "../theme/theme";
import { ErrorBoundary } from "../src/components/ErrorBoundary";
require("../src/utils/axiosClient");
import 'lazysizes';

import { wrapper,store } from "../src/redux/reducers/store"

import FloatingChat from '../src/components/FloatingChat';
import { UserType } from '../src/redux/models/UserModel';


Sentry.init({
  dsn: "https://bbb8a78b6945414fa1a9b3d32f16a5b6@sentry.io/1774691"
});

interface UserState {
  user:UserType,
}

class NabiApp extends App<any, any>{

  state: UserState = {
    user: store.getState().user.user
  };

  constructor(props){
    super(props);
    this.state = {
      user:null
    }
  }
  
  public async componentWillMount(){
    console.log('store',store);
    await store.dispatch(fetchUser())
    const state = store.getState();

    this.setState({
      user:state.user.user
    })
  }
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const cookies = parseCookies(ctx.req);
    return {
      pageProps,
      token: cookies.token
    };
  }

  public  async componentDidMount(): Promise<void> {
    /*if (this.props.token) {
      return store.dispatch(setAuthToken(this.props.token));
    }
    store.dispatch(setAuthToken(''));
    */
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
    super.componentDidCatch(error, errorInfo);
  }

  render(){
    const { Component, pageProps } = this.props;
    const {user} = this.state;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        </Head>
        <ErrorBoundary>
          <Provider store={store}>
            <MuiThemeProvider theme={theme}>
              <Component {...pageProps} />

              {user && user.id && (
                <FloatingChat user={user} />
              )}
            </MuiThemeProvider>
          </Provider>
        </ErrorBoundary>
      </>
    );
  }
}

export default wrapper.withRedux(NabiApp);
