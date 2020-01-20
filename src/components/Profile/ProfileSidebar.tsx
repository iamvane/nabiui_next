import * as React from 'react';

import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import Email from '@material-ui/icons/Email';

import SectionTitle from '../common/SectionTitle';
import PlaceForlessons from '../PlaceForLessons/PlaceForLessons';
import { PlaceForLessonsType } from '../PlaceForLessons/model';
import { ProfileSidebarComponent } from './constants';

interface Props extends PlaceForLessonsType {
  studioAddress?: string;
  availableDays: { [x: string]: string[] };
  displayName: string;
}

const displayAvailabilityDay = (availability: {
  [x: string]: string[]
}) => {
  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  return (
    <React.Fragment>
      {
        days.map((day, i) => {
          if (availability[day] && availability[day].length) {
            return (
              <React.Fragment key={i}>
                <Typography className="nabi-text-mediumbold nabi-text-uppercase">
                  {day}
                </Typography>
                <Typography className="nabi-text-uppercase nabi-margin-bottom-xsmall">
                  {availability[day].join(', ')}
                </Typography>
              </React.Fragment>
            );
          }
          return null;
        })
      }
    </React.Fragment>
  );
};

/**
 * Profile Sidebar
 */
const ProfileSidebar: React.StatelessComponent<Props> = props => {
  const { home, studio, online, studioAddress } = props;
  const isAvailability = () => {
    return Object.values(props.availableDays).some((day) => {
      return day.length > 0;
    });
  };

  return (
    <div>
      <div className="nabi-section-wide nabi-background-white">
        <SectionTitle text="teaches at" />
        <PlaceForlessons
          online={online}
          studio={studio}
          home={home}
          studioAddress={studioAddress}
        />
      </div>
      <div className="nabi-section-wide nabi-background-white nabi-margin-top-xsmall">
        <SectionTitle text="availability" />
        {
          isAvailability() ? displayAvailabilityDay(props.availableDays) :
          <Typography>
            {ProfileSidebarComponent.Text.noContent}
          </Typography>
        }
      </div>
      <div className="nabi-section-wide nabi-background-white nabi-margin-top-xsmall nabi-margin-bottom-medium">
        <Grid container={true}>
          <Grid item={true} xs={12}>
          {/* tslint:disable-next-line:max-line-length */}
            <a href={`mailto:info@nabimusic.com?&subject=Music lessons with ${props.displayName}&body=Please provide student details: instrument, age, location, place for lessons (home, instructo'r studio, online) level (beginner, intermediate, advanced) and lesson duration (30, 45, 60 or 90 mins)`}>
              <Button
                fullWidth={true}
                variant="contained"
                color="primary"
                className="nabi-text-uppercase nabi-padding-top-xsmall nabi-padding-bottom-xsmall"
              >
              {ProfileSidebarComponent.Text.SendMessage}
              <Email className="nabi-margin-left-small" />
              </Button>
            </a>
          </Grid>
          {/* <Grid item={true} xs={12}>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              className="nabi-text-uppercase nabi-margin-top-xsmall nabi-padding-top-xsmall nabi-padding-bottom-xsmall"
            >
              {ProfileSidebarComponent.Text.AddToFavorite}
              <Icon className="nabi-margin-left-small">favorite</Icon>
            </Button>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

export default ProfileSidebar;
