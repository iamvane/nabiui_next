import * as React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper';

import '../assets/css/index.css';
import { getStore } from '../src/redux/reducers/store';

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
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>);
    }
}

export default withRedux(makeStore)(NabiApp);
