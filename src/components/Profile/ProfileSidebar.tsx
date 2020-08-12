import * as React from 'react';

import {
  Typography
} from '@material-ui/core';

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
    </div>
  );
};

export default ProfileSidebar;
