import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';

import PageTitle from './PageTitle';
import * as constants from './constants/ContactUs';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import SectionTitle from '../common/SectionTitle';
import { Routes } from '../common/constants/Routes';
import { Header } from '../Header/Header';
import { Footer } from "../common/Footer";

interface Props { }

export const ContactUs: React.StatelessComponent<Props> = (props: Props) => {
  const [hbspt, setHbspt] = React.useState(typeof window !== 'undefined' && (window as any)['hbspt']);

  React.useEffect(() => {
    if (!hbspt) {
      setHubsport();
      return;
    }

    hbspt.forms.create({
      portalId: '7039981',
      formId: '235c5d24-8f69-4bc7-8752-a083ae1a527a',
      target: '#hubspotFormContactUs'
    });
  }, [hbspt]);

  const setHubsport = () => {
    const hs = typeof window !== 'undefined' && (window as any)['hbspt'];
    setHbspt(hs);
  }

  return (
    <div>
      <Head>
        <title>{pageTitlesAndDescriptions.contactUs.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.contactUs.description}></meta>
        <script type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
      </Head>
      <Header />
      <div className="nabi-container nabi-margin-bottom-medium">
        <PageTitle pageTitle={constants.pageTitle} />
        <div className="nabi-background-white nabi-section">
          <p className="nabi-jennasue-title nabi-margin-bottom-small nabi-margin-top-xsmall nabi-text-center nabi-color-nabi">{constants.titleText}</p>
          <SectionTitle text={constants.sectionTitle} />
          <p className="nabi-text-uppercase nabi-text-mediumbold">{constants.forParents}</p>
          <Link href={Routes.FAQParents}><a>{constants.faqs}</a></Link>
          <br />
          <Link href={Routes.HowItWorksParents}><a>{constants.howItWorks}</a></Link>
          <br />
          <p className="nabi-text-uppercase nabi-text-mediumbold">{constants.forInstructors}</p>
          <Link href={Routes.FAQInstructors}><a>{constants.faqs}</a></Link>
          <br />
          <Link href={Routes.HowItWorksInstructors}><a>{constants.howItWorks}</a></Link>
          <br />
          <Typography className="nabi-text-mediumbold nabi-text-center nabi-margin-top-medium">{constants.fromDescription}</Typography>
          <div id="hubspotFormContactUs"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
