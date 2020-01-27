import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', (err) => {
  Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
  Sentry.captureException(err);
});

class NabiDocument extends Document {
  constructor (props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  componentDidMount () {
    !(function () {
      var analytics = window.analytics = window.analytics || []; if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice."); else {
        analytics.invoked = !0; analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"]; analytics.factory = function (t: any) { return function () { var e = Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics } }; for (var t = 0; t < analytics.methods.length; t++) { var e = analytics.methods[t]; analytics[e] = analytics.factory(e) } analytics.load = function (t: string, e: any) { var n = document.createElement("script"); n.type = "text/javascript"; n.async = !0; n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js"; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(n, a); analytics._loadOptions = e }; analytics.SNIPPET_VERSION = "4.1.0";
        analytics.load("CCqHyxi5VFuKmmHqKJuRzGgr5972QeUC");
        analytics.page();
      }
    })

    /* tslint:disable */
    !(function () {
      window.__insp = window.__insp || [];
      const __insp =  window.__insp  || [];
      __insp.push(['wid', 417049237]);
      var ldinsp = function () {
        if (typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=417049237&r=' + Math.floor(new Date().getTime() / 3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x);
      };
      setTimeout(ldinsp, 0);
    })
    /* tslint:enable */
  }
  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0" />
          <meta name="theme-color" content="#000000" />
          <meta name="p:domain_verify" content="fc7573e0c0933bb2a115da9aab66e9db"/>
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <link rel="shortcut icon" href="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/favicon.ico" />
          <script src="https://js.stripe.com/v3/"></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,800" rel="stylesheet" />
          <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=db8a6365-908c-4f48-8845-ade2abc55a3f"></script>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA1CE5k-YS94ZnyFiOIjwlr99jz7JjOA&libraries=places"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default NabiDocument;
