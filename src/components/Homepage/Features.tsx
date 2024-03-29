import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';

import { Routes } from '../common/constants//Routes';
import {
  title,
  features,
  button,
  description
} from './constants/Features';

export const Features = () => {
  return (
    <Grid>
      <div className="nabi-container">
        <h2 className="nabi-text-normalbold nabi-jennasue-banner-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-text-center">
          {title}
        </h2>
        <Typography
          color="primary"
          className="nabi-text-semibold nabi-color-nabi nabi-margin-bottom-xsmall nabi-text-center"
        >
        {description}
        </Typography>
        <Grid container={true} spacing={2} className="nabi-margin-top-medium nabi-margin-bottom-medium">
          {features.map((item, i) => (
            <Grid key={i} item={true} md={4} xs={12}>
              <div className="feature-item nabi-background-white nabi-box-shadow nabi-text-center nabi-border-radius">
                <img data-src={item.image} alt={item.alt} className="lazyload" />
                <Typography className="nabi-text-semibold">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid className="nabi-margin-center nabi-margin-bottom-xlarge" item={true} xs={12} md={8}>
          <Link href={Routes.Registration}>
            <a>
              <Button fullWidth={true} className="nabi-margin-top-xsmall" color="primary" variant="contained">
                {button}
              </Button>
            </a>
          </Link>
        </Grid>
      </div>
      <img
        className="nabi-full-width lazyload"
        data-src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-music-violin-lessons-piano-guitar-near-me-drums-new-york-massachusetts.jpg"
        alt="violin-lessons-boston"
      />
    </Grid>
  );
}

export default Features;
