import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import {
  CircularProgress,
  Typography } from '@material-ui/core';

import { StoreState } from 'redux/store';
import { UserType } from 'redux/models/UserModel';
import SnackBar from 'components/common/SnackBar';
import { AnnouncementConstants } from 'components/common/constants/Announcement';
import { LoggedInPageTemplate } from 'components/common/Templates/LoggedInPageTemplate';
import { Routes } from 'components/common/constants/Routes';
import { fetchUser } from 'redux/actions/UserActions';
import PreLaunchInstructorDashboard from 'components/Dashboard/InstructorDashboard/PreLaunchInstructorDashboard';
import PreLaunchStudentDashboard from 'components/Dashboard/StudentDashboard/PreLaunchStudentDashboard';
import {
  DashboardComponent,
  PreLaunchInstructorDashboardComponent as constants
} from 'components/Dashboard/constants';
import { Role } from 'components/common/constants/Registration';
import SectionTitle from 'components/common/SectionTitle';
import { page } from 'utils/analytics';
import { InstructorType } from 'redux/models/InstructorModel';

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

  componentDidMount() {
    this.props.fetchUser();
    if (this.props.location.state && this.props.location.state.redirectedFrom === Routes.BuildRequest) {
      this.setState({
        showSnackbar: true
      });
    }

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
        {this.props.isRequesting ?
        <div className="nabi-text-center">
          <CircularProgress />
        </div> :
        <React.Fragment>
          <LoggedInPageTemplate
            sidebarContent={
              this.props.user.role === Role.instructor ?
              <React.Fragment>
                 <SectionTitle text="Things to do" />
                  <img
                    /* tslint:disable-next-line:max-line-length */
                    src="https://nabimusic.s3.us-east-2.amazonaws.com/things-to-do-nabi-music-lessons-boston-new-york.png"
                    className="dashboard-view-profile-image"
                  />
                  <Typography><Link to={Routes.BuildProfile}>{constants.editProfileLink}</Link></Typography>
                  {/* tslint:disable-next-line:max-line-length */}
                  <Typography><Link to={`profile/${this.props.user.profile && (this.props.user.profile as InstructorType).instructorId}`}>{constants.viewProfileLink}</Link></Typography>
                  <Typography><a target="_blank" href="https://www.facebook.com/pg/nabimusicinfo/jobs">{constants.viewJobsLink}</a></Typography>
              </React.Fragment>
                :
              <React.Fragment>
                <SectionTitle text={`Hello ${this.props.firstName ? this.props.firstName : ''}`} />
                <img
                  className="nabi-responsive-image"
                  alt="logo"
                  src={require('../../../assets/images/linkedin-pic.jpg')}
                />
            </React.Fragment>
            }
            mainContent={
              this.props.user.role === Role.instructor ?
              <PreLaunchInstructorDashboard /> : <PreLaunchStudentDashboard />}
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
