import * as React from 'react';
import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import { RouteComponentProps } from 'react-router';
import Router from 'next/router';
import Head from 'next/head';

import { CircularProgress } from '@material-ui/core';

import { StoreState } from '../../../redux/reducers/store';
import {
  fetchUser,
  fetchDashboard,
  logOutUser
} from '../../../redux/actions/UserActions';
import { page } from '../../../utils/analytics';
import { pageTitlesAndDescriptions } from '../../common/constants/TitlesAndDescriptions';
import { Role } from '../../Auth/Registration/constants';
import PrivateRoute from '../../Auth/PrivateRoutes';

import {
  Grid
} from '@material-ui/core';

import { UserType } from '../../../redux/models/UserModel';
import { Routes } from '../../common/constants/Routes';
import PageTitle from '../../common/PageTitle';
import NavigationContainer from '../../Navigation/NavigationContainer';
import { InstructorDashboardComponent } from '../constants';
import {
  InstructorDashboardType,
  NextLesson
} from '../models';

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  firstName: string;
  token: string;
  dashboard: InstructorDashboardType;
  isFetchingDashboard: boolean;
  errorFetchingDashboard: string;
  isLoggingOutUser: boolean;
}

interface DispatchProps {
  fetchUser: () => void;
  logOutUser: () => void;
  fetchDashboard: (role: Role) => void;
  setPathname: (pathname: string) => void;
}

interface OwnProps {
}

interface Props extends
  OwnProps,
  RouteComponentProps<{}>,
  StateProps,
  DispatchProps { }

export const InstructorDashboard = (props: Props) => {
  const dispatch = useDispatch();
  const fetchUserAction = bindActionCreators(fetchUser, dispatch);
  const fetchDashboardAction = bindActionCreators(fetchDashboard, dispatch);
  const logOutUserAction = bindActionCreators(logOutUser, dispatch);
  let {
    isFetchingDashboard,
    isLoggingOutUser,
    errorFetchingDashboard,
    user,
    firstName,
    isRequesting,
    token,
    dashboard
  } = useSelector((state: StoreState) => {
    const {
      actions: {
        logOutUser: {
          isRequesting: isLoggingOutUser,
          error: logOutError,
          message
        },
        fetchUser: {
          isRequesting,
        },
        fetchDashboard: {
          isRequesting: isFetchingDashboard,
          error: errorFetchingDashboard
        }
      }
    } = state.user;

    return {
      isFetchingDashboard,
      errorFetchingDashboard,
      user: state.user.user,
      firstName: state.user.user.firstName,
      isRequesting,
      isLoggingOutUser,
      token: state.user.token,
      dashboard: state.user.user.dashboard as InstructorDashboardType
    };
  });

  React.useEffect(() => {
    fetchUserAction();
  }, [JSON.stringify(user)]);

  React.useEffect(() => {
    if (user.role && !user.dashboard) {
      fetchDashboardAction(Role[user.role]);
    }
  }, [JSON.stringify(user)]);

  React.useEffect(() => {
    let userId
    if (user.email) {
      userId = user.email
    } else {
      userId = 'anonymous'
    }
    const analiticsProps = {
      userId,
      properties: {
        referrer: document.referrer
      }
    };
    page('Dashboard', analiticsProps);
  }, [JSON.stringify(user)]);

  const handleUserLogout = React.useCallback(() => {
    logOutUserAction();
  }, []);

  React.useEffect(() => {
    if (!token && isLoggingOutUser) {
      Router.push(Routes.HomePage);
    }
  }, [token, isLoggingOutUser])

  let pageTitle = InstructorDashboardComponent.pageTitle.replace(
    InstructorDashboardComponent.studioNamePlaceholder,
    user.firstName
  );

  pageTitle = pageTitle.replace('Family', '');

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitlesAndDescriptions.dashboard.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.dashboard.description}></meta>
      </Head>
      {
        isRequesting && (
          <div className="nabi-text-center">
            <CircularProgress />
          </div>
        )
      }
      {
        dashboard && (
          <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md">
            <PageTitle pageTitle={pageTitle} />
            <Grid container={true} spacing={4}>
              <NavigationContainer
                role={user.role}
                instructorId={user.instructorId}
                isRequesting={isRequesting}
                handleUserLogout={handleUserLogout}
                lessons={dashboard.lessons}
                nextLesson={user.role === Role.instructor && dashboard
                  && dashboard.nextLesson
                  && Object.entries(dashboard.nextLesson).length ?
                  dashboard.nextLesson : {} as NextLesson
                }
              />
              {/* <NavigationContainer /> */}
              {/* <Grid item={true} xs={12} md={4}>
            <div className="nabi-section-widest nabi-background-white">
              {sidebarContent}
            </div>
          </Grid>
          <Grid item={true} xs={12} md={8}>
            {mainContent}
          </Grid> */}
            </Grid>
          </div>
        )
      }
    </React.Fragment>
  );
}

export default PrivateRoute(InstructorDashboard, 'Private', ['Instructor']);

