import React from "react";

import Router from "next/router";
import { Routes } from "../common/constants/Routes";
import Link from "next/link";

import { Typography, Button, Avatar, Grid } from "@material-ui/core";
import { ClaimDiscountBannerComponent } from "./constants/ClaimDiscountBanner";
import { ReferralInfo } from "../Referral/models";

interface Props {
  referralInfo: ReferralInfo;
}

const ClaimDiscountBanner = (props: Props) => {
  return (
    <div className="nabi-section-wide nabi-background-white nabi-text-center">
      <h1 className="nabi-color-nabi">
        {ClaimDiscountBannerComponent.joinNabiMusic}
      </h1>
      <Typography>{ClaimDiscountBannerComponent.nabiMusicProvides}</Typography>
      <Typography className="nabi-margin-bottom-small">
        {ClaimDiscountBannerComponent.connectWith}
      </Typography>
      <Button
        color="primary"
        className="nabi-text-uppercase nabi-margin-top-small"
        variant="contained"
        onClick={() => Router.push(Routes.Registration)}
      >
        {ClaimDiscountBannerComponent.claimYourDiscount}
      </Button>
      <Typography className="nabi-margin-top-xsmall">
        {ClaimDiscountBannerComponent.availableForNewUsersOnly}{" "}
        <Link href={Routes.TermsOfUse}>
          <span className="nabi-color-nabi nabi-cursor-pointer">
            {ClaimDiscountBannerComponent.termsApply}
          </span>
        </Link>
      </Typography>
      <Grid
        xs={12}
        md={3}
        container
        className="nabi-display-flex nabi-margin-center nabi-margin-top-small"
      >
        {props.referralInfo && props.referralInfo.avatar ? (
          <Grid item xs={12} md={3}>
            <Avatar
              alt="referrer-user"
              src={props.referralInfo.avatar}
              className="avatar nabi-margin-center"
            />
          </Grid>
        ) : (
          ""
        )}

        <Grid item xs={12} md={9} className="nabi-align-self-center">
          <Typography>
            {ClaimDiscountBannerComponent.yourInviteFrom.replace(
              ClaimDiscountBannerComponent.userPlaceHolder,
              props.referralInfo.displayName
            )}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ClaimDiscountBanner;
