import * as React from 'react';
import Router from "next/router";
import Head from 'next/head';

import { getCookie } from '../../utils/cookies';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import { Routes } from '../common/constants/Routes';

interface Props {}

const StudentProfileBuilder: React.StatelessComponent<Props> = props => {
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
        formId: '64989638-3b12-4ba0-a53c-4e7a2e5e50f6',
        target: '#hubspotProfileBuilder'
      });
    } else {
      Router.push(Routes.ParentStudio)
    }
  }, [hbspt]);

  const setHubSpot = () => {
    const hs = typeof window !== 'undefined' && (window as any)['hbspt'];
    setHbspt(hs);
  }

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitlesAndDescriptions.studentProfileBuilder.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.studentProfileBuilder.description}></meta>
      </Head>
      <div className="nabi-container nabi-margin-bottom-small">
        <div className="nabi-background-white nabi-section nabi-text-center">
          <div id="hubspotProfileBuilder"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudentProfileBuilder;
