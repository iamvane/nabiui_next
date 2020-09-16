import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Action,
  Dispatch
} from 'redux';
import Router from "next/router";

import {
  Button,
  Chip,
  Grid,
  Typography,
  Divider,
  FormControl,
  Select
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Add from '@material-ui/icons/Add';
import '../../../assets/scss/ScheduleLessons.scss';
import { scheduleLesson, createRequest } from '../../redux/actions/RequestActions';
import { getCookie, setCookie, } from "../../utils/cookies";
import { track } from '../../utils/analytics';
import { StoreState } from '../../redux/reducers/store';
import PageTitle from '../common/PageTitle';
import SnackBar from '../common/SnackBar';
import { Role } from '../../constants/Roles';
import { Routes } from '../common/constants/Routes';
import { LessonType } from '../BookLessons/model';
import { ScheduleLessonsComponent, TrialTimesAddedComponent } from './constants';
import { Calendar } from './Calendar';
import TrialtimesAdded from './TrialtimesAdded';
import { RequestType } from '../Request/models';
import { NewRequestComponent } from '../Request/constants';
import PrivateRoute from '../Auth/PrivateRoutes';


interface DispatchProps {
  scheduleLesson: (lessonDetails: Partial<LessonType>) => void;
  createRequest: (trialDetail: RequestType) => void;
}

interface OwnProps {
  nextPath?: string;
  pageTitle?: string;
  isTrial?: boolean;
  openCalendar?: () => void;
  calendarDate?: string;
}

interface StateProps {
  isCreatingRequest: boolean;
  createRequestError: string;
  request: RequestType;
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
  const [snackbarDetails, setSnackBarDetails] = React.useState({ type: "", message: "" })
  const [calendarIsOpen, setCalendarOpen] = React.useState(false);
  const [selectedTimeFrame, selectTimeFrame] = React.useState('');
  const [selectedDayOfTheWeek, selectDayOfTheWeek] = React.useState('');
  const [selectedTrialTimes, selectTrialTimes] = React.useState([]);

  React.useEffect(() => {
    if (!props.isTrial) {
      setCalendarOpen(true);
    }
  }, [props.isTrial]);

  React.useEffect(() => {
    if (props.message) {
      setSnackBarDetails({
        type: "success",
        message: ScheduleLessonsComponent.SuccessMessage
      });
      setShowSnackbar(true);
      Router.push(Routes.ParentStudio);
    }
    if (props.request.availability && props.request.availability.length) {
      setSnackBarDetails({
        type: "success",
        message: ScheduleLessonsComponent.SuccessMessage
      });
      setShowSnackbar(true);
      Router.push(Routes.ParentStudio);
    }
  }, [props.message, JSON.stringify(props.request)]);

  React.useEffect(() => {
    if (props.error || props.createRequestError) {
      setSnackBarDetails({
        type: "error",
        message: props.error
      });
      return setShowSnackbar(true);
    }

    if (scheduleLesson) {
      const userEmail = getCookie('userEmail');
      const analiticsProps = {
        userId: userEmail,
        properties: {
          referrer: document.referrer
        }
      };
      track('Trial Started', analiticsProps);

      const nextRoute = props.nextPath || Routes.BookingDetails;
      Router.push(nextRoute);
    }
  }, [scheduleLesson, props.error, props.createRequestError]);

  // get month day year
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number) => {
    if (event) event.preventDefault();
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value as any;
    const name = target.name;

    if (name === 'timeFrame') {
      selectTimeFrame(value);
    }

    if (name === 'dayOfTheWeek') {
      selectDayOfTheWeek(value);
    }

    setWeekday(newValue);
    setLessonDate(moment().add(newValue + 1, 'days').format("YYYY-MM-DD"));
    setLessonTime('');
  };

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

    if (props.isTrial) {
      const studentId = getCookie('studentId');
      lesson.studentId = studentId;
      const trialDetails = {
        availability: selectedTrialTimes,
        studentId
      } as RequestType
      await props.createRequest(trialDetails)
    } else {
      await props.scheduleLesson(lesson)
    }
    setScheduleLesson(true);
  };

  const role = getCookie('role');

  const renderedTrialTimes = Object.entries(NewRequestComponent.timeframeLabels).map(timeFrame => {
    return (
      <option key={timeFrame[1]} value={timeFrame[0]}>{timeFrame[1]}</option>
    );
  });

  const renderedDaysOfTheWeek = Object.entries(NewRequestComponent.weekdaysLabels).map(day => {
    return (
      <option key={day[1]} value={day[0]}>{day[1]}</option>
    );
  });

  const deleteTrialTime = React.useCallback(
    (day: string, timeFrame: string) => {
      selectTrialTimes(prevState => {
        const current = prevState.filter(time => {
          if (time.day === day && time.timeframe === timeFrame) return false;
          return true;
        });
        return current;
      });
    },
    []
  )

  const renderSelectedTrialTimes = selectedTrialTimes.map((time, i) => (
    <TrialtimesAdded
      key={i}
      day={time.day}
      timeFrame={time.timeframe}
      deleteTrialTime={(day: string, timeFrame: string) => deleteTrialTime(day, timeFrame)}
    />
  ));

  const addTrialTimes = React.useCallback(
    () => {
      const trialTimeToAdd = {
        day: selectedDayOfTheWeek,
        timeframe: selectedTimeFrame
      };

      const trialTimeExists = selectedTrialTimes.find(t => {
        if (t.day === trialTimeToAdd.day && t.timeframe === trialTimeToAdd.timeframe) return true;
        return false;
      })
      if (trialTimeExists) {
        return;
      } else if (trialTimeToAdd.day && trialTimeToAdd.timeframe) {
        selectTrialTimes(prevState => ([
          ...prevState,
          trialTimeToAdd
        ]));
      }
    },
    [selectedTimeFrame, selectedDayOfTheWeek, selectedTrialTimes]
  );

  const renderTrialSelect = () => {
    return (
      <div className="trial-select__form--container">
        <FormControl className="trial-select__form--day-of-week">
          <Select
            className="trial-time__select"
            native={true}
            onChange={handleChange}
            value={selectedDayOfTheWeek}
            inputProps={{
              id: "dayOfTheWeek",
              name: "dayOfTheWeek"
            }}
          >
            <option value="" disabled={true}>
              {TrialTimesAddedComponent.selectWeekDay}
            </option>
            {renderedDaysOfTheWeek}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            className="trial-time__select"
            native={true}
            onChange={handleChange}
            value={selectedTimeFrame}
            inputProps={{
              id: "timeFrame",
              name: "timeFrame"
            }}
          >
            <option value="" disabled={true}>
              {TrialTimesAddedComponent.selectTime}
            </option>
            {renderedTrialTimes}
          </Select>
        </FormControl>
        <FormControl>
          <Button
            color="primary"
            variant="contained"
            className="nabi-text-uppercase nabi-margin-top-xsmall nabi-padding-xsmall"
            disabled={selectedTrialTimes.length === 3 ? true : false}
            onClick={addTrialTimes}
          >
            <Add className="nabi-margin-right-xsmall" />
          Add
        </Button>
        </FormControl>
      </div>
    )
  }

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      {
        calendarIsOpen ?
          <Calendar
            closeCalendar={() => {
              setCalendarOpen(false);
            }}
            handleCalendarDate={(date) => {
              setLessonDate(date)
            }}
          /> :
          <>
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
                {
                  !props.isTrial ?
                    <div className="nabi-text-center nabi-margin-bottom-small">
                      <DateRangeIcon className="text-aligned-icon" color="primary" />
                      <Typography className="nabi-margin-top-small">
                        <span className="nabi-text-mediumbold nabi-color-nabi nabi-text-uppercase">Timezone:</span>  <span className="nabi-text-uppercase">Eastern Standard</span>
                      </Typography>
                    </div> :
                    <>
                      <span className="nabi-text-mediumbold nabi-color-nabi nabi-text-uppercase">{TrialTimesAddedComponent.trialAvailability}</span>
                      <Divider className="nabi-margin-bottom-xsmall nabi-margin-top-xsmall" />
                      <span>{TrialTimesAddedComponent.selectThreeTrials}</span>
                      {selectedTrialTimes.length ? renderSelectedTrialTimes : null}
                      {renderTrialSelect()}
                    </>
                }

                {props.isTrial ? null : displayTabContent()}
                <div className="nabi-text-right">
                  {
                    !props.isTrial && (
                      <Button
                        color="primary"
                        className="nabi-text-uppercase nabi-margin-top-medium nabi-margin-bottom-small nabi-margin-right-small"
                        onClick={() => {
                          setCalendarOpen(true)
                        }}
                      >
                        {ScheduleLessonsComponent.backToCalendarButton}
                      </Button>
                    )
                  }
                  <Button
                    color="primary"
                    className="nabi-text-uppercase nabi-margin-top-medium nabi-margin-bottom-small"
                    variant="contained"
                    type="submit"
                    disabled={lessonTime || selectedTrialTimes.length === 3 ? false : true}
                  >
                    {ScheduleLessonsComponent.nextButton}
                  </Button>
                </div>
              </form>
            </Grid>
          </>
      }
      <SnackBar
        isOpen={showSnackbar}
        message={snackbarDetails.message}
        handleClose={() => setShowSnackbar(false)}
        variant={snackbarDetails.type}
      />
    </div>
  )
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    students,
    request,
    actions: {
      createRequest: {
        isRequesting: isCreatingRequest,
        error: createRequestError
      },
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
    request,
    isCreatingRequest,
    createRequestError
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  scheduleLesson: (lesson: Partial<LessonType>) => dispatch(scheduleLesson(lesson)),
  createRequest: (trialDetails: RequestType) => dispatch(createRequest(trialDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(ScheduleLessons, 'Private', ['Student', 'Parent']));

