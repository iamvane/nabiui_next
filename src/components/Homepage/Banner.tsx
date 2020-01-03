import * as React from 'react';
import { Role } from '../Auth/Registration/constants';

import {
  Button,
  Grid,
  TextField
} from '@material-ui/core';

import '../../../assets/scss/Banner.scss'
import { Routes } from '../common/constants//Routes';
import { BannerComponent } from './constants/Banner';

/**
 * Homepage banner component
 */
export const Banner = () => {
  return (
    <section id="banner" className="nabi-position-relative">
      <div className="container">
        <h1 className="nabi-text-normalbold nabi-jennasue-banner-title nabi-color-white nabi-margin-bottom-xsmall nabi-text-center nabi-text-shadow">
          {BannerComponent.text}
        </h1>
        <Grid item={true} xs={12} md={8} className="nabi-margin-center">
          <h3 className="nabi-text-semibold nabi-color-white nabi-margin-bottom-xsmall nabi-text-center nabi-text-uppercase">
            {BannerComponent.cta}
          </h3>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12} md={7}>
            <TextField
              fullWidth={true}
              // name={email}
              // onChange={props.handleChange}
              placeholder="Email address"
            />
            </Grid>
            <Grid item={true} xs={12} md={5}>
              <Button color="primary" variant="contained" className="">{BannerComponent.buttonText}</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default Banner;
