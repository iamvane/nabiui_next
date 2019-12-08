import * as React from 'react';
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');

import Typography from '@material-ui/core/Typography';

import { SocialMenu } from '../social-menu';

import { FooterComponent } from './constants';
import { Routes } from '../../constants/Routes';

/**
 * Homepage footer component
 */
export const Footer = () => {
  return (
    <div className="nabi-margin-top-xlarge nabi-text-center nabi-margin-bottom-medium">
      <div className="nabi-margin-bottom-xsmall">
        <SocialMenu />
      </div>
      <Typography
        variant="body2"
        className="nabi-text-decoration-underline-hover nabi-display-inline-block nabi-padding-right-small"
      >
        <Link href={Routes.TermsOfUse}>
          {FooterComponent.TermsOfUse}
        </Link>
      </Typography>
      <Typography
        variant="body2"
        className="nabi-text-decoration-underline-hover nabi-display-inline-block"
      >
        <Link href={Routes.ContactUs}>
          {FooterComponent.ContactUs}
        </Link>
      </Typography>
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
  );
};
