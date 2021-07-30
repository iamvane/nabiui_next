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
  FormLabel,
  Typography,
  FormControl,
  Select,
  ButtonGroup
} from '@material-ui/core';

import { languages } from '../../../assets/data/languages';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import ArrowdownIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
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
import { RequestType } from '../Request/models';
import { NewRequestComponent } from '../Request/constants';
import PrivateRoute from '../Auth/PrivateRoutes';
import { Header } from '../Header/Header';
import { Footer } from "../common/Footer";

interface DispatchProps {
  scheduleLesson: (lessonDetails: Partial<LessonType>) => void;
}

interface OwnProps {
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

const initialAvailabilityDetails = {
  firstChoice: {
    dayOfTheWeekFirstChoice: "",
    timeFrameFirstChoice: "",
  },
  secondChoice: {
    dayOfTheWeekSecondChoice: "",
    timeFrameSecondChoice: "",
  },
  thirdChoice: {
    dayOfTheWeekThirdChoice: "",
    timeFrameThirdChoice: ""
  }
} as {
  [x: string]: {
    [x: string]: string;
  }
}

export const ScheduleLessons = (props: Props) => {
  const [lessonDate, setLessonDate] = React.useState(moment().add(1, 'days').format("YYYY-MM-DD"));
  const [lessonTime, setLessonTime] = React.useState('');
  const [weekday, setWeekday] = React.useState(0);
  const [scheduleLesson, setScheduleLesson] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarDetails, setSnackBarDetails] = React.useState({ type: "", message: "" })
  const [calendarIsOpen, setCalendarOpen] = React.useState(true);
  const [trialAvailabilityDetails, setTrialAvailabilityDetails] = React.useState(initialAvailabilityDetails);
  const [selectedLanguage, selectTrialLanguage] = React.useState('english');
  const [gender, setGender] = React.useState('female');

  const allTrialsIsSelected = Object.keys(trialAvailabilityDetails).every((choice) => {
    if (trialAvailabilityDetails[choice]) {
      return Object.keys(trialAvailabilityDetails[choice]).every((value) => {
        if (!trialAvailabilityDetails[choice][value]) {
          return false;
        }
        return true;
      });
    }
  });

  const validateTrialForm = [
    gender,
    selectedLanguage,
    allTrialsIsSelected
  ].every((validValues) => {
    if (validValues) return true;
  })

  React.useEffect(() => {
    if (props.message) {
      setSnackBarDetails({
        type: "success",
        message: ScheduleLessonsComponent.SuccessMessage
      });
      setShowSnackbar(true);
      Router.push(Routes.ParentStudio);
    }
    if (props.request && props.request.availability && props.request.availability.length) {
      setSnackBarDetails({
        type: "success",
        message: ScheduleLessonsComponent.SuccessMessage
      });
      setShowSnackbar(true);
      Router.push(Routes.ParentStudio);
    }
  }, [props.message, JSON.stringify(props.request)]);

  React.useEffect(() => {
    if (props.error) {
      setSnackBarDetails({
        type: "error",
        message: props.error
      });
      return setShowSnackbar(true);
    }

    if (props.createRequestError) {
      setSnackBarDetails({
        type: "error",
        message: props.createRequestError
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
      track('Request Created', analiticsProps);

      const nextRoute = Routes.BookingDetails;
      Router.push(nextRoute);
    }
  }, [scheduleLesson, props.error, props.createRequestError]);

  // get month day year
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number) => {
    if (event) event.preventDefault();
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value as any;
    const name = target.name;

    if (name === 'trialLanguage') {
      selectTrialLanguage(value);
    }

    if (Object.keys(trialAvailabilityDetails.firstChoice).includes(name)) {
      setTrialAvailabilityDetails({
        ...trialAvailabilityDetails,
        firstChoice: {
          ...trialAvailabilityDetails.firstChoice,
          [name]: value
        }
      })
    }

    if (Object.keys(trialAvailabilityDetails.secondChoice).includes(name)) {
      setTrialAvailabilityDetails({
        ...trialAvailabilityDetails,
        secondChoice: {
          ...trialAvailabilityDetails.secondChoice,
          [name]: value
        }
      })
    }

    if (Object.keys(trialAvailabilityDetails.thirdChoice).includes(name)) {
      setTrialAvailabilityDetails({
        ...trialAvailabilityDetails,
        thirdChoice: {
          ...trialAvailabilityDetails.thirdChoice,
          [name]: value
        }
      })
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
  );

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

    await props.scheduleLesson(lesson)

    setScheduleLesson(true);
  };

  const role = getCookie('role');

  return (
    <div>
      <Header />
      <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium">
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
            <Grid xs={12} md={7} className="nabi-background-white nabi-section nabi-margin-center">
              <div className="nabi-text-center">
                <PageTitle
                  pageTitle={role === Role.parent ?
                      ScheduleLessonsComponent.pageTitleParent.replace(
                        ScheduleLessonsComponent.studentPlaceholder,
                        getCookie('studentName')
                      ) : ScheduleLessonsComponent.pageTitle}
                />
              </div>
              <form noValidate={true} autoComplete="off" onSubmit={handleSubmit} id="login-form">
                <div className="nabi-text-center nabi-margin-bottom-small">
                  <DateRangeIcon className="text-aligned-icon" color="primary" />
                  <Typography className="nabi-margin-top-small">
                    <span className="nabi-text-mediumbold nabi-color-nabi nabi-text-uppercase">Timezone:</span>  <span className="nabi-text-uppercase">Eastern Standard</span>
                  </Typography>
                </div>

                {displayTabContent()}
                <div className="nabi-text-right">
                  <Button
                    color="primary"
                    className="nabi-text-uppercase nabi-margin-top-medium nabi-margin-bottom-small nabi-margin-right-small"
                    onClick={() => {
                      setCalendarOpen(true)
                    }}
                  >
                    {ScheduleLessonsComponent.backToCalendarButton}
                  </Button>
                  <Button
                    color="primary"
                    className="nabi-text-uppercase nabi-margin-top-medium nabi-margin-bottom-small"
                    variant="contained"
                    type="submit"
                    disabled={lessonTime || validateTrialForm ? false : true}
                  >
                    {ScheduleLessonsComponent.nextButton}
                  </Button>
                </div>
              </form>
            </Grid>
        }
        <SnackBar
          isOpen={showSnackbar}
          message={snackbarDetails.message}
          handleClose={() => setShowSnackbar(false)}
          variant={snackbarDetails.type}
        />
      </div>
      <Footer />
    </div>
  )
};

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
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(ScheduleLessons, 'Private', ['Student', 'Parent']));

