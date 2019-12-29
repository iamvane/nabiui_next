import * as React from 'react';
import {
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';

import { PlaceForLessonsComponent } from './constants';
import { PlaceForLessonsType } from './model';

interface Props extends PlaceForLessonsType { }

const PlaceForLessons: React.StatelessComponent<Props> = props => {
  const HomeIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/student-home-icon.svg';
  const StudioIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/instructor-studio-icon.svg';
  const OnlineIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/online-icon.svg';

  const { home, studio, online, studioAddress } = props;
  const noPlaceSelected = !home && !studio && !online;
  return (
    <div>
      {
        home && (
          <Grid container={true} className="nabi-align-vertical-items nabi-margin-top-xsmall">
            <Grid item={true} xs={2} sm={1} md={3}>
              <IconButton
                color={home ? 'primary' : 'secondary'}
                className="nabi-margin-right-xsmall"
              >
                <img
                  src={HomeIcon}
                  className="nabi-custom-button-icon"
                  alt="home"
                />
              </IconButton>
            </Grid>
            <Grid item={true} xs={10} sm={11} md={9}>
              <Typography className={`nabi-text-uppercase ${home ? 'nabi-color-nabi' : 'nabi-color-disabled'}`}>
                {PlaceForLessonsComponent.Text.StudentHome}
              </Typography>
            </Grid>
          </Grid>
        )
      }
      {
        studio && (
          <Grid container={true} className="nabi-align-vertical-items nabi-margin-top-xsmall">
            <Grid item={true} xs={2} sm={1} md={3}>
              <IconButton
                color={studio ? 'primary' : 'secondary'}
                className="nabi-margin-right-xsmall"
              >
                <img
                  src={StudioIcon}
                  className="nabi-custom-button-icon"
                  alt="home"
                />
              </IconButton>
            </Grid>
            <Grid item={true} xs={10} sm={11} md={9}>
              <Typography className={studio ? 'nabi-color-nabi' : 'nabi-color-disabled'}>
                <span className="nabi-text-uppercase">
                  {PlaceForLessonsComponent.Text.Studio}
                </span>
                {' '}
                <span className="nabi-text-decoration-underline-hover nabi-cursor-pointer">
                  {PlaceForLessonsComponent.studioAddress.replace(
                    PlaceForLessonsComponent.studioAddressPlaceholder,
                    String(studioAddress)
                  )}
                </span>
              </Typography>
            </Grid>
          </Grid>
        )
      }
      {
        online && (
          <Grid container={true} className="nabi-align-vertical-items nabi-margin-top-xsmall">
            <Grid item={true} xs={2} sm={1} md={3}>
              <IconButton
                color={online ? 'primary' : 'secondary'}
                className="nabi-margin-right-xsmall"
              >
                <img
                  src={OnlineIcon}
                  className="nabi-custom-button-icon"
                  alt="home"
                />
              </IconButton>
            </Grid>
            <Grid item={true} xs={10} sm={11} md={9}>
              <Typography className={`nabi-text-uppercase ${online ? 'nabi-color-nabi' : 'nabi-color-disabled'}`}>
                {PlaceForLessonsComponent.Text.Online}
              </Typography>
            </Grid>
          </Grid>
        )
      }{
        noPlaceSelected && (
          <Typography>
            {PlaceForLessonsComponent.Text.noContent}
          </Typography>
        )
      }
    </div>
  );
};

export default PlaceForLessons;
