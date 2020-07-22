import * as React from 'react';
import Router from "next/router";
import Head from 'next/head';

import { getCookie } from '../../utils/cookies';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import { Routes } from '../common/constants/Routes';

interface Props {}

const Affiliate: React.StatelessComponent<Props> = props => {
  const [hbspt, setHbspt] = React.useState(typeof window !== 'undefined' && (window as any)['hbspt']);
  const isLoggedIn = getCookie('token');

  React.useEffect(() => {
    if (!isLoggedIn) {
      if (!hbspt) {
        setHubSpot();
        return;
      }

      hbspt.forms.create({
        portalId: '7039981',
        formId: '66548108-ba5d-42ae-8138-1a39378dc561',
        target: '#hubspotAffiliate'
      });
    } else {
      Router.push("")
    }
  }, [hbspt]);

  const setHubSpot = () => {
    const hs = typeof window !== 'undefined' && (window as any)['hbspt'];
    setHbspt(hs);
  }

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitlesAndDescriptions.affiliate.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.affiliate.description}></meta>
      </Head>
      <div className="nabi-container nabi-margin-bottom-small">
        <div className="nabi-background-white nabi-section nabi-text-center">
          <div id="hubspotAffiliate"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Affiliate;
