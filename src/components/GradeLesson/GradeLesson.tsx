import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';
import Router from 'next/router';
import Head from 'next/head';
import DatePicker from 'react-datepicker';

import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';
import {
  fetchUser,
  fetchDashboard,
  setPathname
} from '../../redux/actions/UserActions';
import { page } from '../../utils/analytics';
import SnackBar from '../common/SnackBar';
import PageTitle from '../common/PageTitle';
import SectionTitle from '../common/SectionTitle';
import { AnnouncementConstants } from '../common/constants/Announcement';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import { LoggedInPageTemplate } from '../common/Templates/LoggedInPageTemplate';
import { Routes } from '../common/constants/Routes';
import { Role } from '../Auth/Registration/constants';
import InviteFriends from '../InviteFriends/InviteFriends';
import PrivateRoute from '../Auth/PrivateRoutes';
import * as constants from './constants';
// import InstructorDashboard from './InstructorDashboard/InstructorDashboard';
// import ParentStudentDashboard from './ParentStudentDashboard/ParentStudentDashboard';
// import {
//   DashboardComponent,
//   PreLaunchInstructorDashboardComponent as constants
// } from './constants';
// import { InstructorDashboardType, ParentStudentDashboardType } from './models';

interface State {
  showSnackbar: boolean;
}

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  firstName: string;
  token: string;
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

export const GradeLesson = (props: Props) => {

  // public async componentDidMount(): Promise<void> {
  //   await this.props.fetchUser();
  //   if (!this.props.token) {
  //     Router.push(Routes.HomePage);
  //   }
  //   if( this.props.user.role) {
  //     await this.props.fetchDashboard(Role[this.props.user.role]);
  //   }

  //   this.props.setPathname(Router.pathname)
  //   // if (this.props.location.state && this.props.location.state.redirectedFrom === Routes.BuildRequest) {
  //   //   this.setState({
  //   //     showSnackbar: true
  //   //   });
  //   // }

  //   const userId = this.props.user ? this.props.user.email : 'anonymous';

  //   const analiticsProps = {
  //     userId,
  //     properties: {
  //       referrer: document.referrer
  //     }
  //   };
  //   page('Dashboard', analiticsProps);
  // }

  // public closeSnackbar = () => this.setState({ showSnackbar: false });

  const handleChange = () => {
    console.log('me');
  }

  return (
    <div className="nabi-container">
      <Head>
        <title>{pageTitlesAndDescriptions.dashboard.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.dashboard.description}></meta>
      </Head>
      <PageTitle pageTitle={constants.pageTitle} />
      <div className="nabi-background-white nabi-section nabi-margin-bottom-medium">
        <SectionTitle text={constants.studentNameSection} />
        <Typography className="nabi-margin-bottom-small">Zoe</Typography>
        <SectionTitle text={constants.instrumentSection} />
        <Typography className="nabi-margin-bottom-small">Piano</Typography>

        <SectionTitle text={constants.dateOfLessonSection} />
        <FormControl fullWidth={false} required={true} className="nabi-margin-bottom-small">
          <DatePicker
            selected={ moment(Date.now())}
            onChange={handleChange}
            peekNextMonth={true}
            showMonthDropdown={true}
            showYearDropdown={true}
            dropdownMode="select"
          />
        </FormControl>
        <SectionTitle text={constants.gradeSection} />
        <Rating
          name="simple-controlled"
          max={3}
          className="nabi-margin-bottom-small"
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        />
        <SectionTitle text={constants.commentsSection} />
        <Grid item={true} xs={12} md={6} className="nabi-margin-bottom-small">
          <TextField
            // id={BioComponent.Ids.bioDescription}
            margin="normal"
            // name={BioComponent.FieldNames.bioDescription}
            // placeholder={BioComponent.Placeholders.CharactersMax}
            // onChange={props.handleChange}
            // onBlur={props.handleOnBlur}
            // required={true}
            multiline={true}
            fullWidth={true}
            rows={6}
            // error={!!props.bioDescriptionError}
            // helperText={props.bioDescriptionError}
            // value={props.bioDescription}
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
        >
          {constants.button}
        </Button>
      </div>
      {/* {this.props.isRequesting  || this.props.isFetchingDashboard ? */}
      {/* <div className="nabi-text-center">
        <CircularProgress />
      </div> */}
      <React.Fragment>

        {/* <SnackBar
          isOpen={this.state.showSnackbar}
          message={AnnouncementConstants.requestSentMessage}
          handleClose={this.closeSnackbar}
          variant="success"
          hideIcon={true}
        /> */}
      </React.Fragment>
    </div>
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
    token: state.user.token
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchDashboard: (role: Role) => dispatch(fetchDashboard(role)),
  setPathname: (pathname: string) => dispatch(setPathname(pathname))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(GradeLesson, 'Private', ['Instructor']));
