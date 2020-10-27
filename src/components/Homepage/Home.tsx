import * as React from "react";
import Head from 'next/head';
import Link from "next/link";

import { Avatar, Button } from "@material-ui/core";
import { Grid } from "nabi_web_components";

import dynamic from "next/dynamic";
const Star = dynamic(() => import('@material-ui/icons/Star'), {
  ssr: false,
});

import "../../../assets/scss/Home.scss";
import { UserType } from "../../redux/models/UserModel";
import { Routes } from "../common/constants/Routes";
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import Testimonials from "./Testimonials";
import PrivateRoute from '../Auth/PrivateRoutes';
import { HomeComponent } from './constants/Home';
import { Header } from "../Header/Header";
import { Banner } from '../common/Banner';
import { Footer } from "../common/Footer";

/**
 * Home component
 */
export interface State {
  performRedirect: boolean;
}

interface StateProps {
  user: UserType;
  token: string;
}

export interface Props extends StateProps { } // RouteComponentProps<{}>,

export const Home = (props: Props) => {
  const docTitle = pageTitlesAndDescriptions.homepage.title;
  const docDescription = pageTitlesAndDescriptions.homepage.description;

  const displayRatingStars = (reviewsNumber: number) => {
    let ratingStars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < reviewsNumber) {
        ratingStars.push(<Star key={i} className="featured-instructor-rating" />);
      } else {
        ratingStars.push(<Star color="secondary" className="featured-instructor-rating" key={i} />);
      }
    }
    return ratingStars;
  };

  return (
    <div>
      <div>
        <Head>
          <title>{docTitle}</title>
          <meta name="description" content={docDescription}></meta>
        </Head>
      </div>
      <Header
        headerMenuItems={HomeComponent.menuItems}
        drawerMenuItems={HomeComponent.menuItems}
      />
      <Banner
        pageName="home"
        cta={HomeComponent.cta}
        heading={HomeComponent.valueHeading}
        disclaimer={HomeComponent.noCard}
      />
      <div className="nabi-background-white">
        <div className="nabi-container nabi-padding-top-small nabi-padding-bottom-large">
          <Grid item={true} lg={6} xs={12} md={6} className="nabi-margin-center nabi-text-center">
            <h2>
              {HomeComponent.oneOnOne}
            </h2>
            <p>
              {HomeComponent.progress}
            </p>
          </Grid>
          <Grid container={true} className="nabi-margin-top-xlarge nabi-margin-bottom-small">
            {
              HomeComponent.featuredInstructors.map((item, i) => (
                <Grid md={3} xs={12} lg={3} item={true} key={i}>
                  <div className="featured-instructor-wrapper nabi-margin-center">
                    <Grid container={true} className="nabi-text-center">
                      <Grid item={true} xs={12}>
                        <Avatar alt={item.name} src={item.avatar} className="featured-avatar nabi-margin-center" />
                        <span className="nabi-text-mediumbold nabi-display-block">{item.name}</span>
                        <div>{item.experience} YRS EXP | {item.age} YRS OLD</div>
                        {displayRatingStars(item.rating)}<span className="nabi-color-orange featured-reviews-number">({item.numberOfReviews})</span>
                        <div className="featured-insrtuments">
                          {item.instruments.map((instrument, i) =>
                            <span key={i} className="featured-instrument">{instrument}</span>
                          )}
                        </div>
                      </Grid>
                      <Grid container={true} className="stats-wrapper">
                        <Grid item={true} xs={4} lg={4} md={4}>
                          <p className="stats-label nabi-text-mediumbold">Rate</p>
                        </Grid>
                        <Grid item={true} xs={4} lg={4} md={4}>
                          <p className="stats-label nabi-text-mediumbold">Lessons Taught</p>
                        </Grid>
                        <Grid item={true} xs={4} lg={4} md={4}>
                          <p className="stats-label nabi-text-mediumbold">Verified</p>
                        </Grid>
                        <Grid item={true} xs={4} lg={4} md={4}>
                          <span className="nabi-color-nabi nabi-text-mediumbold">${item.rate}</span>
                        </Grid>
                        <Grid item={true} xs={4} lg={4} md={4}>
                          <span className="nabi-color-nabi nabi-text-mediumbold">{item.lessonsTaught}</span>
                        </Grid>
                        <Grid item={true} xs={4} lg={4} md={4}>
                          <span className="nabi-color-nabi nabi-text-mediumbold">Yes</span>
                        </Grid>
                      </Grid>
                      <Link href={Routes.RegistrationParentStudent} prefetch={false}>
                        <a className="nabi-full-width">
                          <Button
                            color="primary"
                            variant="contained"
                            className="nabi-margin-top-medium featured-button"
                            fullWidth={true}
                          >
                            Book Trial
                          </Button>
                        </a>
                      </Link>
                    </Grid>
                  </div>
                </Grid>
              ))
            }
          </Grid>
        </div>
      </div>

      <Testimonials />
      <Footer />
    </div>
  );
};

export default PrivateRoute(Home, 'Public');
