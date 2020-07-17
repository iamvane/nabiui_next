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
  Chip,
  Grid,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import { fetchDashboard } from '../../redux/actions/UserActions';
import { getCookie } from "../../utils/cookies";
import { Routes } from '../common/constants/Routes';
import PageTitle from '../common/PageTitle';
import { Role } from '../Auth/Registration/constants';
import PrivateRoute from '../Auth/PrivateRoutes';
import { ParentStudioComponent }  from './constants';
import '../../../assets/scss/StudioParent.scss';

import {
  LessonType,
  ParentStudentDashboardType
} from '../Dashboard/models';
// import LessonCard from './LessonCard';

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
    {
      id: 0,
      name: 'Zoe',
      nextLesson: {
        date: '',
        time: '',
        instructor: '',
        zoomLink: ''
      },
      instrument: '',
      lessons: [
        {
          id: 0,
          date: '06/24/20 @ 5pm',
          status: 'scheduled',
          instructor: 'Bryan P.',
          instructorId: 243,
          grade: 3,
          gradeComment: ''

        },
        {
          id: 0,
          date: '06/24/20 @ 5pm',
          status: 'scheduled',
          instructor: 'Bryan P.',
          instructorId: 243,
          grade: 3,
          gradeComment: ''

        },
        {
          id: 0,
          date: '06/24/20 @ 5pm',
          status: 'scheduled',
          instructor: 'Bryan P.',
          instructorId: 243,
          grade: 3,
          gradeComment: ''

        }
      ]
    },
  ]
};

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

  // const displayLessons = () => (
  //   props.dashboard && props.dashboard.lessons.length > 0 ?
  //   props.dashboard.lessons.map((lesson: LessonType, i) => (
  //     <Grid item={true} key={i} xs={12} md={6}>
  //       <LessonCard lesson={lesson} />
  //     </Grid>
  //   )) :
  //   <Grid item={true} xs={12}>
  //     <div className="nabi-background-white nabi-border-radius nabi-padding-small">
  //       <Typography><span>{InstructorStudioComponent.noStudents}</span></Typography>
  //       <Link href={Routes.Requests}>
  //         <Button
  //           color="primary"
  //           variant="contained"
  //           className="nabi-display-block nabi-margin-top-small"
  //         >
  //           {InstructorStudioComponent.findStudentsButton}
  //         </Button>
  //       </Link>
  //     </div>
  //   </Grid>
  // );

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (event) event.preventDefault();

    setStudent(newValue);
    // setLessonDate(moment().add(newValue + 1,'days').format("YYYY-MM-DD"));
    // setLessonTime('');
  };

  const getStudentsTab = (): string[] => {
    let studentsArray = [];
    parentsStudentboardDummyData.students.map(student => studentsArray.push(student.name))

    return studentsArray;
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
        <Grid item={true} xs={12}>
          <div className="nabi-background-white nabi-border-radius nabi-padding-small">
            <ScheduleIcon color="primary" className="text-aligned-icon" />
            {props.dashboard && props.dashboard.nextLesson && props.dashboard.nextLesson.id ?
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">
                {ParentStudioComponent.nextLesson.replace(
                  ParentStudioComponent.datePlaceholder,
                  (moment(props.dashboard.nextLesson.date).calendar().split(" at"))[0]
                ).replace(
                  ParentStudioComponent.timePlaceholder,
                  moment(props.dashboard.nextLesson.time, "h:mm").format("h:mmA")
                ).replace(
                  ParentStudioComponent.instructorPlaceholder,
                  props.dashboard.nextLesson.instructor
                )}
              </Typography>
              :
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">{ParentStudioComponent.noNextLesson}</Typography>}
          </div>
        </Grid>
      </Grid>
      <Grid container={true} spacing={1}>
        {/* {displayLessons()} */}
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
