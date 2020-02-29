
import * as React from 'react';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../../../assets/scss/FreeLesson.scss'

import {
  title,
  description,
  button
} from './constants/FreeLesson';

import { Routes } from '../common/constants/Routes';

const FreeLesson = () => {
  return (
    <div className="nabi-background-orange nabi-color-white">
      <Grid
        className="nabi-container nabi-padding-top-medium nabi-padding-bottom-medium nabi-text-center"
        container={true}
        spacing={4}
      >
        <Grid item={true} xs={12} md={4} className="nabi-margin-bottom-xsmall nabi-text-right-md nabi-color-white">
          <img
            data-src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/free-trial.jpeg"
            className="free-trial-icon lazyload"
            alt="become-an-instructor"
          />
        </Grid>
        <Grid item={true} xs={12} md={5} className="nabi-margin-bottom-xsmall nabi-color-white nabi-text-left-md">
          <h2 className="nabi-margin-top-zero nabi-margin-top-medium-md nabi-text-normalbold nabi-color-white nabi-margin-bottom-xsmall nabi-text-center nabi-font-large">
            {title}
          </h2>
          <p className="nabi-color-white nabi-margin-bottom-xsmall nabi-font-medium">
            {description}
          </p>
          <Link href={Routes.Registration}>
            <a>
              <Button className="nabi-margin-top-xsmall" color="primary" variant="contained">
                {button}
              </Button>
            </a>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default FreeLesson;
