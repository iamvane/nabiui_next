import * as React from "react";
import Link from "next/link";

import { Button, Grid } from "nabi_web_components";

import "../../../assets/scss/Banner.module.scss";
import { Routes } from "./constants/Routes";

interface Props {
  pageName: string;
  heading: string;
  cta: string;
  disclaimer?: string;
}

/**
 * Banner component
 */
export const Banner = (props: Props) => {
  return (
    <section id="banner-new" className={`nabi-position-relative ${props.pageName}`}>
      <div className="nabi-container">
        <Grid container={true} spacing={1}>
          <Grid item={true} xs={8} md={6}>
            <h2 className="banner-heading">{props.heading}</h2>
            <Link href={Routes.RegistrationParentStudent}>
              <a>
                <Button
                  color="primary"
                  variant="contained"
                >
                  {props.cta}
                </Button>
              </a>
            </Link>
            {props.disclaimer && <p>{props.disclaimer}</p>}
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default Banner;
