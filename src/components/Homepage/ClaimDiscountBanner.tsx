import React from "react";

import { Typography, Button, Avatar, Grid } from "@material-ui/core";

const ClaimDiscountBanner = () => {
  return (
    <div className="nabi-section-wide nabi-background-white nabi-text-center">
      <h1 className="nabi-color-nabi">
        Join Nabi Music and get 20% off your first lesson package
      </h1>
      <Typography>
        Nabi Music provides a well-rounded music learning experience
      </Typography>
      <Typography className="nabi-margin-bottom-small">
        Connect with qualified instructors nearby and get started
      </Typography>
      <Button
        color="primary"
        className="nabi-text-uppercase nabi-margin-top-small"
        variant="contained"
        type="submit"
      >
        CLAIM YOUR DISCOUNT
      </Button>
      <Typography className="nabi-margin-top-xsmall">
        Available for new users only.{" "}
        <span className="nabi-color-nabi">Terms apply</span>
      </Typography>
      <Grid
        xs={12}
        md={3}
        container
        className="nabi-display-flex nabi-margin-center nabi-margin-top-small"
      >
        <Grid xs={12} md={3}>
          <Avatar
            alt="Remy Sharp"
            src="http://www.venmond.com/demo/vendroid/img/avatar/big.jpg"
            className="avatar nabi-margin-right-xsmall"
          />
        </Grid>
        <Grid xs={12} md={9} className="nabi-align-self-center">
          <Typography>
            Your invitation from Mariana expire in 30 days.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ClaimDiscountBanner;
