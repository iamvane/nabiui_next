import * as React from 'react';

import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';

import '../../../assets/scss/Testimonials.scss'
import {
  title,
  testimonials,
  button,
  description
} from './constants/Testimonials';

export const Testimonials = () => {
  return (
    <Grid>
      <div className="nabi-container">
        <h1 className="nabi-text-normalbold nabi-jennasue-banner-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-text-center">
          {title}
        </h1>
        <Typography
          color="primary"
          className="nabi-text-semibold nabi-color-nabi nabi-margin-bottom-xsmall nabi-text-center"
        >
        {description}
        </Typography>
        <Grid container={true} spacing={2} className="nabi-margin-top-medium nabi-margin-bottom-medium">
          {testimonials.map(item => (
            <Grid item={true} md={4} xs={12}>
              <div className="testimonial-item nabi-background-white nabi-box-shadow nabi-text-center nabi-border-radius">
                <Typography>{item.testimonial}</Typography>
              </div>
              <Typography color="secondary" className="nabi-text-semibold">{item.name}</Typography>
              <Typography>{item.role}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid className="nabi-margin-center nabi-margin-bottom-xlarge" item={true} xs={12} md={8}>
          <Button fullWidth={true} className="nabi-margin-top-xsmall" color="primary" variant="contained">
            {button}
          </Button>
        </Grid>
      </div>
    </Grid>
  );
}

export default Testimonials;
