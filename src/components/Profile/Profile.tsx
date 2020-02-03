import * as React from 'react';
import {
  Action,
  Dispatch
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import {
  Grid,
  CircularProgress,
  Typography
} from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { getCookie } from '../../utils/cookies';
import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import { InstructorType } from '../../redux/models/InstructorModel';
import { changeAvatar } from '../../redux/actions/UserActions';
import { updateInstructor, fetchInstructor } from '../../redux/actions/InstructorActions';
import { Routes } from '../common/constants/Routes';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import PageTitle from '../common/PageTitle';
import {
  ProfileComponent,
  ProfileContentComponent
} from './constants';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import ProfileSidebar from './ProfileSidebar';

interface StateProps {
  user: UserType;
  instructor: InstructorType;
  isRequestingInstructor: boolean;
  pathname: string
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

  const pathname = getCookie('pathname');

  return (
    <div className="nabi-container">
      <Head>
        <title>{pageTitlesAndDescriptions.profile.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.profile.description}></meta>
      </Head>
      <PageTitle pageTitle={ProfileComponent.pageTitle} />
        <Breadcrumbs aria-label="breadcrumb">
          <Link  href={Routes.Dashboard}>
            <a>{ProfileComponent.breadcrumbLabels.home}</a>
          </Link>
          {pathname && pathname.includes('application') &&
            <Link  href={pathname}>
              <a>{ProfileComponent.breadcrumbLabels.applicationList}</a>
            </Link>
          }
          <Typography>{ProfileComponent.breadcrumbLabels.profile}</Typography>
        </Breadcrumbs>
      {props.isRequestingInstructor ?
        <div className="nabi-section nabi-profile-loader-container">
          <CircularProgress />
        </div> :
        <React.Fragment>
          <div className="nabi-section nabi-background-white nabi-margin-top-xsmall">
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
      user,
      pathname
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
    isRequestingInstructor,
    pathname
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
