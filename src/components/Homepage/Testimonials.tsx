import * as React from 'react';

import Link from 'next/link';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { Routes } from '../common/constants//Routes';

import '../../../assets/scss/Testimonials.scss'
import {
  title,
  testimonials,
  button,
  description,
  recognition,
  recognizedImages,
  recognizedButton
} from './constants/Testimonials';

export const Testimonials = () => {
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
          {testimonials.map((item, i)=> (
            <Grid key={i} item={true} md={4} xs={12}>
              <div className="testimonial-item nabi-background-white nabi-box-shadow nabi-text-center nabi-border-radius">
                <Typography>{item.testimonial}</Typography>
              </div>
              <Typography color="secondary" className="nabi-text-semibold">{item.name}</Typography>
              <Typography>{item.role}</Typography>
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
        <h2 className="nabi-text-normalbold nabi-jennasue-banner-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-text-center">
          {recognition}
        </h2>
        <Grid container={true} className="nabi-margin-top-xlarge nabi-margin-bottom-small">
          {
            recognizedImages.map((item) => (
              <Grid md={2} item={true} key={item} className="nabi-margin-center">
                <div className="recognized-item">
                  <img src={item} />
                </div>
              </Grid>
            ))
          }
        </Grid>
        <Grid className="nabi-margin-center nabi-margin-bottom-xlarge" item={true} xs={12} md={8}>
          <Link href={Routes.Registration}>
            <a>
              <Button fullWidth={true} className="nabi-margin-top-medium" color="secondary" variant="contained">
                {recognizedButton}
              </Button>
            </a>
          </Link>
        </Grid>
      </div>
    </Grid>
  );
}

export default Testimonials;
