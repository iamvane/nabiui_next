import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import { RouteComponentProps } from 'react-router';
import Router from 'next/router';
import Head from 'next/head';

import { CircularProgress } from '@material-ui/core';

import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';
import {
  fetchUser,
  fetchDashboard,
  setPathname
} from '../../redux/actions/UserActions';
import { page } from '../../utils/analytics';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import { LoggedInPageTemplate } from '../common/Templates/LoggedInPageTemplate';
import { Routes } from '../common/constants/Routes';
import { Role } from '../Auth/Registration/constants';
import InviteFriends from '../InviteFriends/InviteFriends';
import PrivateRoute from '../Auth/PrivateRoutes';
import InstructorDashboard from './InstructorDashboard/InstructorDashboard';
import ParentStudentDashboard from './ParentStudentDashboard/ParentStudentDashboard';
import {
  DashboardComponent,
  PreLaunchInstructorDashboardComponent as constants
} from './constants';
import { InstructorDashboardType, ParentStudentDashboardType } from './models';

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  firstName: string;
  token: string;
  dashboard: InstructorDashboardType | ParentStudentDashboardType;
  isFetchingDashboard: boolean;
  errorFetchingDashboard: string;
}

interface DispatchProps {
  fetchUser: () => void;
  fetchDashboard: (role: Role) => void;
  setPathname: (pathname: string) => void;
}

interface OwnProps {
}

interface Props extends
  OwnProps,
  RouteComponentProps<{}>,
  StateProps,
  DispatchProps {}

export const Dashboard = (props: Props) => {
  React.useEffect(() => {
    const fetchData = async () => {
      await props.fetchUser();
      if (!props.token) {
        Router.push(Routes.HomePage);
      }
      if (props.user.role) {
        await props.fetchDashboard(Role[props.user.role]);
      }
    };
    fetchData();
    const userId = props.user ? props.user.email : 'anonymous';

    const analiticsProps = {
      userId,
      properties: {
        referrer: document.referrer
      }
    };
    page('Dashboard', analiticsProps);
  },[]);

  // public async componentDidMount(): Promise<void> {
  //   await this.props.fetchUser();
  //   if (!this.props.token) {
  //     Router.push(Routes.HomePage);
  //   }
  //   if( this.props.user.role) {
  //     await this.props.fetchDashboard(Role[this.props.user.role]);
  //   }

  //   this.props.setPathname(Router.pathname)
  //   if (this.props.location.state && this.props.location.state.redirectedFrom === Routes.BuildRequest) {
  //     this.setState({
  //       showSnackbar: true
  //     });
  //   }
  // }
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitlesAndDescriptions.dashboard.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.dashboard.description}></meta>
      </Head>
      {props.isRequesting  || props.isFetchingDashboard ?
      <div className="nabi-text-center">
        <CircularProgress />
      </div> :
      <React.Fragment>
        <LoggedInPageTemplate
          sidebarContent={
            <InviteFriends />
          }
          mainContent={
            props.user.role &&
              (props.user.role === Role.instructor ?
                <InstructorDashboard user={props.user} dashboard={props.dashboard as InstructorDashboardType} /> : 
                <ParentStudentDashboard role={props.user.role} dashboard={props.dashboard as ParentStudentDashboardType} />)
          }
          pageTitle={DashboardComponent.pageTitle}
          instructorId={props.user.instructorId}
          role={props.user.role}
        />
      </React.Fragment>}
    </React.Fragment>
  );
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    actions: {
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
    token: state.user.token,
    dashboard: state.user.user.dashboard as InstructorDashboardType | ParentStudentDashboardType
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchDashboard: (role: Role) => dispatch(fetchDashboard(role)),
  setPathname: (pathname: string) => dispatch(setPathname(pathname))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(Dashboard, 'Private', ['Student', 'Parent', 'Instructor']));
