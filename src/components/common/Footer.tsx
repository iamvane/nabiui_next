import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const reactStringReplace = require('react-string-replace');

import {
  Grid,
  Typography,
} from '@material-ui/core';

import '../../../assets/scss/Footer.scss'
import SocialMenu from './SocialMenu';
import { FooterComponent } from './constants/Footer';
import { Routes } from './constants/Routes';
import { getCookie } from '../../utils/cookies';

import RegistrationParentStudentOptions from "../Auth/Registration/RegistrationParentStudentOptions"

/**
 * Homepage footer component
 */
export const Footer = () => {
  const isLoggedIn = getCookie('token');
  const router = useRouter();
  return (
    <div id="footer">
      <div className="nabi-container">
        {(!isLoggedIn &&
          !router.pathname.includes("registration") &&
          !router.pathname.includes("student-profile-builder") &&
          !router.pathname.includes("free-lesson")) &&
          <>
            <RegistrationParentStudentOptions inFooter={true}>
              <p className="nabi-jennasue-title nabi-margin-top-medium nabi-text-center nabi-color-nabi">{FooterComponent.fromDescription}</p>
            </RegistrationParentStudentOptions>
          </>
        }
        <Grid className="nabi-padding-top-xlarge nabi-padding-bottom-medium" container={true}>
          <Grid item={true} xs={12} md={3}>
            <p className="nabi-text-mediumbold nabi-font-medium">{FooterComponent.learnMoreSection}</p>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.LessonPackages}><a>{FooterComponent.lessonPackages}</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.VetInstructor}><a>{FooterComponent.vettingProcess}</a></Link></Typography>
          </Grid>
          <Grid item={true} xs={12} md={3}>
            <p className="nabi-text-mediumbold nabi-font-medium">{FooterComponent.helpSection}</p>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.FAQParents}><a>{FooterComponent.faqsParents}</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.FAQInstructors}><a>{FooterComponent.faqsInstructors}</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.ContactUs}><a>{FooterComponent.ContactUs}</a></Link></Typography>
          </Grid>
          <Grid item={true} xs={12} md={3}>
            <p className="nabi-text-mediumbold nabi-font-medium">{FooterComponent.aboutSection}</p>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.HowItWorksParents}><a>{FooterComponent.howItWorksParents}</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.HowItWorksInstructors}><a>{FooterComponent.howItWorksInstructors}</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.AboutUs}><a>{FooterComponent.aboutUs}</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><a href="https://blog.nabimusic.com" target="_blank" rel="noreferrer">{FooterComponent.blog}</a></Typography>
          </Grid>
          <Grid item={true} xs={12} md={3}>
            <p className="nabi-text-mediumbold nabi-font-medium">{FooterComponent.legalSection}</p>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.TermsOfUse}><a>{FooterComponent.termsOfUse}</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.PrivacyPolicy}><a>{FooterComponent.privacyPolicy}</a></Link></Typography>
          </Grid>
        </Grid>
        <div className="nabi-margin-bottom-xsmall nabi-text-center">
          <SocialMenu />
        </div>
        <Typography className="nabi-margin-top-medium nabi-text-center">
          {reactStringReplace(
            FooterComponent.CopyrightText,
            FooterComponent.NabiMusicPlaceholder,
            (i: number) => (
              <span key={i} className="nabi-text-uppercase">{FooterComponent.NabiMusicCenter}</span>
            )
          )}
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
