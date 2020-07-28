import {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  bindActionCreators
} from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Router from "next/router";

import {
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';

import { StoreState } from '../../redux/reducers/store';
import { fetchUser } from '../../redux/actions/UserActions';
import { buildJobPreferences } from '../../redux/actions/InstructorActions';
import { Routes } from '../common/constants/Routes';
import { SkillLevel } from '../Instruments/constants';
import { InstructorType } from '../../redux/models/InstructorModel';
import { InstrumentsType } from '../Instruments/model';
import * as ProfileBuilderConstants from '../ProfileBuilder/constants';
import { fields } from './ProfileStep/ProfileStepValidator';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import ConfirmExit from '../CommonStepper/ConfirmExit';
import Instruments from '../Instruments/Instruments';
import Rates from '../Rates/Rates';
import PlaceForLessonsForm from '../PlaceForLessons/PlaceForLessonsForm';
import Availability from '../Availability/Availability';
import Qualification from '../Qualifications/Qualifications';
import JobPreferences from '../JobPreferences/JobPreferences';
import Languages from '../Languages/Languages';
import SnackBar from '../common/SnackBar';

export const JobPreferencesStep = () => {
  const jobPreferences = [
    'instruments',
    'jobPreferences',
    'rates',
    'availability',
    'qualifications',
    'languages'
  ];
  const [instruments, setInstruments] = useState({
    instruments: [],
    instrument: '',
    skillLevel: '' as SkillLevel
  });

  const [languages, setLanguages] = useState({
    languages: [],
    language: ''
  });
  const [availability, setAvailability] = useState(ProfileBuilderConstants.availability);
  const [rates, setRates] = useState(ProfileBuilderConstants.rates);
  const [qualifications, setQualification] = useState(ProfileBuilderConstants.qualifications);
  const [sizeAgePreference, setSizeAgePreference] = useState(ProfileBuilderConstants.sizeAgePreferences);
  const [studioAddress, setStudioAddress] = useState("");
  const [travelDistance, setTravelDistance] = useState("");

  const [steps, setStep] = useState([1]);

  const [currentStep, setCurrentStep] = useState(0);

  const [enableContinue, setEnableContinue] = useState(ProfileBuilderConstants.enableContinueBtn);
  const [showSnackbar, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState("");
  const [exitFormIsOpen, setExitFormOpen] = useState(false);
  const [allFieldsFilledError, setAllFieldsFilledError] = useState('');

  const [userProfile, setUserProfile] = useState({});
  const closeSnackbar = () => setSnackbarOpen(false);
  const closeExitForm = () => setExitFormOpen(false);
  const handleProceed = () => {
    Router.push(Routes.HomePage);
  }

  let {
    instructor,
    user,
    isFetchingUser,
    isRequesting,
    buildJobPreferencesError
  } = useSelector((state: StoreState) => {
    const {
      instructor,
      actions: {
        buildJobPreferences: {
          isRequesting,
          error: buildJobPreferencesError,
        },
      },
    } = state.instructor;

    return {
      instructor,
      user: state.user.user,
      isRequesting,
      buildJobPreferencesError,
      isFetchingUser: state.user.actions.fetchUser.isRequesting
    };
  });

  const confirmSelectedPreferences = (name: string, preference: string) => {
    if (preference === 'sizeAgePreference') {
      const lessonSizes = Object.keys(ProfileBuilderConstants.sizeAgePreferences.lessonSize);
      const ageGroup = Object.keys(ProfileBuilderConstants.sizeAgePreferences.ageGroup);
      return lessonSizes.concat(ageGroup).includes(name);
    }
    return Object.keys(ProfileBuilderConstants[preference]).includes(name);
  }

  const addInstrument = useCallback(
    () => {
      const instrumentToAdd: InstrumentsType = {
        instrument: instruments.instrument,
        skillLevel: instruments.skillLevel
      };
      if (instruments.instruments.find(t => t.instrument === instrumentToAdd.instrument)) {
        return;
      } else if (instrumentToAdd.instrument && instrumentToAdd.skillLevel) {
        setInstruments(prevState => ({
          ...prevState,
          instruments: [...prevState.instruments, instrumentToAdd],
          instrument: '',
          skillLevel: SkillLevel.beginner
        }));

        setEnableContinue(prevState => ({
          ...prevState,
          instruments: true
        }));

        setStep(prevState => ([
          ...prevState,
        ]));
      }
    },
    [instruments]
  );

  const deleteInstrument = useCallback(
    (instrumentName: string) => {
      setInstruments(prevState => {
        const currentState = {
          ...prevState,
          instruments: prevState.instruments.filter(instrument =>
            instrumentName.indexOf(instrument.instrument) === -1)
        }
        if (!currentState.instruments.length) {
          setEnableContinue(prevState => ({
            ...prevState,
            instruments: false
          }));
        }
        return currentState;
      });
    },
    []
  )

  const addLanguage = useCallback(
    () => {
      if (languages.languages.find(t => t === languages.language)) {
        return;
      } else if (languages.language) {
        setLanguages(prevState => ({
          ...prevState,
          languages: [
            ...prevState.languages,
            languages.language
          ]
        }));

        setEnableContinue(prevState => ({
          ...prevState,
          languages: true
        }));

        setStep(prevState => ([
          ...prevState,
        ]));
      }
    },
    [languages]
  );

  const deleteLanguage = useCallback(
    (languageName: string) => {
      setLanguages(prevState => {
        const currentState = {
          ...prevState,
          languages: prevState.languages.filter(language =>
            languageName.indexOf(language) === -1)
        }

        if (!currentState.languages.length) {
          setEnableContinue(prevState => ({
            ...prevState,
            languages: false
          }));
        }
        return currentState;
      });
    },
    []
  );

  const renderAvailabilityCheckbox = (stateName: string): JSX.Element => {
    return (
      <Checkbox
        checked={availability[stateName]}
        name={stateName}
        onChange={handleChange}
      />
    );
  }

  const dispatch = useDispatch();
  const fetchUserAction = bindActionCreators(fetchUser, dispatch);
  const buildJobPreferencesAction = bindActionCreators(buildJobPreferences, dispatch);
  const profile = user.profile as InstructorType;

  useEffect(() => {
    fetchUserAction();

  }, [JSON.stringify(user)]);

  useEffect(() => {
    if (profile) {
      const hasSomeJobPreferences = confirmSomeProfileDetails(profile);
      if (!hasSomeJobPreferences) {
        setCurrentStep(0);
        setStep(prevState => ([
          ...prevState,
        ]));
      }

      if (hasSomeJobPreferences) {
        setCurrentStep(5);
        setStep(prevState => ([
          ...prevState,
          2, 3, 4, 5, 6
        ]));
        setEnableContinue(prevState => ({
          ...prevState,
          instruments: true,
          jobPreferences: true,
          qualifications: true,
          rates: true,
          availability: true,
          languages: true
        }));
      }
      if (profile.instruments) {
        setInstruments(prevState => ({
          ...prevState,
          instruments: profile.instruments
        }));
      }

      if (profile.lessonSize && profile.ageGroup) {
        setSizeAgePreference(prevState => ({
          ...prevState,
          lessonSize: {
            ...prevState.lessonSize,
            ...profile.lessonSize
          },
          ageGroup: {
            ...prevState.ageGroup,
            ...profile.ageGroup
          }
        }));
      }

      if (profile.rates) {
        setRates(prevState => ({
          ...prevState,
          ...profile.rates
        }))
      }

      if (profile.travelDistance) {
        setTravelDistance(profile.travelDistance);
      }

      if (profile.studioAddress) {
        setStudioAddress(profile.studioAddress);
      }

      if (profile.availability) {
        setAvailability(prevState => ({
          ...prevState,
          ...profile.availability
        }));
      }

      if (profile.qualifications) {
        setQualification(prevState => ({
          ...prevState,
          ...profile.qualifications
        }));
      }

      if (profile.languages) {
        setLanguages(prevState => ({
          ...prevState,
          languages: [
            ...profile.languages
          ]
        }));
      }
    }
  }, [JSON.stringify(user.profile)]);

  const confirmSomeProfileDetails = (profile) => {
    const details = [
      'instrument',
      'lessonSize',
      'ageGroup',
      'rates',
      'availability',
      'qualifications'
    ];
    return details.some((detail) => {
      if (profile[detail] && profile[detail].constructor.name === 'Object') {
        return Object.values(profile[detail]).length > 0;
      }
      if (profile[detail] && Array.isArray(profile[detail])) {
        return profile[detail].length > 0;
      }
    });
  }

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): any => {
      const target = event.currentTarget;
      const value = target.type === 'checkbox' ? target.checked : target.value as any;
      const name = target.name;

      if (name === 'instrument' || name === 'skillLevel') {
        setInstruments(prevState => ({
          ...prevState,
          [name]: value
        }));
      }

      if (name === 'language') {
        setLanguages(prevState => ({
          ...prevState,
          [name]: value
        }))
      }
      if (confirmSelectedPreferences(name, 'sizeAgePreference')) {
        const lessonSize = sizeAgePreference.lessonSize;
        const ageGroup = sizeAgePreference.ageGroup;
        setSizeAgePreference(prevState => {
          const currentState = {
            ...prevState,
            ...(Object.keys(lessonSize).includes(name) && {
              lessonSize: {
                ...prevState.lessonSize,
                [name]: value
              }
            }),
            ...(Object.keys(ageGroup).includes(name) && {
              ageGroup: {
                ...prevState.ageGroup,
                [name]: value
              }
            })
          }

          const hasLessonSize = Object.values(currentState.lessonSize).some(lesson => lesson);
          const hasAgeGroup = Object.values(currentState.ageGroup).some(age => age);

          if (hasLessonSize && hasAgeGroup) {
            setEnableContinue(prevState => ({
              ...prevState,
              jobPreferences: true
            }));
          } else {
            setEnableContinue(prevState => ({
              ...prevState,
              jobPreferences: false
            }));
          }
          return currentState;
        });
      }

      if (confirmSelectedPreferences(name, 'rates')) {
        setRates((prevState) => {
          const currentState = {
            ...prevState,
            mins30: value,
            mins45: 0,
            mins60: 0,
            mins90: 0
          }

          setEnableContinue(prevState => ({
            ...prevState,
            rates: currentState.mins30 > 0
          }));
          return currentState;
        });
      }

      if (confirmSelectedPreferences(name, 'availability')) {
        setAvailability(prevState => {
          const currentAvailibility = {
            ...prevState,
            [name]: value
          }
          setEnableContinue(prevState => ({
            ...prevState,
            availability: Object.values(currentAvailibility).some(availability => availability)
          }));
          return currentAvailibility
        });
      }

      if (confirmSelectedPreferences(name, 'qualifications')) {
        setQualification(prevState => {
          const currentQualifications = {
            ...prevState,
            [name]: value
          }

          setEnableContinue(prevState => ({
            ...prevState,
            qualifications: Object.values(currentQualifications).some(qualification => qualification)
          }));
          return currentQualifications
        });
      }
      if (name === 'studioAddress') {
        setStudioAddress(value);
      }
      if (name === 'distance') {
        setTravelDistance(value)
      }
    },
    []
  );

  const handleNext = useCallback(
    () => {
      const jobPreferences: InstructorType = {
        rates,
        lessonSize: sizeAgePreference.lessonSize,
        ageGroup: sizeAgePreference.ageGroup,
        placeForLessons: {
          home: false,
          studio: false,
          online: true,
        },
        availability,
        ...(studioAddress && {
          studioAddress
        }),
        ...(travelDistance && {
          travelDistance
        }),
        qualifications,
        instruments: instruments.instruments,
        languages: languages.languages,
      };

      if (steps.length < 6) {
        setStep(prevState => {
          const updatedSteps = [
            ...prevState,
            steps[steps.length - 1] + 1
          ];
          return updatedSteps;
        });
        setCurrentStep(prevState => prevState + 1);
      } else {
        if (validateAllSelectedFields(
          availability,
          rates,
          qualifications,
          sizeAgePreference,
          instruments,
          languages
        )) {

          let profile = Object.keys(jobPreferences).map((preference) => {
            return {
              [preference]: user.profile[preference]
            }
          }) as { [x: string]: any };
          profile = profile.reduce((prev, current) => {
            return {
              ...prev,
              [Object.keys(current)[0]]: current[Object.keys(current)[0]]
            }
          }, {});
          delete profile.studioAddress;
          delete profile.travelDistance;

          const equal = Object.keys(profile).every((p) => {
            return JSON.stringify(profile[p]) === JSON.stringify(jobPreferences[p]);
          });
          if (!equal) {
            buildJobPreferencesAction(jobPreferences);
          }
        } else {
          setAllFieldsFilledError("All fields must be filled");
        }
      }
    },
    [
      steps,
      JSON.stringify(availability),
      JSON.stringify(rates),
      JSON.stringify(qualifications),
      JSON.stringify(sizeAgePreference),
      JSON.stringify(instruments.instruments),
      JSON.stringify(languages.languages),
      studioAddress,
      travelDistance,
      buildJobPreferencesError
    ]
  );

  useEffect(() => {
    if (user.profile) {
      if (!Object.entries(userProfile).length) {
        setUserProfile(user.profile);
      }
      const equal = Object.keys(instructor).every((p) => {
        return JSON.stringify(instructor[p]) === JSON.stringify(userProfile[p]);
      });

      if (Object.entries(userProfile).length && !equal) {
        Router.push(Routes.BuildProfile + ProfileBuilderConstants
          .ProfileBuilderStepper.StepsPaths.Education
        );
        setUserProfile(user.profile);
      }
    }
    if (buildJobPreferencesError) {
      setSnackbarOpen(true);
      setSnackBarMessage(buildJobPreferencesError);
    }
  }, [JSON.stringify(user.profile), JSON.stringify(instructor), buildJobPreferencesError]);

  const handleExit = useCallback(
    () => {
      const allSelected = confirmSomeSelectedFields(
        availability,
        rates,
        qualifications,
        sizeAgePreference,
        instruments,
        languages
      );
      if (allSelected) {
        setExitFormOpen(true);
      } else {
        Router.push(Routes.InstructorStudio);
      }
    },
    [
      JSON.stringify(availability),
      JSON.stringify(rates),
      JSON.stringify(qualifications),
      JSON.stringify(sizeAgePreference),
      instruments.instruments,
      languages.languages,
      studioAddress,
      travelDistance,
    ]
  )

  const validateAllSelectedFields = (
    availability,
    rates,
    qualifications,
    sizeAgePreference,
    instruments,
    languages
  ) => {
    return fieldsInputCheck(
      availability,
      rates,
      qualifications,
      sizeAgePreference,
      instruments,
      languages
    ).every((selected) => selected === true);
  }

  const fieldsInputCheck = (
    availability,
    rates,
    qualifications,
    sizeAgePreference,
    instruments,
    languages
  ) => {
    const availabilityIsSelected = Object.values(availability).some((available) => available === true);
    const allRatesAreSelected = rates.mins30 > 0;
    const qualificationIsSelected = Object.values(qualifications).some((qualification) => qualification === true);
    const lessonSizeIsSelected = Object.values(sizeAgePreference.lessonSize).some((size) => size === true);
    const ageGroupIsSelected = Object.values(sizeAgePreference.ageGroup).some((age) => age === true);
    const instrumentIsSelected = instruments.instruments.length > 0;
    const languageIsSelected = languages.languages.length > 0;
    return [
      availabilityIsSelected,
      allRatesAreSelected,
      qualificationIsSelected,
      lessonSizeIsSelected,
      ageGroupIsSelected,
      instrumentIsSelected,
      languageIsSelected
    ];
  }

  const confirmSomeSelectedFields = (
    availability,
    rates,
    qualifications,
    sizeAgePreference,
    instruments,
    languages
  ) => {
    return fieldsInputCheck(
      availability,
      rates,
      qualifications,
      sizeAgePreference,
      instruments,
      languages
    ).some((selected) => selected === true);
  }

  return (
    <div>
      {isFetchingUser ?
        <div className="nabi-text-center">
          <CircularProgress />
        </div> :
        <div>
          {steps.includes(1) && (
            <div className="nabi-margin-bottom-large">
              <Instruments
                instruments={instruments.instruments.length > 0 ? instruments.instruments : undefined}
                instrument={instruments.instrument}
                skillLevel={instruments.skillLevel}
                handleChange={handleChange}
                addInstrument={addInstrument}
                deleteInstrument={deleteInstrument}
              />
            </div>
          )}
          {steps.includes(2) && (
            <div className="nabi-margin-bottom-large">
              <JobPreferences
                handleChange={handleChange}
                oneStudent={sizeAgePreference.lessonSize.oneStudent}
                smallGroups={sizeAgePreference.lessonSize.smallGroups}
                largeGroups={sizeAgePreference.lessonSize.largeGroups}
                children={sizeAgePreference.ageGroup.children}
                teens={sizeAgePreference.ageGroup.teens}
                adults={sizeAgePreference.ageGroup.adults}
                seniors={sizeAgePreference.ageGroup.seniors}
              />
            </div>
          )}

          {steps.includes(3) && (
            <div className="nabi-margin-bottom-large">
              <Rates
                handleChange={handleChange}
                mins30={rates.mins30}
              />
            </div>
          )}

          {steps.includes(4) && (
            <div className="nabi-margin-bottom-large">
              <Availability
                renderCheckbox={renderAvailabilityCheckbox}
                handleChange={handleChange}
              />
            </div>
          )}

          {steps.includes(5) && (
            <div className="nabi-margin-bottom-large">
              <Qualification
                handleChange={handleChange}
                certifiedTeacher={qualifications.certifiedTeacher}
                musicTherapy={qualifications.musicTherapy}
                musicProduction={qualifications.musicProduction}
                earTraining={qualifications.earTraining}
                conducting={qualifications.conducting}
                virtuosoRecognition={qualifications.virtuosoRecognition}
                performance={qualifications.performance}
                musicTheory={qualifications.musicTheory}
                youngChildrenExperience={qualifications.youngChildrenExperience}
                repertoireSelection={qualifications.repertoireSelection}
              />
            </div>
          )}

          {steps.includes(6) && (
            <Languages
              languages={languages.languages}
              handleChangeLanguage={handleChange}
              addLanguage={addLanguage}
              language={languages.language}
              deleteLanguage={deleteLanguage}
            />
          )}
        </div>}
      <StepperButtons
        backPath={Routes.BuildProfile + ProfileBuilderConstants
          .ProfileBuilderStepper.StepsPaths.Profile
        }
        handleNext={handleNext}
        icon={<ArrowForward />}
        isNextDisabled={!enableContinue[jobPreferences[currentStep]] ? true : false}
        isRequesting={isRequesting || isFetchingUser}
        errors={allFieldsFilledError}
        handleExit={handleExit}
      />
      <SnackBar
        isOpen={showSnackbar}
        message={snackbarMessage}
        handleClose={closeSnackbar}
        variant="error"
      />
      <ConfirmExit
        isFormDialogOpen={exitFormIsOpen}
        handleProceed={handleProceed}
        closeHandler={closeExitForm}
      />
    </div>
  )
}
