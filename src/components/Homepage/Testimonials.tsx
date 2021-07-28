import * as React from 'react';

import Link from 'next/link';
import {
  Typography,
} from '@material-ui/core';
import { Button, Grid } from "nabi_web_components";
import { Routes } from '../common/constants//Routes';

import '../../../assets/scss/Testimonials.module.scss'
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
    <Grid className="nabi-background-color">
      <div className="nabi-container">
      <Grid item={true} xs={12} md={6} className="nabi-margin-center nabi-text-center">
          <h2>
          {title}
          </h2>
          <p>
          {description}
          </p>
        </Grid>
        <Grid container={true} spacing={2} className="nabi-margin-top-medium nabi-margin-bottom-medium">
          {testimonials.map((item, i) => (
            <Grid key={i} item={true} md={4} xs={12}>
              <div className="testimonial-item nabi-background-white nabi-box-shadow nabi-text-center nabi-border-radius">
                <Typography>{item.testimonial}</Typography>
              </div>
              <Typography color="secondary" className="nabi-text-semibold">{item.name}</Typography>
              <Typography>{item.role}</Typography>
            </Grid>
          ))}
        </Grid>
        {/* <Grid className="nabi-margin-center nabi-margin-bottom-xlarge" item={true} xs={12} md={8}>
          <Link href={Routes.Registration}>
            <a>
              <Button fullWidth={true} className="nabi-margin-top-xsmall" color="primary" variant="contained">
                {button}
              </Button>
            </a>
          </Link>
        </Grid> */}
        <h2 className="nabi-text-center">
          {recognition}
        </h2>
        <Grid container={true} className="nabi-margin-top-xlarge nabi-margin-bottom-small">
          {
            recognizedImages.map((item, i) => (
              <Grid md={2} item={true} key={i} className="nabi-margin-center">
                <div className="recognized-item">
                  <img data-src={item.src} alt={item.alt} className="lazyload" />
                </div>
              </Grid>
            ))
          }
        </Grid>
        <Grid className="nabi-margin-center nabi-text-center nabi-margin-bottom-xlarge" item={true} xs={12} md={8}>
          <Link href={Routes.RegistrationParentStudent}>
            <a>
              <Button className="nabi-margin-top-medium" color="primary" variant="contained">
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
