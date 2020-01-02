
import * as React from 'react';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Routes } from '../common/constants/Routes';
import { BecomeATeacher as constants } from './constants/BecomeATeacher';

const BecomeATeacher = () => {
  const MoneyIllustration = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/dollar-homepage.png';
  return (
    <div className="nabi-background-nabi nabi-color-white">
      <Grid
        className="nabi-container nabi-padding-top-medium nabi-padding-bottom-medium nabi-text-center"
        container={true}
      >
        <Grid item={true} xs={12} md={5} className="nabi-margin-bottom-xsmall nabi-margin-center nabi-color-white">
          <img src={MoneyIllustration} className="become-an-instructor-icon" alt="become-an-instructor" />
          <Typography className="nabi-text-uppercase nabi-color-white nabi-text-semibold nabi-margin-bottom-xsmall">
            {constants.becomeATeacher}
          </Typography>
          <Typography className="nabi-color-white nabi-margin-bottom-xsmall">
            {constants.description}
          </Typography>
          <Link href={Routes.RegistrationInstructor}>
            <Button className="nabi-margin-top-xsmall" color="secondary" variant="contained">
              {constants.button}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeATeacher;
