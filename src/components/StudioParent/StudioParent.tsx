import * as React from 'react';
import Link from 'next/link';
import Router from "next/router";
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import moment from 'moment';
import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Star from "@material-ui/icons/Star";
import ScheduleIcon from '@material-ui/icons/Schedule';
import { instrumentDisplay } from '../../utils/displayInstrument';
import { StoreState } from '../../redux/reducers/store';
import { fetchDashboard } from '../../redux/actions/UserActions';
import { getCookie, setCookie, removeCookie } from "../../utils/cookies";
import { Routes } from '../common/constants/Routes';
import PageTitle from '../common/PageTitle';
import { Role } from '../Auth/Registration/constants';
import PrivateRoute from '../Auth/PrivateRoutes';
import { ParentStudioComponent, LessonStatuses }  from './constants';
import { LessonStatus } from './LessonStatus';
import '../../../assets/scss/StudioParent.scss';

import { ParentStudentDashboardType } from '../Dashboard/models';

interface StateProps {
  dashboard: ParentStudentDashboardType;
  isFetchingDashboard: boolean;
  errorFetchingDashboard: string;
}

interface DispatchProps {
  fetchDashboard: (role: Role) => void;
}

interface OwnProps {}

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Grid item={true} xs={12} hidden={value !== index} className="nabi-padding-top-small nabi-margin-bottom-small">
      <Typography>{value === index && children}</Typography>
    </Grid>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const StudioParent = (props: Props) => {
  const [student, setStudent] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      await props.fetchDashboard(Role.instructor);
    }
    fetchData();
  },[]);

  const role = getCookie('role');

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (event) event.preventDefault();

    setStudent(newValue);
  };

  const getStudentsTab = (): string[] => {
    let studentsArray = [];
    props.dashboard.students.map(student => studentsArray.push(student.name))

    return studentsArray;
  }

  const lessonStatus = (status: LessonStatuses) => (
    <LessonStatus lessonStatus={status} />
  )

  const displayGradeStars = (grade: number) => {
    let gradeStars: JSX.Element[] = [];
    for (let i = 0; i < 3; i++) {
      if (i < grade) {
        gradeStars.push(<Star key={i} color="primary" />);
      } else {
        gradeStars.push(<Star color="disabled" key={i} />);
      }
    }
    return gradeStars;
  };

  const displayEmptyContent = () => (
    <Grid item={true} xs={12} md={8} className="nabi-background-white nabi-border-radius nabi-padding-small nabi-margin-top-small nabi-margin-center nabi-text-center">
      <Typography>{ParentStudioComponent.noStudentsDescription}</Typography>
      <Link href={Routes.ScheduleTrial + Routes.LessonDetails}>
        <Button variant="contained" color="primary" className="nabi-margin-top-small">{ParentStudioComponent.scheduleTrialButton}</Button>
      </Link>
    </Grid>
  )

  const rescheduleLesson = (studentName, lessonId) => {
    setCookie('lessonId', lessonId);
    setCookie('studentName', studentName);

    Router.push(Routes.ScheduleLesson);
  }

  const scheduleTrial = (studentName, studentId, instument) => {
    setCookie('studentId', studentId);
    setCookie('studentName', studentName);
    setCookie('instrumentName', instument);
    removeCookie('lessonId');

    Router.push(Routes.ScheduleTrial + Routes.ScheduleTrial)
  }

  const buyMoreLessons = (studentId) => {
    setCookie("studentId", studentId);

    return Router.push(Routes.BookLessons + '/' + studentId);
  }

  const displayTabContent = () => {
    const headCells = [
      { id: 'date', numeric: false, disablePadding: true, label: 'Date/Time' },
      { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
      { id: 'instructor', numeric: true, disablePadding: false, label: 'Instructor' },
      { id: 'grade', numeric: true, disablePadding: false, label: 'Grade' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];

    function createData(date, status, instructor, instructorId, grade, id) {
      return { date, status, instructor, instructorId, grade, id };
    }

    return props.dashboard.students.map((item, i) => {
      const rows = item.lessons.map(item => (
        createData(item.date, item.status, item.instructor, item.instructorId, item.grade, item.id)
      ));

      return (
        <TabPanel value={student} index={i} key={i}>
          <div className="nabi-background-white nabi-border-radius nabi-padding-small">
            <ScheduleIcon color="primary" className="text-aligned-icon" />
            {item.nextLesson.id ?
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">
                {ParentStudioComponent.nextLesson.replace(
                  ParentStudioComponent.datePlaceholder,
                  (moment(item.nextLesson.date).calendar().split(" at"))[0]
                ).replace(
                  ParentStudioComponent.timePlaceholder,
                  moment(item.nextLesson.time, "h:mm").format("h:mmA")
                ).replace(
                  ParentStudioComponent.timezonePlaceholder,
                  item.nextLesson.timezone
                ).replace(
                  ParentStudioComponent.instructorPlaceholder,
                  item.nextLesson.instructor || ParentStudioComponent.unassignedInstructor
                )}
              </Typography>
              :
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">{ParentStudioComponent.noNextLesson}</Typography>}
          </div>
          <div className="nabi-background-white nabi-border-radius nabi-padding-small nabi-margin-top-small">
            <Grid container={true}>
              <Grid item={true} xs={12} md={8}>
                <p className="nabi-color-nabi nabi-jennasue-title nabi-margin-bottom-zero nabi-margin-top-zero">
                  {ParentStudioComponent.studentDescription.replace(
                    ParentStudioComponent.namePlaceholder,
                    item.name).replace(
                      ParentStudioComponent.instrumentPlaceholder,
                      instrumentDisplay(item.instrument)
                    )}
                </p>
              </Grid>
              <Grid item={true} xs={12} md={4} className="nabi-text-right-md">
                <Button
                  variant="contained"
                  color="primary"
                  className="nabi-margin-top-small-md"
                  onClick={
                    item.lessons.length < 1 ?
                    () => scheduleTrial(item.name, item.id, item.instrument) :
                    () => buyMoreLessons(item.id)
                  }
                >
                  {item.lessons.length < 1 ? ParentStudioComponent.scheduleTrialButton : ParentStudioComponent.buyMoreLessonsButton}
                </Button>
              </Grid>
            </Grid>
            <TableContainer className="nabi-margin-top-small nabi-margin-bottom-small">
              {item.lessons.length < 1 ?
              <span>{ParentStudioComponent.noLessons}</span> :
                <Table id="lessons-table" aria-label="lesson table">
                  <TableHead>
                    <TableRow>
                      {headCells.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          className="nabi-text-uppercase"
                        >
                          {headCell.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.date}>
                        <TableCell>
                          {row.date}
                        </TableCell>
                        <TableCell>{lessonStatus(row.status)}</TableCell>
                        <TableCell>
                          {row.instructor ?
                            <Link href={`${Routes.Profile}/${row.instructorId}`}><a>{row.instructor}</a></Link> :
                            ParentStudioComponent.unassigned
                          }
                        </TableCell>
                        <TableCell>{row.grade ? displayGradeStars(row.grade) : ParentStudioComponent.ungraded}</TableCell>
                        <TableCell>{row.status === 'scheduled' ?
                          <Button
                            variant="contained"
                            color="primary"
                            className="nabi-responsive-button"
                            onClick={() => rescheduleLesson(item.name, row.id)}
                          >
                            {ParentStudioComponent.reschedule}
                          </Button> :
                          ParentStudioComponent.noActions}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              }
            </TableContainer>
          </div>
        </TabPanel>
      )
    })
  }

  const pageTitle = () => {
    const firstName = getCookie('firstName');
    if (firstName) {
      if (role === Role.parent) {
        return ParentStudioComponent.pageTitleParent.replace(
          ParentStudioComponent.namePlaceholder,
          firstName)
      } else {
        return ParentStudioComponent.pageTitleStudent.replace(
          ParentStudioComponent.namePlaceholder,
          firstName)
      }
    } else {
      if (role === Role.parent) {
        return ParentStudioComponent.pageTitleParentNoName
      } else {
        return ParentStudioComponent.pageTitleStudentNoName
      }
    }
  }

  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md nabi-margin-bottom-large">
      <PageTitle pageTitle={pageTitle()} />
      {props.isFetchingDashboard ?
        <CircularProgress /> :
        <Grid container={true} spacing={0}>
          {props.dashboard && props.dashboard.students && props.dashboard.students.length > 0 ?
            <>
              {props.dashboard && props.dashboard.students && props.dashboard.students.length > 1 ?
                <AppBar position="static" className="studio-tabs">
                  <Tabs value={student} onChange={handleTabChange} aria-label="availability">
                    {getStudentsTab().map((item, i) => (
                      <Tab label={item} wrapped={true} key={i} {...a11yProps(i)} />
                    ))}
                  </Tabs>
                </AppBar>
              : ''}
              {displayTabContent()}
            </>
            : displayEmptyContent()
          }
        </Grid>
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
    dashboard: state.user.user.dashboard as ParentStudentDashboardType
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchDashboard: (role: Role) => dispatch(fetchDashboard(role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(StudioParent, 'Private', ['Student', 'Parent']));
