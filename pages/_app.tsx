import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper';
import {
    MuiThemeProvider
} from '@material-ui/core/styles';

import { Footer } from '../src/components/footer';
import '../assets/css/index.css';
import { getStore } from '../src/redux/reducers/store';
import { theme } from './theme';

require('../utils/axiosClient');


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
                    <title>Nabi Music</title>
                </Head>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <MuiThemeProvider theme={theme}>
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
