import * as React from 'react';
import Link from 'next/link';
import Router from "next/router";
import { connect } from 'react-redux';
import * as _ from "lodash";
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
  Tooltip
} from '@material-ui/core';
import Star from "@material-ui/icons/Star";
import ScheduleIcon from '@material-ui/icons/Schedule';
const reactStringReplace = require('react-string-replace');
import { instrumentDisplay } from '../../utils/displayInstrument';
import { StoreState } from '../../redux/reducers/store';
import { fetchDashboard } from '../../redux/actions/UserActions';
import { getCookie, setCookie, removeCookie } from "../../utils/cookies";
import { Routes } from '../common/constants/Routes';
import PageTitle from '../common/PageTitle';
import { Role } from '../Auth/Registration/constants';
import PrivateRoute from '../Auth/PrivateRoutes';
import {
  ParentStudioComponent,
  LessonStatuses,
  MissingFieldsComponent,
  missingFieldsDisplay,
  missingFieldsArray,
  menuItems
} from './constants';
import { LessonStatus } from './LessonStatus';
import { MissingFields } from "../MissingFields/MissingFields";

import { ParentStudentDashboardType } from '../Dashboard/models';
import { Header } from '../Header/Header';
import { Footer } from "../common/Footer";

interface StateProps {
  dashboard: ParentStudentDashboardType;
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
      await props.fetchDashboard();
    }
    fetchData();
  }, []);

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

  const isValidTimeForZoom = (lessonTime: string, lessonDate: string) => {
    const time = lessonTime.split(':')
    const timeDate = moment(new Date(lessonDate))
      .hour(Number(time[0]))
      .add(Number(time[1]), "minutes")
      .subtract(10, "minutes");
    if (Date.now() > Date.parse(timeDate.toISOString())) return true;
    return false;
  }

  const renderJoinZoom = (lessonTime: string, lessonDate: string, zoomLink) => {
    if (isValidTimeForZoom(lessonTime, lessonDate)) {
      return (<a className="nabi-cursor-pointer" href={zoomLink} target={'_blank'} rel="noreferrer">
        <Typography className="nabi-display-flex nabi-margin-left-xsmall" color="primary">
          {ParentStudioComponent.clickToJoinLesson}
          <img className="parent-join-lesson-img nabi-margin-left-xsmall" src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/teacher.png" alt="teacher" />
        </Typography>
      </a>)
    }

    return (
      <Tooltip title={ParentStudioComponent.nextLessonTooltipTitle} placement="top">
        <Typography className="nabi-display-flex nabi-margin-left-xsmall" color="primary">
          {ParentStudioComponent.clickToJoinLesson}
          <img className="parent-join-lesson-img nabi-margin-left-xsmall" src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/teacher.png" alt="teacher" />
        </Typography>
      </Tooltip>
    );
  }

  const displayEmptyContent = () => (
    <Grid item={true} xs={12} md={8} className="nabi-background-white nabi-border-radius nabi-padding-small nabi-margin-top-small nabi-margin-center nabi-text-center">
      <Typography>{ParentStudioComponent.noStudentsDescription}</Typography>
      <Link href={Routes.BookTrial + Routes.LessonDetails}>
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

    Router.push(Routes.BookTrial + Routes.InstructorPreferences)
  }

  const buyMoreLessons = (studentId) => {
    setCookie("studentId", studentId);

    return Router.push(Routes.BookLessons + '/' + studentId);
  }

  const renderMissingReviewsMessage = (missingFields) => {
    const missingFieldsMessage = [];
    missingFields.forEach((field) => {
      if (typeof field === 'object' && field.reviews && field.reviews.length) {
        field.reviews.forEach((review) => {
          const reviewUrl = missingFieldsDisplay.reviews.url.replace(MissingFieldsComponent.replaceInstructorId, `${review.instructorId}`)
          let message = missingFieldsDisplay
            .reviews
            .label.replace(MissingFieldsComponent.replaceStudentName, review.studentName);
          message = message.replace(MissingFieldsComponent.replaceInstructorName, review.instructorName);
          message = reactStringReplace(
            message,
            MissingFieldsComponent.replaceUrl,
            (i: number) => (
              <Link
                key={i}
                href={`${reviewUrl}?role=${role}&studentName=${review.studentName}&instructorName=${review.instructorName}`}
              ><a className="nabi-color-white nabi-text-decoration-underline" target={'_blank'} rel="noreferrer">{missingFieldsDisplay.reviews.urlText}</a>
              </Link>
            )
          )
          missingFieldsMessage.push(
            <span className="nabi-color-white">{message}</span>
          )
        })
      }

      if (typeof field === 'string' && missingFieldsArray.includes(field)) {
        let message = reactStringReplace(
          missingFieldsDisplay[field].label,
          MissingFieldsComponent.replaceUrl,
          (i: number) => (
            <Link
              key={i}
              href={{
                pathname: missingFieldsDisplay[field].url
              }}
            ><a className="nabi-color-white nabi-text-decoration-underline" target={'_blank'} rel="noreferrer">{missingFieldsDisplay[field].urlText}</a>
            </Link>
          )
        )
        missingFieldsMessage.push(
          <span className="nabi-color-white">{message}</span>
        )
      }
    })

    return missingFieldsMessage;
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
      // order lessons by date
      function compare(a, b) {
        const dateA = a.date;
        const dateB = b.date;
        let comparison = 0;
        if (dateA > dateB) {
          comparison = 1;
        } else if (dateA < dateB) {
          comparison = -1;
        }
        return comparison;
      }

      let sortedArray = item.lessons.sort(compare);

      const rows = sortedArray.map(item => (
        createData(item.date, item.status, item.instructor, item.instructorId, item.grade, item.id)
      ));

      return (
        <TabPanel value={student} index={i} key={i}>
          <div className="nabi-display-flex nabi-flex-align-baseline nabi-background-white nabi-border-radius nabi-padding-small">
            <ScheduleIcon color="primary" className="text-aligned-icon" />
            {item.nextLesson.id ?
              <div className="parent-next-lesson-container">
                <Typography className="nabi-display-inline nabi-margin-left-xsmall nabi-margin-bottom-xsmall">
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

                {
                  item.nextLesson.zoomLink && renderJoinZoom(item.nextLesson.time, item.nextLesson.date, item.nextLesson.zoomLink)
                }
              </div>
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
                          {row.date ? row.date : 'TBD'}
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

  const checkMissingField = (missingFields: any[]) => {
    if (missingFields.length > 1) {
      return true;
    }
    const field = missingFields.find((field) => field.reviews) as any;
    if (field.reviews.length) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <Header
        drawerMenuItems={menuItems}
        // headerMenuItems={[]}
        privateRoute={true}
      />
      <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md nabi-margin-bottom-large">
        <PageTitle pageTitle={pageTitle()} />
        {props.isFetchingDashboard ?
          <CircularProgress /> :
          <Grid container={true} spacing={0}>
            {
              props.dashboard && props.dashboard.missingFields && checkMissingField(props.dashboard.missingFields) ?
                <MissingFields>
                  {renderMissingReviewsMessage(props.dashboard.missingFields)}
                </MissingFields> :
                null
            }
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
      <Footer />
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
  fetchDashboard: () => dispatch(fetchDashboard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(StudioParent, 'Private', ['Student', 'Parent']));
