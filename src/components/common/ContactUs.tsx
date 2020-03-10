import * as React from 'react';
import Head from 'next/head';

import Typography from '@material-ui/core/Typography';

import PageTitle from './PageTitle';
import * as constants from './constants/ContactUs';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';

interface Props {}

export const ContacUs: React.StatelessComponent<Props> = (props: Props) =>  {
  React.useEffect(() => {
    const hbspt =  typeof window !== 'undefined' && (window as any)['hbspt'];

  	const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
    	if(hbspt) {
        console.log('vane')
      	hbspt.forms.create({
        	portalId: '7039981',
          formId: '235c5d24-8f69-4bc7-8752-a083ae1a527a',
          target: '#hubspotForm'
        })
      }
    });
  });

  return (
    <div className="nabi-container">
      <Head>
        <title>{pageTitlesAndDescriptions.contactUs.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.contactUs.description}></meta>
      </Head>
      <PageTitle pageTitle={constants.pageTitle} />
      <div className="nabi-background-white nabi-section nabi-text-center">
        <Typography className="nabi-text-mediumbold">Chat with us using the chat widget or fill out this form:</Typography>
        <div id="hubspotForm"></div>
      </div>
    </div>
  );
};

export default ContacUs;
