import * as React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import moment from 'moment';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import {
  fetchDashboard,
  setPathname,
  logOutUser
} from '../../redux/actions/UserActions';
import { getCookie } from "../../utils/cookies";
import { Routes } from '../common/constants/Routes';
import PageTitle from '../common/PageTitle';
import { Role } from '../Auth/Registration/constants';
import PrivateRoute from '../Auth/PrivateRoutes';
import { InstructorStudioComponent }  from './constants';
import {
  LessonType,
  InstructorDashboardType
} from '../Dashboard/models';
import LessonCard from './LessonCard';

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
  fetchDashboard: (role: Role) => void;
}

interface OwnProps {}

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps {}

export const StudioInstructor = (props: Props) => {
  React.useEffect(() => {
    const fetchData = async () => {
      await props.fetchDashboard(Role.instructor);
    }
    fetchData();
  },[]);

  const displayLessons = () => (
    props.dashboard && props.dashboard.lessons.length > 0 ?
    props.dashboard.lessons.map((lesson: LessonType, i) => (
      <Grid item={true} key={i} xs={12} md={6}>
        <LessonCard lesson={lesson} />
      </Grid>
    )) :
    <Grid item={true} xs={12}>
      <div className="nabi-background-white nabi-border-radius nabi-padding-small">
        <Typography><span>{InstructorStudioComponent.noStudents}</span></Typography>
        <Link href={Routes.Requests}>
          <Button
            color="primary"
            variant="contained"
            className="nabi-display-block nabi-margin-top-small"
          >
            {InstructorStudioComponent.findStudentsButton}
          </Button>
        </Link>
      </div>
    </Grid>
  );

  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md nabi-margin-bottom-large">
      <PageTitle pageTitle={InstructorStudioComponent.pageTitle.replace(
        InstructorStudioComponent.namePlaceholder,
        getCookie('firstName')
      )} />
      <Grid container={true} spacing={7}>
        <Grid item={true} xs={12}>
          <div className="nabi-background-white nabi-border-radius nabi-padding-small">
            <ScheduleIcon color="primary" className="text-aligned-icon" />
            {props.dashboard && props.dashboard.nextLesson && props.dashboard.nextLesson.id ?
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">
                {InstructorStudioComponent.nextLesson.replace(
                  InstructorStudioComponent.datePlaceholder,
                  (moment(props.dashboard.nextLesson.date).calendar().split(" at"))[0]
                ).replace(
                  InstructorStudioComponent.timePlaceholder,
                  moment(props.dashboard.nextLesson.time, "h:mm").format("h:mmA")
                )}
              </Typography>
              :
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">{InstructorStudioComponent.noNextLesson}</Typography>}
          </div>
        </Grid>
      </Grid>
      <Grid container={true} spacing={1}>
        {displayLessons()}
      </Grid>
    </div>
  );
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
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
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchDashboard: (role: Role) => dispatch(fetchDashboard(role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(StudioInstructor, 'Private', ['Instructor']));
