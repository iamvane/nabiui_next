import * as React from 'react';
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');

import {
  Grid,
  Typography
} from '@material-ui/core';

import '../../../assets/scss/Footer.scss'
import SocialMenu  from './SocialMenu';
import { FooterComponent } from './constants/Footer';
import { Routes } from './constants/Routes';

/**
 * Homepage footer component
 */
export const Footer = () => {
  return (
    <div id="footer">
      <div className="nabi-container">
        <Grid className="nabi-padding-top-xlarge nabi-padding-bottom-medium" container={true}>
          <Grid item={true} xs={12} md={3}>
            <p className="nabi-text-mediumbold nabi-font-medium">Learn More</p>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.LessonPackages}><a>Lesson Packages</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.VetInstructor}><a>How We Screen Instructors</a></Link></Typography>
          </Grid>
          <Grid item={true} xs={12} md={3}>
            <p className="nabi-text-mediumbold nabi-font-medium">Need Help?</p>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.FAQParents}><a>Parents FAQs</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.FAQInstructors}><a>Instructors FAQs</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.ContactUs}><a>Contact Us</a></Link></Typography>
          </Grid>
          <Grid item={true} xs={12} md={3}>
            <p className="nabi-text-mediumbold nabi-font-medium">About Nabi</p>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.HowItWorksParents}><a>How It Works - Parents</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.HowItWorksInstructors}><a>How It Works - Instructors</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.AboutUs}><a>About Us</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><a href="https://blog.nabimusic.com" target="_blank" rel="noreferrer">Blog</a></Typography>
          </Grid>
          <Grid item={true} xs={12} md={3}>
            <p className="nabi-text-mediumbold nabi-font-medium">Legal</p>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.TermsOfUse}><a>Terms</a></Link></Typography>
            <Typography className="nabi-cursor-pointer"><Link prefetch={false} href={Routes.PrivacyPolicy}><a>Privacy Policy</a></Link></Typography>
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
