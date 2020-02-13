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

import { getCookie } from '../../utils/cookies';
import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';

import { gradeLesson } from '../../redux/actions/InstructorActions';
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
import { GradeData } from './models';
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
  isRequesting: boolean;
  message: string;
  error: string;
}

interface DispatchProps {
  gradeLesson: (gradeData: GradeData) => void;
}

interface OwnProps {
}

interface Props extends
  OwnProps,
  RouteComponentProps<{}>,
  StateProps,
  DispatchProps {}

export const GradeLesson = (props: Props) => {
  const [date, setDate] = React.useState("");
  const [grade, setGrade] = React.useState(0);
  const [comment, setComment] = React.useState("");

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case constants.FieldNames.Grade:
        setGrade(Number(value));
        break;

      case constants.FieldNames.Comment:
        setComment(value);
        break;

      default:
        return;
    }
  }

  const handleDateChange = (date: moment.Moment): void => {
    setDate(String(date));
  };

  const gradeLesson  = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    const gradeData: GradeData = {
      date,
      grade,
      comment,
      bookingId: getCookie('lessonBookingId')
    }
    await props.gradeLesson(gradeData);
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
        <Typography className="nabi-margin-bottom-small">{getCookie('lessonStudentName')}</Typography>
        <SectionTitle text={constants.instrumentSection} />
        <Typography className="nabi-margin-bottom-small">{getCookie('lessonInstrument')}</Typography>
        <form noValidate={true} autoComplete="off" onSubmit={gradeLesson}>
          <SectionTitle text={constants.dateOfLessonSection} />
          <FormControl fullWidth={false} required={true} className="nabi-margin-bottom-small">
            <DatePicker
              selected={moment(Date.now())}
              onChange={handleDateChange}
              peekNextMonth={true}
              showMonthDropdown={true}
              showYearDropdown={true}
              dropdownMode="select"
            />
          </FormControl>
          <SectionTitle text={constants.gradeSection} />
          <Rating
            name={constants.FieldNames.Grade}
            max={3}
            className="nabi-margin-bottom-small"
            value={grade}
            onChange={handleChange}
          />
          <SectionTitle text={constants.commentsSection} />
          <Grid item={true} xs={12} md={6} className="nabi-margin-bottom-small">
            <TextField
              name={constants.FieldNames.Comment}
              margin="normal"
              onChange={handleChange}
              multiline={true}
              fullWidth={true}
              rows={6}
              value={comment}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            disabled={!grade || !comment || !date}
            type="submit"
          >
            {constants.button}
          </Button>
        </form>
      </div>
      {props.isRequesting  &&
        <div className="nabi-text-center">
          <CircularProgress />
        </div>
      }

        {/* <SnackBar
          isOpen={this.state.showSnackbar}
          message={AnnouncementConstants.requestSentMessage}
          handleClose={this.closeSnackbar}
          variant="success"
          hideIcon={true}
        /> */}
    </div>
  );
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    actions: {
      gradeLesson: {
        isRequesting,
        error,
        message
      }
    }
  } = state.instructor;

  return {
    isRequesting,
    error,
    message
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  gradeLesson: (gradeData: GradeData) => dispatch(gradeLesson(gradeData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(GradeLesson, 'Private', ['Instructor']));
