import * as React from 'react';
import Link from 'next/link';

import { Grid } from 'nabi_web_components';

import '../../../assets/scss/Footer.scss'
import SocialMenu from './SocialMenu';
import { FooterComponent } from './constants/Footer';
import { Routes } from './constants/Routes';

/**
 * Footer component
 */

interface Props {
  bottomPlacement?: Boolean;
}
export const Footer = (props: Props) => {
  return (
    <div className={`nabi-container nabi-background-color ${props.bottomPlacement ? 'bottom-footer' : ''}`}>
      <Grid container={true} className="nabi-padding-bottom-small">
        <Grid item={true} xs={12} className="nabi-text-center nabi-text-left-md">
          {FooterComponent.copyrights}
        </Grid>
        <Grid item={true} xs={12} md={6} className="nabi-text-center nabi-text-left-md nabi-margin-top-xsmall">
          <Link href={Routes.TermsOfUse} prefetch={false}>
            <a className="nabi-text-mediumbold nabi-margin-right-small">
              {FooterComponent.terms}
            </a>
          </Link>
          <Link href={Routes.ContactUs} prefetch={false}>
            <a className="nabi-text-mediumbold">
              {FooterComponent.contact}
            </a>
          </Link>
        </Grid>
        <Grid item={true} xs={12} md={6} className="nabi-text-center nabi-text-right-md nabi-margin-top-small">
          <SocialMenu />
        </Grid>
      </Grid>
    </div>

  );
};

export default Footer;
