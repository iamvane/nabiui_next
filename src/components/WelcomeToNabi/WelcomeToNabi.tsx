import * as React from 'react';
import Link from 'next/link';
import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';

import { getCookie } from "../../utils/cookies";
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';
import '../../../assets/scss/WelcomeToNabi.scss';

import { WelcomeToNabiComponent } from './constants';

export const WelcomeToNabi = () => {
  const image = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/3+reasons+you+should+take+a+trial+lesson.PNG';
  const role = getCookie('role');

  return (
    <div className="welcome-to-nabi-wrapper nabi-margin-bottom-medium">
      <Grid
        item={true}
        xs={12}
        md={8} className="welcome-to-nabi-content nabi-section nabi-margin-center nabi-text-center"
      >
        <p className="nabi-color-nabi nabi-jennasue-title nabi-margin-bottom-small nabi-margin-top-xsmall">
          {WelcomeToNabiComponent.heading}
        </p>
        <Typography className="nabi-text-mediumbold nabi-margin-bottom-large">
          <span className="nabi-color-nabi">{WelcomeToNabiComponent.welcomeText}</span>
        </Typography>
        <img src={image} className="welcome-img" />
        <div>
          <Link href={role === Role.instructor ? Routes.Dashboard : Routes.Dashboard}>
            <Button color="primary" variant="contained" className="nabi-margin-top-small">
              {WelcomeToNabiComponent.buttonText}
            </Button>
          </Link>
        </div>
      </Grid>
    </div>
  )
}

export default WelcomeToNabi;
