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
  Divider,
  FormControl,
  Select,
  ButtonGroup
} from '@material-ui/core';

import { languages } from '../../../assets/data/languages';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import CheckMarkIcon from '@material-ui/icons/Check';
import ArrowdownIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
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
import { RequestType } from '../Request/models';
import { NewRequestComponent } from '../Request/constants';
import PrivateRoute from '../Auth/PrivateRoutes';
import { Header } from '../Header/Header';
import { Footer } from "../common/Footer";

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
  const [calendarIsOpen, setCalendarOpen] = React.useState(false);
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

  const selectGender = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const value = event.currentTarget.value;
    setGender(value);
  }

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
      const trialDetails: RequestType = {
        availability: [],
      };

      const studentId = getCookie('studentId');
      if (role === Role.parent) {
        trialDetails.studentId = studentId;
      }

      const selectedTrialAvailabilityTimes = Object.keys(trialAvailabilityDetails).map((choice) => {
        if (choice === 'firstChoice') {
          return {
            day: trialAvailabilityDetails[choice].dayOfTheWeekFirstChoice,
            timeframe: trialAvailabilityDetails[choice].timeFrameFirstChoice
          }
        }
        if (choice === 'secondChoice') {
          return {
            day: trialAvailabilityDetails[choice].dayOfTheWeekSecondChoice,
            timeframe: trialAvailabilityDetails[choice].timeFrameSecondChoice
          }
        }

        if (choice === 'thirdChoice') {
          return {
            day: trialAvailabilityDetails[choice].dayOfTheWeekThirdChoice,
            timeframe: trialAvailabilityDetails[choice].timeFrameThirdChoice
          }
        }
      }) as { day: string; timeframe: string }[];
      trialDetails.availability = selectedTrialAvailabilityTimes;
      trialDetails.gender = gender;
      trialDetails.language = selectedLanguage;

      await props.createRequest(trialDetails)
    } else {
      await props.scheduleLesson(lesson)
    }
    setScheduleLesson(true);
  };

  const role = getCookie('role');

  const renderedLanguages = languages.map(language => {
    const languageValue = (language.name).toLowerCase();
    return (
      <option key={language.name} value={languageValue}>{language.name}</option>
    );
  });

  const renderedTrialTimes = Object.entries(NewRequestComponent.timeframeLabels).map(timeFrame => {

    if (trialAvailabilityDetails.firstChoice.timeFrameFirstChoice === timeFrame[0]) {
      return (<option className="nabi-color-nabi nabi-text-semibold" key={timeFrame[1]} value={timeFrame[0]}>
        &#10003; {timeFrame[1]}
      </option>)
    }
    if (trialAvailabilityDetails.secondChoice.timeFrameSecondChoice === timeFrame[0]) {
      return (<option className="nabi-color-nabi nabi-text-semibold" key={timeFrame[1]} value={timeFrame[0]}>
        &#10003; {timeFrame[1]}
      </option>)
    }
    if (trialAvailabilityDetails.thirdChoice.timeFrameThirdChoice === timeFrame[0]) {
      return (<option className="nabi-color-nabi nabi-text-semibold" key={timeFrame[1]} value={timeFrame[0]}>
        &#10003; {timeFrame[1]}
      </option>)
    }
    return (
      <option key={timeFrame[1]} value={timeFrame[0]}>{timeFrame[1]}</option>
    );
  });

  const renderedDaysOfTheWeek = Object.entries(NewRequestComponent.weekdaysLabels).map(day => {
    return (
      <option key={day[1]} value={day[0]}>{day[1]}</option>
    );
  });


  const renderGenderSelection = () => {
    return (
      <FormControl className="trial-select__form--container">
        <FormLabel className="nabi-margin-bottom-xsmall">
          {TrialTimesAddedComponent.gender}
        </FormLabel>
        <ButtonGroup className="trial-select__btn-group" variant="text" aria-label="text primary button group">
          <Button
            classes={{
              label: `trial-select__label ${gender === "female" ? "trial-select__gender" : ""}`
            }}
            className="trial-select__btn"
            value="female"
            onClick={selectGender}
          >{TrialTimesAddedComponent.female}</Button>
          <Button
            classes={{
              label: `trial-select__label ${gender === "male" ? "trial-select__gender" : ""}`
            }}
            className="trial-select__btn"
            value="male"
            onClick={selectGender}
          >{TrialTimesAddedComponent.male}</Button>
          <Button
            classes={{
              label: `trial-select__label ${gender === "noPreference" ? "trial-select__gender" : ""}`
            }}
            className="trial-select__btn"
            value="noPreference"
            onClick={selectGender}
          >{TrialTimesAddedComponent.noPreference}</Button>
        </ButtonGroup>
      </FormControl>
    )
  }

  const renderLanguageSelect = () => {
    return (
      <div className="trial-select__form--container">
        <FormControl className="trial-select__language">
          <FormLabel>
            {TrialTimesAddedComponent.language}
          </FormLabel>
          <Select
            classes={{
              select: "trial-time__select"
            }}
            native={true}
            onChange={handleChange}
            IconComponent={() => (<ArrowdownIcon color="action" />)}
            value={selectedLanguage}
            inputProps={{
              id: "trialLanguage",
              name: "trialLanguage"
            }}
          >
            <option value="" disabled={true}>
              {TrialTimesAddedComponent.selectLanguage}
            </option>
            {renderedLanguages}
          </Select>
        </FormControl>
      </div>
    )
  }

  const renderTrialSelect = () => {
    return (
      <>
        <FormLabel className="nabi-margin-bottom-xsmall nabi-display-block">
          {TrialTimesAddedComponent.trialAvailability}
        </FormLabel>
        <span>{TrialTimesAddedComponent.selectThreeTrials}</span>
        {
          [{
            dayOfTheWeek: "dayOfTheWeekFirstChoice",
            timeFrame: "timeFrameFirstChoice"
          }, {
            dayOfTheWeek: "dayOfTheWeekSecondChoice",
            timeFrame: "timeFrameSecondChoice"
          }, {
            dayOfTheWeek: "dayOfTheWeekThirdChoice",
            timeFrame: "timeFrameThirdChoice"
          }].map((value, index) => (
            <Grid container={true} key={index} spacing={1} className="nabi-display-flex nabi-flex-wrap">
              <Grid item={true} xs={6}>
                <FormControl className="trial-select__form--day-of-week">
                  <Select
                    classes={{
                      select: "trial-time__select"
                    }}
                    native={true}
                    IconComponent={() => (<CalendarIcon color="action" />)}
                    onChange={handleChange}
                    value={(() => {
                      if (trialAvailabilityDetails.firstChoice[value.dayOfTheWeek]) {
                        return trialAvailabilityDetails.firstChoice[value.dayOfTheWeek]
                      }
                      if (trialAvailabilityDetails.secondChoice[value.dayOfTheWeek]) {
                        return trialAvailabilityDetails.secondChoice[value.dayOfTheWeek]
                      }

                      if (trialAvailabilityDetails.thirdChoice[value.dayOfTheWeek]) {
                        return trialAvailabilityDetails.thirdChoice[value.dayOfTheWeek]
                      }
                      return '';
                    })()}
                    inputProps={{
                      id: `${value.dayOfTheWeek}`,
                      name: `${value.dayOfTheWeek}`
                    }}
                  >
                    <option value="" disabled={true}>
                      {TrialTimesAddedComponent.selectWeekDay}
                    </option>
                    {renderedDaysOfTheWeek}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item={true} xs={6}>
                <FormControl className="trial-select__form--day-of-week">
                  <Select
                    classes={{
                      select: "trial-time__select"
                    }}
                    native={true}
                    onChange={handleChange}
                    IconComponent={() => (<ArrowdownIcon color="action" />)}
                    value={
                      (() => {
                        if (trialAvailabilityDetails.firstChoice[value.timeFrame]) {
                          return trialAvailabilityDetails.firstChoice[value.timeFrame]
                        }
                        if (trialAvailabilityDetails.secondChoice[value.timeFrame]) {
                          return trialAvailabilityDetails.secondChoice[value.timeFrame]
                        }

                        if (trialAvailabilityDetails.thirdChoice[value.timeFrame]) {
                          return trialAvailabilityDetails.thirdChoice[value.timeFrame]
                        }
                        return '';
                      })()
                    }
                    inputProps={{
                      id: `${value.timeFrame}`,
                      name: `${value.timeFrame}`
                    }}
                  >
                    <option value="" disabled={true}>
                      {TrialTimesAddedComponent.selectTime}
                    </option>
                    {renderedTrialTimes}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ))
        }
        <Footer />
      </>
    )
  }

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
                  pageTitle={props.pageTitle ? props.pageTitle :
                    role === Role.parent ?
                      ScheduleLessonsComponent.pageTitleParent.replace(
                        ScheduleLessonsComponent.studentPlaceholder,
                        getCookie('studentName')
                      ) :
                      ScheduleLessonsComponent.pageTitle}
                />
              </div>
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
                      {renderGenderSelection()}
                      {renderLanguageSelect()}
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

