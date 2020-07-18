import * as React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import moment from 'moment';
import {
  AppBar,
  Button,
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
import { getCookie } from "../../utils/cookies";
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

export const parentsStudentboardDummyData = {
  students: [
  //   {
  //     id: 0,
  //     name: 'Zoe',
  //     nextLesson: {
  //       id: 1,
  //       date: '2020-04-03',
  //       time: '16:00',
  //       instructor: 'Bryan P.',
  //       zoomLink: ''
  //     },
  //     instrument: 'piano',
  //     lessons: [
  //       {
  //         id: 0,
  //         date: '06/24/20 @ 5pm',
  //         status: 'scheduled',
  //         instructor: 'Bryan P.',
  //         instructorId: 243,
  //         grade: 2,
  //         gradeComment: ''
  //       },
  //       {
  //         id: 0,
  //         date: '06/24/20 @ 5pm',
  //         status: 'scheduled',
  //         instructor: 'Bryan P.',
  //         instructorId: 243,
  //         grade: 1,
  //         gradeComment: ''
  //       },
  //       {
  //         id: 0,
  //         date: '06/24/20 @ 5pm',
  //         status: 'complete',
  //         instructor: 'Bryan P.',
  //         instructorId: 243,
  //         grade: 3,
  //         gradeComment: ''
  //       }
  //     ]
  //   },
  //   {
  //     id: 0,
  //     name: 'Ezme',
  //     nextLesson: {
  //       id: 15,
  //       date: '2020-11-24',
  //       time: '13:00',
  //       instructor: 'Matt M.',
  //       zoomLink: ''
  //     },
  //     instrument: 'guitar-acoustic',
  //     lessons: [
        // {
        //   id: 0,
        //   date: '06/24/20 @ 5pm',
        //   status: 'scheduled',
        //   instructor: 'Bryan P.',
        //   instructorId: 243,
        //   grade: 0,
        //   gradeComment: ''
        // },
        // {
        //   id: 0,
        //   date: '06/24/20 @ 5pm',
        //   status: 'complete',
        //   instructor: 'Bryan P.',
        //   instructorId: 243,
        //   grade: 3,
        //   gradeComment: 'Amazing work!'
        // },
        // {
        //   id: 0,
        //   date: '06/24/20 @ 5pm',
        //   status: 'missed',
        //   instructor: 'Bryan P.',
        //   instructorId: 243,
        //   grade: 0,
        //   gradeComment: ''
        // }
    //   ]
    // }
  ]
};

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
    parentsStudentboardDummyData.students.map(student => studentsArray.push(student.name))

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

  const displayTabContent = () => {
    // if (parentsStudentboardDummyData.students.length < 1) {
    //   return ''
    // }

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

    return parentsStudentboardDummyData.students.length < 1 ?
      <div className="nabi-background-white nabi-border-radius nabi-padding-small nabi-margin-top-small">
        <span>Schedule Trial</span>
      </div>
      :
      parentsStudentboardDummyData.students.map((item, i) => {
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
                  ParentStudioComponent.instructorPlaceholder,
                  item.nextLesson.instructor
                )}
              </Typography>
              :
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">{ParentStudioComponent.noNextLesson}</Typography>}
          </div>
          <div className="nabi-background-white nabi-border-radius nabi-padding-small nabi-margin-top-small">
            <Grid container={true}>
              <Grid item={true} xs={12} md={6}>
                <p className="nabi-color-nabi nabi-jennasue-title nabi-margin-bottom-zero nabi-margin-top-zero">
                  {ParentStudioComponent.studentDescription.replace(
                    ParentStudioComponent.namePlaceholder,
                    item.name).replace(
                      ParentStudioComponent.instrumentPlaceholder,
                      instrumentDisplay(item.instrument)
                    )}
                </p>
              </Grid>
              <Grid item={true} xs={12} md={6} className="nabi-text-right-md">
                <Button
                  variant="contained"
                  color="primary"
                  className="nabi-margin-top-small-md"
                >
                  {ParentStudioComponent.buyMoreLessonsButton}
                </Button>
              </Grid>
            </Grid>
            <TableContainer className="nabi-margin-top-small nabi-margin-bottom-small">
              {item.lessons.length < 1 ?
              <span>No lessons</span> :
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
                        <TableCell><Link href={`${Routes.Profile}/${row.instructorId}`}><a>{row.instructor}</a></Link></TableCell>
                        <TableCell>{displayGradeStars(row.grade)}</TableCell>
                        <TableCell>{row.status === 'scheduled' ?
                          <Button variant="contained" color="primary" className="nabi-responsive-button">
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

  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md nabi-margin-bottom-large">
      <PageTitle pageTitle={role === Role.parent ?
        ParentStudioComponent.pageTitleParent.replace(
          ParentStudioComponent.namePlaceholder,
          getCookie('firstName')) :
          ParentStudioComponent.pageTitlrStudent.replace(
            ParentStudioComponent.namePlaceholder,
            getCookie('firstName'))
        } />
      <Grid container={true} spacing={0}>
        <AppBar position="static" className="studio-tabs">
          <Tabs value={student} onChange={handleTabChange} aria-label="availability">
            {getStudentsTab().map((item, i) => (
              <Tab label={item} wrapped={true} key={i} {...a11yProps(i)} />
            ))}
          </Tabs>
        </AppBar>
        {displayTabContent()}
      </Grid>
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
