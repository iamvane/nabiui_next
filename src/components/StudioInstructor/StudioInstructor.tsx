import * as React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import moment from 'moment';
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { StoreState } from '../../redux/reducers/store';
import { fetchDashboard } from '../../redux/actions/UserActions';
import { getCookie, setCookie } from "../../utils/cookies";
import { Routes } from '../common/constants/Routes';
import PageTitle from '../common/PageTitle';
import PrivateRoute from '../Auth/PrivateRoutes';
import { InstructorStudioComponent, MissingFields, initialInstructorDashboard } from './constants';
import {
  LessonType,
  InstructorDashboardType,
} from '../Dashboard/models';
import LessonCard from './LessonCard';
import { ZoomMissingLink } from "./ZoomLinkMissing";

interface StateProps {
  dashboard: InstructorDashboardType;
  isFetchingDashboard: boolean;
  errorFetchingDashboard: string;
}

interface DispatchProps {
  fetchDashboard: () => void;
}

interface OwnProps { }

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps { }

export const StudioInstructor = (props: Props) => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
  const [dashboard, setDashboard] = React.useState(initialInstructorDashboard);
  const [isFetchingDashboard, setIsFetchingDashboard] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      await props.fetchDashboard();
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    if (props.dashboard && props.dashboard.id) {
      setCookie("instructorId", dashboard.id);
      setDashboard(props.dashboard);
      setIsFetchingDashboard(false);
      if (props.dashboard.missingFields.includes(MissingFields.ZoomLink)) {
        setDialogIsOpen(true);
      }
    }
    if (!props.dashboard) {
      setIsFetchingDashboard(true);
    }
  }, [JSON.stringify(props.dashboard)]);

  React.useEffect(() => {
    if (isFetchingDashboard !== props.isFetchingDashboard) {
      setIsFetchingDashboard(props.isFetchingDashboard)
    }
  }, [props.isFetchingDashboard])
  const displayLessons = () => (
    dashboard && dashboard.lessons && dashboard.lessons.length > 0 ?
      dashboard.lessons.map((lesson: LessonType, i) => (
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

  const firstName = getCookie('firstName');
  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md nabi-margin-bottom-large nabi-display-flex nabi-flex-column nabi-flex-align-center">
      <PageTitle pageTitle={firstName ? InstructorStudioComponent.pageTitle.replace(
        InstructorStudioComponent.namePlaceholder,
        getCookie('firstName')) : InstructorStudioComponent.pageTitleNoName} />
      {isFetchingDashboard ?
        <CircularProgress /> :
        <>
          <Grid container={true} spacing={7}>
            <Grid item={true} xs={12}>
              <div className="nabi-background-white nabi-border-radius nabi-padding-small nabi-margin-bottom-small">
                <ScheduleIcon color="primary" className="text-aligned-icon" />
                {dashboard && dashboard.nextLesson && dashboard.nextLesson.id ?
                  <Typography className="nabi-display-inline nabi-margin-left-xsmall">
                    {InstructorStudioComponent.nextLesson.replace(
                      InstructorStudioComponent.datePlaceholder,
                      (moment(dashboard.nextLesson.date).calendar().split(" at"))[0]
                    ).replace(
                      InstructorStudioComponent.timePlaceholder,
                      moment(dashboard.nextLesson.time, "h:mm").format("h:mmA")
                    ).replace(
                      InstructorStudioComponent.timezonePlaceholder,
                      dashboard.nextLesson.timezone
                    ).replace(
                      InstructorStudioComponent.namePlaceholder,
                      dashboard.nextLesson.studentDetails[0].name
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
          <ZoomMissingLink
            isOpen={dialogIsOpen}
            handleRedirect={() => {
              Router.push(Routes.InstructorZoomSetup);
            }}
          />
        </>
      }
    </div>
  );
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    actions: {
      fetchDashboard: {
        isRequesting: isFetchingDashboard,
        error: errorFetchingDashboard
      }
    }
  } = state.user;

  return {
    isFetchingDashboard,
    errorFetchingDashboard,
    dashboard: state.user.user.dashboard as InstructorDashboardType
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchDashboard: () => dispatch(fetchDashboard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(StudioInstructor, 'Private', ['Instructor']));
