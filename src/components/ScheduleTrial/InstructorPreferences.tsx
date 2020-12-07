import * as React from 'react';
import { connect } from 'react-redux';

import {
  Action,
  Dispatch
} from 'redux';
import Router from "next/router";

import {
  FormLabel,
  CircularProgress
} from '@material-ui/core';

import {
  Button,
  Grid,
  FormControl,
  Select,
  SegmentControl
} from 'nabi_web_components';

import { languages } from '../../../assets/data/languages';
import '../../../assets/scss/ScheduleLessons.scss';
import { createRequest } from '../../redux/actions/RequestActions';
import { getCookie } from "../../utils/cookies";
import { track } from '../../utils/analytics';
import { StoreState } from '../../redux/reducers/store';
import PageTitle from '../common/PageTitle';
import { Role } from '../../constants/Roles';
import { Routes } from '../common/constants/Routes';
import { InstructorPreferencesComponent } from './constants';
import { RequestType } from '../Request/models';
import { NewRequestComponent } from '../Request/constants';
import PrivateRoute from '../Auth/PrivateRoutes';
import { Header } from '../Header/Header';
import { Footer } from "../common/Footer";
import SnackBar from '../common/SnackBar';

interface DispatchProps {
  createRequest: (trialDetail: RequestType) => void;
}

interface StateProps {
  isCreatingRequest: boolean;
  createRequestError: string;
  request: RequestType;
}

interface Props extends
  DispatchProps,
  StateProps {
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

export const InstructorPreferences = (props: Props) => {
  const genderSegments = [InstructorPreferencesComponent.female, InstructorPreferencesComponent.male, InstructorPreferencesComponent.noPreference];
  const [createRequest, setCreateRequest] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarDetails, setSnackBarDetails] = React.useState({ type: "", message: "" })
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
    if (props.createRequestError) {
      setSnackBarDetails({
        type: "error",
        message: InstructorPreferencesComponent.error
      });
      return setShowSnackbar(true);
    }

    setCreateRequest(false);
  }, [createRequest, props.createRequestError]);

  React.useEffect(() => {
    if (props.request && props.request.id) {
      const userEmail = getCookie('userEmail');
      const analiticsProps = {
        userId: userEmail,
        properties: {
          referrer: document.referrer
        }
      };
      track('Request Created', analiticsProps);

      Router.push(Routes.BookTrial + Routes.BestMatch);
    }

    setCreateRequest(false);
  }, [createRequest, props.request]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) event.preventDefault();
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value as any;
    const name = target.name;

    if (name === 'trialLanguage') {
      selectTrialLanguage(value);
    }

    if (genderSegments.map((option) => option.toLowerCase()).includes(name)) {
      setGender(value);
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
  };

  const handleSubmit = async (event: React.FormEvent<{}>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }
    const trialDetails: RequestType = {
      availability: [],
    };

    const studentId = getCookie('studentId');
    if (role === Role.parent) {
      trialDetails.studentId = studentId;
    }

    if (gender !== 'no-preference') {
      trialDetails.gender = gender;
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
    trialDetails.language = selectedLanguage;

    await props.createRequest(trialDetails);

    setCreateRequest(true);
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
          {InstructorPreferencesComponent.gender}
        </FormLabel>
        <SegmentControl
          handleChange={handleChange}
          names={genderSegments}
          checked={false}
          selected={gender}
        />
      </FormControl>
    )
  }

  const renderLanguageSelect = () => {
    return (
      <div className="trial-select__form--container">
        <FormControl className="trial-select__language">
          <FormLabel>
            {InstructorPreferencesComponent.language}
          </FormLabel>
          <Select
            className="trial-time__select"
            native={true}
            onChange={handleChange}
            value={selectedLanguage}
            id="trialLanguage"
            name="trialLanguage"
          >
            <option value="" disabled={true}>
              {InstructorPreferencesComponent.selectLanguage}
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
          {InstructorPreferencesComponent.trialAvailability}
        </FormLabel>
        <span>{InstructorPreferencesComponent.selectThreeTrials}</span>
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
                    id={`${value.dayOfTheWeek}`}
                    name={`${value.dayOfTheWeek}`}
                  >
                    <option value="" disabled={true}>
                      {InstructorPreferencesComponent.selectWeekDay}
                    </option>
                    {renderedDaysOfTheWeek}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item={true} xs={6}>
                <FormControl className="trial-select__form--day-of-week">
                  <Select
                    className="trial-time__select"
                    native={true}
                    onChange={handleChange}
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
                    id={`${value.timeFrame}`}
                    name={`${value.timeFrame}`}
                  >
                    <option value="" disabled={true}>
                      {InstructorPreferencesComponent.selectTime}
                    </option>
                    {renderedTrialTimes}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ))
        }
      </>
    )
  }

  return (
    <div>
      <Header />
        <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium">
            <Grid xs={12} md={7} className="nabi-background-white nabi-section nabi-margin-center">
              {props.isCreatingRequest && <div className="nabi-text-center"><CircularProgress /></div>}
              <PageTitle pageTitle={InstructorPreferencesComponent.pageTitle} />
              <form noValidate={true} autoComplete="off" onSubmit={handleSubmit} id="login-form">
                <>
                  {renderGenderSelection()}
                  {renderLanguageSelect()}
                  {renderTrialSelect()}
                </>
                <div className="nabi-text-right">
                  <Button
                    color="primary"
                    className="nabi-text-uppercase nabi-margin-top-medium nabi-margin-bottom-small"
                    variant="contained"
                    type="submit"
                    disabled={validateTrialForm ? false : true}
                  >
                    {InstructorPreferencesComponent.nextButton}
                  </Button>
                </div>
              </form>
            </Grid>
        </div>
        <SnackBar
          isOpen={showSnackbar}
          message={snackbarDetails.message}
          handleClose={() => setShowSnackbar(false)}
          variant={snackbarDetails.type}
        />
      <Footer />
    </div>
  )
}

function mapStateToProps(state: StoreState, _ownProps: {}): StateProps {
  const {
    request,
    actions: {
      createRequest: {
        isRequesting: isCreatingRequest,
        error: createRequestError
      },
    },
  } = state.requests;

  return {
    request,
    isCreatingRequest,
    createRequestError
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  createRequest: (trialDetails: RequestType) => dispatch(createRequest(trialDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(InstructorPreferences, 'Private', ['Student', 'Parent']));


