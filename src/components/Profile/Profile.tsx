import * as React from 'react';
import {
  Action,
  Dispatch
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';

import { useRouter } from 'next/router';

import { Grid, CircularProgress } from '@material-ui/core';

import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import { InstructorType } from '../../redux/models/InstructorModel';
import { changeAvatar } from '../../redux/actions/UserActions';
import { updateInstructor, fetchInstructor } from '../../redux/actions/InstructorActions';
import { RatesType } from '../Rates/model';
import { SkillLevel } from '../Instruments/constants';
import PageTitle from '../common/PageTitle';
// import { ReviewsType } from '../Reviews/model';
import { QualificationsType } from '../Qualifications/model';
import { Qualifications } from '../Qualifications/constants';
import { InstrumentsType } from '../Instruments/model';
import { EmploymentType } from '../Employment/model';
import { EducationType } from '../Education/model';
import { ProfileComponent, ProfileContentComponent } from './constants';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import ProfileSidebar from './ProfileSidebar';

interface StateProps {
  user: UserType;
  instructor: InstructorType;
  isRequestingInstructor: boolean;
}

interface DispatchProps {
  changeAvatar: (id: string, avatar: string) => void;
  updateInstructor: (instructor: InstructorType) => void;
  fetchInstructor: (id: number) => void;
}

interface OwnProps { }

interface Props extends
  StateProps,
  DispatchProps { }


export const Profile = (props: Props) =>  {
  const router = useRouter();
  const id = Number(router.query.id);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await props.fetchInstructor(id);
      }
    };
    fetchData();
    /* tslint:disable */
  }, []);


  const getAvailability = () => {
    const daysOfAvailability = [
      { monday: ProfileContentComponent.monday },
      { tuesday: ProfileContentComponent.tuesday },
      { wednesday: ProfileContentComponent.wednesday },
      { thursday: ProfileContentComponent.thursday },
      { friday: ProfileContentComponent.friday },
      { saturday: ProfileContentComponent.saturday },
      { sunday: ProfileContentComponent.sunday }
    ] as { [x: string]: { [x: string]: string } }[];

    const days = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    } as { [x: string]: string[] };

    Object.keys(ProfileContentComponent.availability).forEach((dayTime: string) => {
      if (props.instructor.availability && props.instructor.availability[dayTime]) {
        daysOfAvailability.forEach((day) => {
          if (day[Object.keys(day)[0]][dayTime]) {
            days[Object.keys(day)[0]].push(day[Object.keys(day)[0]][dayTime]);
          }
        });
      }
    });

    return days;
  }

  return (
    <div className="nabi-container">
      <PageTitle pageTitle={ProfileComponent.pageTitle} />
      {props.isRequestingInstructor ?
        <div className="nabi-section nabi-profile-loader-container">
          <CircularProgress />
        </div> :
        <React.Fragment>
          <div className="nabi-section nabi-background-white">
            <Grid container={true}>
              <Grid item={true} md={12} xs={12} className="nabi-margin-top-xsmall">
                <ProfileHeader instructor={props.instructor} />
              </Grid>
            </Grid>
          </div>
          <Grid container={true} spacing={1}>
            <Grid item={true} md={8} xs={12} className="nabi-margin-top-xsmall">
              <div className="nabi-section-wide nabi-background-white">
                <ProfileContent instructor={props.instructor} />
              </div>
            </Grid>
            <Grid item={true} md={4} xs={12} className="nabi-margin-top-xsmall">
              <ProfileSidebar
                online={props.instructor.placeForLessons && props.instructor.placeForLessons.online}
                studio={props.instructor.placeForLessons && props.instructor.placeForLessons.studio}
                home={props.instructor.placeForLessons && props.instructor.placeForLessons.home}
                // studioAddress={props.instructor.placeForLessons.studioAddress}
                studioAddress=""
                availableDays={getAvailability()}
                displayName={props.instructor.displayName}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      }
    </div>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user: {
      user
    },
    instructor: {
      instructor,
      actions: {
        fetchInstructor: {
          isRequesting: isRequestingInstructor
        }
      }
    },
  } = state;
  return {
    user,
    instructor,
    isRequestingInstructor
  };
};

function mapDispatchToProps(
  dispatch: Dispatch<Action | ThunkAction<{}, {}, {}>>,
  _ownProps: OwnProps
): DispatchProps {
  return {
    changeAvatar: (id: string, avatar: string) => dispatch(changeAvatar(id, avatar)),
    updateInstructor: (instructor: InstructorType) => dispatch(updateInstructor(instructor)),
    fetchInstructor: (id: number) => dispatch(fetchInstructor(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
