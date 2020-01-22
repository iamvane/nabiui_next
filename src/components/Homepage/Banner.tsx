import * as React from "react";
import Link from "next/link";

import { Button, Grid } from "@material-ui/core";

import "../../../assets/scss/Banner.scss";
import { Routes } from "../common/constants//Routes";
import { BannerComponent } from "./constants/Banner";
import ClaimDiscountBanner from "./ClaimDiscountBanner";

interface Props {
  showClaimDiscountBanner?: boolean;
}

/**
 * Homepage banner component
 */
export const Banner = (props: Props) => {
  return (
    <section id="banner" className="nabi-position-relative">
      <div className="container">
        {props.showClaimDiscountBanner ? (
          <ClaimDiscountBanner />
        ) : (
          <>
            <h1 className="nabi-text-normalbold nabi-jennasue-banner-title nabi-color-white nabi-margin-bottom-xsmall nabi-text-center nabi-text-shadow">
              {BannerComponent.text}
            </h1>
            <Grid item={true} xs={12} md={8} className="nabi-margin-center">
              <h3 className="nabi-text-semibold nabi-color-white nabi-margin-bottom-xsmall nabi-text-center nabi-text-uppercase">
                {BannerComponent.cta}
              </h3>
              <Grid container={true} spacing={1}>
                <Grid item={true} xs={12} md={6}>
                  <Link href={Routes.Registration}>
                    <a>
                      <Button color="primary" variant="contained" className="nabi-full-width">
                        {BannerComponent.findInstructorButton}
                      </Button>
                    </a>
                  </Link>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <Link href={Routes.Registration}>
                    <a>
                      <Button color="secondary" variant="contained" className="nabi-full-width">
                        {BannerComponent.startTeachingButton}
                      </Button>
                    </a>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </section>
  );
};

export default Banner;
