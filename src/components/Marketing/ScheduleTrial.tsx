import * as React from 'react';
import Router from "next/router";
import Head from 'next/head';

import { getCookie } from '../../utils/cookies';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import { Routes } from '../common/constants/Routes';

interface Props {}

const ScheduleTrial: React.StatelessComponent<Props> = props => {
  const [hbspt, setHbspt] = React.useState(typeof window !== 'undefined' && (window as any)['hbspt']);
  const isLoggedIn = getCookie('token');

  React.useEffect(() => {
    if (!hbspt) {
      setHubSpot();
      return;
    }

    hbspt.forms.create({
      portalId: '7039981',
      formId: '1ca1f612-dcea-4b07-8ab2-e8a7f6a6a165',
      target: '#hubspotTrialScheduler'
    });
  }, [hbspt]);

  const setHubSpot = () => {
    const hs = typeof window !== 'undefined' && (window as any)['hbspt'];
    setHbspt(hs);
  }

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitlesAndDescriptions.scheduleTrial.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.scheduleTrial.description}></meta>
      </Head>
      <div className="nabi-container nabi-margin-bottom-small">
        <div className="nabi-background-white nabi-section nabi-text-center">
          <div id="hubspotTrialScheduler"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScheduleTrial;
