import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Action,
  Dispatch
} from 'redux';
import Router from "next/router";

import {
  AppBar,
  Button,
  Chip,
  Grid,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import '../../../assets/scss/ScheduleLessons.scss';
import { scheduleLesson } from '../../redux/actions/RequestActions';
import { getCookie, setCookie, } from "../../utils/cookies";
import { Timezone } from '../../redux/models/TimeZonesModel';
import { StoreState } from '../../redux/reducers/store';
import PageTitle from '../common/PageTitle';
import SnackBar from '../common/SnackBar';
import { Role } from '../../constants/Roles';
import { Routes } from '../common/constants/Routes';
import { StudentDetailsType } from '../Dashboard/ParentStudentDashboard/model';
import { LessonType } from '../BookLessons/model';
import {
  ScheduleLessonsComponent,
} from './constants';

interface DispatchProps {
  scheduleLesson: (lessonDetails: Partial<LessonType>, lessonId: number) => void;
}

interface OwnProps {
  nextPath?: string;
  pageTitle?: string;
  isTrial?: boolean;
}

interface StateProps {
  isScheduling: boolean;
  error: string;
  userTimezone: string;
  message: string;
}

interface Props extends
  DispatchProps,
  StateProps,
  OwnProps {
  }

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} className="time-slots-wrapper nabi-padding-top-small nabi-padding-left-xsmall nabi-padding-right-xsmall nabi-padding-bottom-small nabi-margin-bottom-small">
      <Typography>{value === index && children}</Typography>
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ScheduleLessons = (props: Props) => {
  const [lessonDate, setLessonDate] = React.useState(moment().add(1, 'days').format("YYYY-MM-DD"));
  const [lessonTime, setLessonTime] = React.useState('');
  const [weekday, setWeekday] = React.useState(0);
  const [scheduleLesson, setScheduleLesson] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  React.useEffect(() => {
    if (props.error) {
      return setShowSnackbar(true);
    }

    if (scheduleLesson) {
      const nextRoute = props.nextPath || Routes.BookingDetails;
      Router.push(nextRoute);
    }
  }, [scheduleLesson, props.error]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (event) event.preventDefault();

    setWeekday(newValue);
    setLessonDate(moment().add(newValue + 1,'days').format("YYYY-MM-DD"));
    setLessonTime('');
  };

  const displayWeek = () => {
    const tomorrow  = moment().add(1,'days').format('MMM DD');
    const weekFromTomorrow  = moment().add(7,'days').format('MMM DD');

    return `${tomorrow} - ${weekFromTomorrow}`;
  }

  const getWeekDays = (): string[] => {
    const date = moment();
    const dow = date.day();
    const currentIndex = dow;
    const tomorrow  = moment().add(1,'days').format('DD');

    let daysArray = ScheduleLessonsComponent.weekdaysLabels.slice(currentIndex);
    daysArray = daysArray.concat(ScheduleLessonsComponent.weekdaysLabels.slice(0, currentIndex));

    let numbersArray = [];
    for (let i = 0; i < 7; i++) {
      numbersArray.push(("0" + String(Number(tomorrow) + i)).slice(-2));
    }

    daysArray.forEach((name, index) => daysArray[index] = `${name} ${numbersArray[index]}`);

    return daysArray;
  }

  const handleSetLessonTime = (value: string) => {
    if (lessonTime) {
      setLessonTime('');
    }
    setLessonTime(value);
  }

  const displayAmTimes = (scheduleChips) => (
    scheduleChips.map((item, i) => (
      <Grid item={true} xs={6} md={4} key={i}>
        <Chip
          className="nabi-full-width"
          onClick={() => handleSetLessonTime(item.value)
          }
          color={item.value === lessonTime ? "primary" : 'default'}
          label={item.label}
        />
      </Grid>
    ))
  )

  const displayTabContent = () => (
    ScheduleLessonsComponent.weekdaysLabels.map((item, i) => (
      <TabPanel value={weekday} index={i} key={i}>
        <Typography className="nabi-text-uppercase nabi-text-mediumbold nabi-margin-bottom-xsmall">AM</Typography>
        <Grid container={true} spacing={1}>
          {displayAmTimes(ScheduleLessonsComponent.amScheduleChips)}
        </Grid>
        <Typography className="nabi-text-uppercase nabi-text-mediumbold nabi-margin-bottom-xsmall nabi-margin-top-small">PM</Typography>
        <Grid container={true} spacing={1}>
          {displayAmTimes(ScheduleLessonsComponent.pmScheduleChips)}
        </Grid>
      </TabPanel>
    ))
  )

  const handleSubmit = async (event: React.FormEvent<{}>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    setCookie('lessonDate', lessonDate);
    setCookie('lessonTime', lessonTime);

    const lesson: LessonType = {
      date: lessonDate,
      time: lessonTime
    }

    let lessonId;

    if (props.isTrial) {
      const studentId = getCookie('studentId');
      lesson.studentId = studentId;
    } else {
      lessonId = getCookie('lessonId');
    }

    await props.scheduleLesson(lesson, lessonId)
    setScheduleLesson(true);
  };

  const role = getCookie('role');

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <PageTitle
        pageTitle={props.pageTitle ? props.pageTitle :
          role === Role.parent ?
          ScheduleLessonsComponent.pageTitleParent.replace(
            ScheduleLessonsComponent.studentPlaceholder,
            getCookie('studentName')
          ) :
          ScheduleLessonsComponent.pageTitle}
      />
      <Grid
        item={true}
        xs={12}
        md={8} className="nabi-section nabi-background-white nabi-margin-center"
      >
        <form noValidate={true} autoComplete="off" onSubmit={handleSubmit} id="login-form">
          <div className="nabi-text-center nabi-margin-bottom-small">
            <DateRangeIcon className="text-aligned-icon" color="primary" />
            <Typography className="nabi-display-inline nabi-text-mediumbold nabi-margin-left-xsmall">
              <span className="nabi-color-nabi">{displayWeek()}</span>
            </Typography>
            <Typography className="nabi-margin-top-small">
              <span className="nabi-text-mediumbold nabi-color-nabi nabi-text-uppercase">Timezone:</span>  <span className="nabi-text-uppercase">Eastern Standard</span>
            </Typography>
          </div>
          <AppBar position="static">
            <Tabs value={weekday} onChange={handleChange} aria-label="availability">
              {getWeekDays().map((item, i) => (
                <Tab label={item} wrapped={true} key={i} {...a11yProps(i)} />
              ))}
            </Tabs>
          </AppBar>
          {displayTabContent()}
          <div className="nabi-text-right">
            <Button
              color="primary"
              className="nabi-text-uppercase nabi-margin-top-medium nabi-margin-bottom-small"
              variant="contained"
              type="submit"
              disabled={!lessonDate || !lessonTime}
            >
              Next
            </Button>
          </div>
        </form>
      </Grid>
      <SnackBar
        isOpen={showSnackbar}
        message={props.error}
        handleClose={() => setShowSnackbar(false)}
        variant="error"
      />
    </div>
  )
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    students,
    actions: {
      scheduleLessons: {
        isRequesting: isScheduling,
        error,
        message
      },
    },
  } = state.requests;

  return {
    isScheduling,
    error,
    message,
    userTimezone: '',
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  scheduleLesson: (lesson: Partial<LessonType>, lessonId) => dispatch(scheduleLesson(lesson, lessonId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleLessons);
