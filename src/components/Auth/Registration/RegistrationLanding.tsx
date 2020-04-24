import * as React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

import {
  Button,
  Typography
} from '@material-ui/core';

// import { page } from "../../../utils/analytics";
import { Routes } from '../../common/constants/Routes';
import { RegistrationLandingComponent } from './constants';

interface Props {}

/**
 * Contains the registration form fields
 */
const RegistrationLanding: React.StatelessComponent<Props> = props => {
  const [title, setTitle] = React.useState('Music Lessons');

  const { query } = useRouter();

  React.useEffect(() => {
    const utmTerm = query.utm_term;

    if (utmTerm) {
      setTitle(String(utmTerm));
    }
  }, []);

  return (
    <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium">
      <div className="nabi-background-white nabi-section nabi-text-center">
        <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-margin-top-zero">
          {RegistrationLandingComponent.thankYou}
        </p>
        <Typography className="nabi-margin-xsmall">
          {RegistrationLandingComponent.interestText}
        </Typography>
        <p className="nabi-color-nabi nabi-text-extrabold nabi-font-large nabi-margin-xsmall">
          {title}
        </p>
        <Typography className="nabi-margin-top-large nabi-margin-bottom-small">
          {RegistrationLandingComponent.registerText}
          </Typography>
        <Link href={Routes.Registration}>
          <Button
            color="primary"
            variant="contained"
            className="nabi-responsive-button nabi-text-uppercase"
          >
            {RegistrationLandingComponent.registerButton}
          </Button>
        </Link>

        <Typography className="nabi-margin-top-large nabi-margin-bottom-small">
          {RegistrationLandingComponent.notConvincedText}
        </Typography>
        <a
          href="https://calendly.com/nabimusic/intro-call-with-nabimusic"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            variant="contained"
            className="nabi-responsive-button nabi-text-uppercase"
          >
            {RegistrationLandingComponent.scheduleCallButton}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default RegistrationLanding;
