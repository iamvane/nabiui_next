import React from "react"
import Head from 'next/head';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

//import '../../../assets/scss/AboutUs.scss';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import * as constants from './constants';

const teammate = (teamate : constants.Teammate) => (
  <div>
    <Head>
      <title>{pageTitlesAndDescriptions.aboutUs.title}</title>
      <meta name="description" content={pageTitlesAndDescriptions.aboutUs.description}></meta>
    </Head>
    <Avatar src={teamate.image} className="nabi-margin-center nabi-margin-top-medium big-avatar" />
    <p className="nabi-text-semibold nabi-color-nabi nabi-margin-bottom-xsmall">{teamate.name}</p>
    <Typography className="nabi-text-semibold nabi-margin-top-xsmall">{teamate.role}</Typography>
    {teamate.linkedIn &&
      <IconButton
        color="primary"
        href={teamate.linkedIn}
        target="_blank"
        rel="noreferrer"
      >
        <img
        src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/linkedin.png"
        className="nabi-custom-button-icon"
        alt="linkedin-icon"
        />
      </IconButton>
    }
    {teamate.email &&
      <a href={`mailto:${teamate.email}`}>
        <IconButton
          color="primary"
          className="nabi-margin-left-xsmall"
        >
          <img
          src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/envelope-white.png"
          className="nabi-custom-button-icon"
          alt="email-icon"
          />
        </IconButton>
      </a>
    }
    <Typography className="nabi-margin-top-xsmall">{teamate.bio}</Typography>
  </div>
);

export const AboutUs = () => {
  return (
    <React.Fragment>
      <div className="about-banner nabi-color-white nabi-background-nabi nabi-text-center nabi-padding-top-medium">
        <p className="nabi-jennasue-title nabi-margin-bottom-xsmall nabi-margin-top-xsmall">{constants.titleAbout}</p>
        <Grid xs={12} md={6} className="nabi-margin-center"><p className="nabi-font-large">{constants.ourMission}</p></Grid>
      </div>
      <div className="nabi-container nabi-text-center">
        <div className="nabi-background-white nabi-section nabi-margin-top-large nabi-border-radius">
          <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-margin-top-xsmall">{constants.titleWhatWeDo}</p>
          <p className="nabi-font-medium">{constants.whatWeDo}</p>
        </div>
      </div>
      <div className="nabi-container nabi-text-center">
        <div className="nabi-background-white nabi-section nabi-margin-top-small nabi-margin-bottom-large nabi-border-radius">
          <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-margin-top-xsmall">{constants.titleTeam}</p>
          {
            constants.team.map((item: constants.Teammate, key) => {
              return teammate(item);
            })
          }
        </div>
      </div>
    </React.Fragment>
 )
}
