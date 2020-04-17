import * as React from 'react';
import Router from "next/router";
import Head from 'next/head';

import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';

import { getCookie } from '../../utils/cookies';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import { Routes } from '../common/constants/Routes';

import '../../../assets/scss/FreeLandingPage.scss';

interface Props {}

const FreeLessonLanding: React.StatelessComponent<Props> = props => {
  const [hbspt, setHbspt] = React.useState(typeof window !== 'undefined' && (window as any)['hbspt']);
  const isLoggedIn = getCookie('token');
  const bannerImage = '../../'
  React.useEffect(() => {
    if (!isLoggedIn) {
      if (!hbspt) {
        setHubSpot();
        return;
      }

      hbspt.forms.create({
        portalId: '7039981',
        formId: '06d99cb7-83fc-4081-9979-23fb33ce7c44',
        target: '#hubspotFreeMusicLesson'
      });
    } else {
      Router.push(Routes.Dashboard)
    }
  }, [hbspt]);

  const setHubSpot = () => {
    const hs = typeof window !== 'undefined' && (window as any)['hbspt'];
    setHbspt(hs);
  }

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitlesAndDescriptions.studentProfileBuilder.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.studentProfileBuilder.description}></meta>
      </Head>
      <div>
        <div className="header-wrapper">
          <div className="nabi-landing-image-wrapper">
            <img
              data-src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/landing-page-image.png"
              className="nabi-full-width lazyload"
              alt="become-an-instructor"
            />
          </div>
          <div className="nabi-container nabi-margin-bottom-small banner-text-wrapper">
            <div>
              <Typography className="nabi-margin-top-small">With <strong>Nabi Music</strong>’s music learning platform, 
                students can connect with qualified music
                teachers, schedule lessons, track progress, and 
                set practice sessions. <strong>Nabi Music</strong> makes music 
                education easily accessible, fun and engaging.
              </Typography>
              <a href="#hubspotFreeMusicLesson">
                <Button variant="contained" color="primary" className="nabi-margin-top-small nabi-margin-bottom-small">
                  Get Free Lesson
                </Button>
              </a>
            </div>
          </div>
        </div>
        <Grid container={true} spacing={3} className="nabi-background-white nabi-padding-small">
          <Grid item={true} xs={12} md={4}>
            <div className="nabi-background-nabi nabi-margin-bottom-xsmall nabi-padding-small">
              <Typography className="nabi-text-uppercase nabi-color-white nabi-text-semibold nabi-landing-font-large-md nabi-margin-bottom-small">
                Find Instructor
              </Typography>
              <Typography className="nabi-color-white nabi-landing-font-large-md">
                Meet qualified and trustworthy music instructors.
              </Typography>
            </div>
          </Grid>
          <Grid item={true} xs={12} md={4}>
          <div className="nabi-background-nabi nabi-margin-bottom-xsmall nabi-padding-small">
            <Typography className="nabi-text-uppercase nabi-color-white nabi-text-semibold nabi-landing-font-large-md nabi-margin-bottom-small">
              Start Learning
            </Typography>
            <Typography className="nabi-color-white nabi-landing-font-large-md">
              Take music lessons online, at home or in studio.
            </Typography>
            </div>
          </Grid>
          <Grid item={true} xs={12} md={4}>
          <div className="nabi-background-nabi nabi-margin-bottom-xsmall nabi-padding-small">
            <Typography className="nabi-text-uppercase nabi-color-white nabi-text-semibold nabi-landing-font-large-md nabi-margin-bottom-small">
              Grow Musically
            </Typography>
            <Typography className="nabi-color-white nabi-landing-font-large-md">
              Track progress and improve your music practice.
            </Typography>
            </div>
          </Grid>
        </Grid>
        <div className="nabi-container">
          <div className="nabi-background-white nabi-section nabi-margin-bottom-large nabi-margin-top-large nabi-text-center">
            <h1 className="nabi-color-nabi">GET FREE MUSIC LESSON</h1>
            <div id="hubspotFreeMusicLesson"></div>
          </div>
          </div>
      </div>
    </React.Fragment>
  );
};

export default FreeLessonLanding;
