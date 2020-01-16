import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import { RouteComponentProps } from 'react-router';
import Link from 'next/link';

import {
  CircularProgress,
  Typography } from '@material-ui/core';

import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';
import { fetchUser } from '../../redux/actions/UserActions';
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

interface State {
  showSnackbar: boolean;
}

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  firstName: string;
}

interface DispatchProps {
  fetchUser: () => void;
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
    const LinkedInPic = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/linkedin-pic.jpg';
    return (
      <React.Fragment>
        {this.props.isRequesting ?
        <div className="nabi-text-center">
          <CircularProgress />
        </div> :
        <React.Fragment>
          <LoggedInPageTemplate
            sidebarContent={
              <InviteFriends />
            }
            mainContent={
              this.props.user.role === Role.instructor ?
              <InstructorDashboard user={this.props.user} /> : <ParentStudentDashboard role={this.props.user.role} />}
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
      }
    }
  } = state.user;

  return {
    user: state.user.user,
    firstName: state.user.user.firstName,
    isRequesting
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
