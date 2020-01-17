import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import { RouteComponentProps } from 'react-router';
import Router from 'next/router';

import {
  CircularProgress,
  Typography } from '@material-ui/core';

import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';
import { fetchUser, fetchDashboard } from '../../redux/actions/UserActions';
import { InstructorType } from '../../redux/models/InstructorModel';
import { page } from '../../utils/analytics';
import SnackBar from '../common/SnackBar';
import SectionTitle from '../common/SectionTitle';
import { AnnouncementConstants } from '../common/constants/Announcement';
import { LoggedInPageTemplate } from '../common/Templates/LoggedInPageTemplate';
import { Routes } from '../common/constants/Routes';
import { Role } from '../Auth/Registration/constants';
import InviteFriends from '../InviteFriends/InviteFriends';
import InstructorDashboard from './InstructorDashboard/InstructorDashboard';
import ParentStudentDashboard from './ParentStudentDashboard/ParentStudentDashboard';
import {
  DashboardComponent,
  PreLaunchInstructorDashboardComponent as constants
} from './constants';
import { InstructorDashboardType, ParentStudentDashboardType } from './models';

interface State {
  showSnackbar: boolean;
}

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
}

interface OwnProps {
}

interface Props extends
  OwnProps,
  RouteComponentProps<{}>,
  StateProps,
  DispatchProps {}

export class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSnackbar: false
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.props.fetchUser();
    if (!this.props.token) {
      Router.push(Routes.HomePage);
    }
    if( this.props.user.role) {
      await this.props.fetchDashboard(Role[this.props.user.role]);
    }
    // if (this.props.location.state && this.props.location.state.redirectedFrom === Routes.BuildRequest) {
    //   this.setState({
    //     showSnackbar: true
    //   });
    // }

    const userId = this.props.user ? this.props.user.email : 'anonymous';

    const analiticsProps = {
      userId,
      properties: {
        referrer: document.referrer
      }
    };
    page('Dashboard', analiticsProps);
  }

  public closeSnackbar = () => this.setState({ showSnackbar: false });

  render() {
    return (
      <React.Fragment>
        {this.props.isRequesting  || this.props.isFetchingDashboard ?
        <div className="nabi-text-center">
          <CircularProgress />
        </div> :
        <React.Fragment>
          <LoggedInPageTemplate
            sidebarContent={
              <InviteFriends />
            }
            mainContent={
              this.props.user.role &&
                (this.props.user.role === Role.instructor ?
                  <InstructorDashboard user={this.props.user} dashboard={this.props.dashboard as InstructorDashboardType} /> : 
                  <ParentStudentDashboard role={this.props.user.role} dashboard={this.props.dashboard as ParentStudentDashboardType} />)
            }
            pageTitle={DashboardComponent.pageTitle}
          />
          <SnackBar
            isOpen={this.state.showSnackbar}
            message={AnnouncementConstants.requestSentMessage}
            handleClose={this.closeSnackbar}
            variant="success"
            hideIcon={true}
          />
        </React.Fragment>}
      </React.Fragment>
    );
  }
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
  fetchDashboard: (role: Role) => dispatch(fetchDashboard(role))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
