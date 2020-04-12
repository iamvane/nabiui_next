import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import * as Sentry from "@sentry/browser";

process.on("unhandledRejection", err => {
  Sentry.captureException(err);
});

process.on("uncaughtException", err => {
  Sentry.captureException(err);
});

class NabiDocument extends Document {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps
    };
  }

  render() {
    const prod = process.env.NODE_ENV == "production";
    /* tslint:disable */
    const segmentScript = prod
      ? `var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
    analytics.load("CCqHyxi5VFuKmmHqKJuRzGgr5972QeUC");analytics.page();}`
      : "";
    /* tslint:enable */
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5,user-scalable=0, shrink-to-fit=no"
          />
          <meta name='keywords' content="guitar lessons, piano lessons, piano lessons near me, singing lessons, kids piano, music lessons near me, music school, violin lessons near me, voice lessons, violin lessons, music lessons for kids, piano lessons for kids, new york, massachusetts, boston" />
          <script
            async
            defer
            src="https://connect.facebook.net/en_US/sdk.js"
          ></script>
          <meta
            name="p:domain_verify"
            content="fc7573e0c0933bb2a115da9aab66e9db"
          />
          <link
            rel="shortcut icon"
            href="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/favicon.ico"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat: 400,500,600,800"
            rel="stylesheet"
          />

          {/* iOS */}
          <link href="/images/icons/apple-icon-57x57.png" rel="apple-touch-icon" sizes="57x57" />
          <link href="/images/icons/apple-icon-60x60.png" rel="apple-touch-icon" sizes="60x60" />
          <link href="/images/icons/apple-icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
          <link href="/images/icons/apple-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
          <link href="/images/icons/apple-icon-114x114.png" rel="apple-touch-icon" sizes="114x114" />
          <link href="/images/icons/apple-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
          <link href="/images/icons/apple-icon-144x144.png" rel="apple-touch-icon" sizes="144x144" />
          <link href="/images/icons/apple-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
          <link href="/images/icons/apple-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />

          {/* Startup Image */}
          <link href="/images/icons/apple-icon-180x180.png" rel="apple-touch-startup-image" />

          {/* Pinned Tab */}
          <link href="/images/icons/favicon.svg" rel="mask-icon" color="#000000" />

          {/* Android */}
          <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="favicon-48.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/images/icons/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="128x128" href="/images/icons/icon-128x128.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/images/icons/icon-192x192.png" />

          {/* Others */}
          <link rel="shortcut icon" href="/images/icons/favicon.ico" />

          {/* Manifest.json */}
          <link href="/manifest.json" rel="manifest" />

          <meta name="msapplication-TileColor" content="#f0f3f6" />
          <meta name="msapplication-TileImage" content="/images/icons/ms-icon-144x144.png" />
          <meta name="theme-color" content="#f0f3f6" />
          <script async defer dangerouslySetInnerHTML={{ __html: segmentScript }} />
          <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/7039981.js"></script>
          {/* <script aync defer src="https://js.stripe.com/v3/"></script> */}
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
