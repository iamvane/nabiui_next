
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
    <div className="nabi-background-nabi nabi-color-white nabi-padding-bottom-medium">
      <Grid
        className="nabi-container nabi-padding-top-medium nabi-padding-bottom-small nabi-text-center"
        container={true}
      >
        <Grid item={true} xs={12} md={1} />
        <Grid item={true} xs={12} md={6} className="become-an-instructor-cta nabi-margin-bottom-xsmall nabi-color-white">
          <h2 className="nabi-margin-top-zero nabi-text-normalbold nabi-jennasue-banner-title nabi-color-white nabi-margin-bottom-xsmall nabi-text-center">
            {constants.title}
          </h2>
          <Typography className="nabi-text-uppercase nabi-color-white nabi-text-semibold nabi-margin-bottom-xsmall">
            {constants.becomeATeacher}
          </Typography>
          <Typography className="nabi-color-white nabi-margin-bottom-xsmall">
            {constants.description}
          </Typography>
          <Link href={Routes.Registration}>
            <a>
              <Button className="nabi-margin-top-xsmall nabi-margin-bottom-small" color="secondary" variant="contained">
                {constants.button}
              </Button>
            </a>
          </Link>
        </Grid>
        <Grid item={true} xs={12} md={3} className="nabi-margin-bottom-xsmall nabi-padding-left-small-md nabi-text-center nabi-text-left-md nabi-color-white">
          <img src={MoneyIllustration} className="become-an-instructor-icon" alt="become-an-instructor" />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeATeacher;
