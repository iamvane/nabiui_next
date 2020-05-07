import * as React from 'react';
import {
  Action,
  Dispatch
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';
import Router from "next/router";

import {
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';

import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';
import { fetchUser } from '../../redux/actions/UserActions';
import { buildJobPreferences } from '../../redux/actions/InstructorActions';
import { Routes } from '../common/constants/Routes';
import { PlaceForLessonsType } from '../PlaceForLessons/model';
import { RatesType } from '../Rates/model';
import { SkillLevel } from '../Instruments/constants';
import { InstructorType } from '../../redux/models/InstructorModel';
import { InstrumentsType } from '../Instruments/model';
import {
  LessonSizeType,
  AgeGroupType
} from '../JobPreferences/model';
import { QualificationsType } from '../Qualifications/model';
import { ProfileBuilderStepper } from '../ProfileBuilder/constants';
import { fields } from './ProfileStep/ProfileStepValidator';
import  { ValidatorState as ProfileStepValidatorState } from '../../utils/Validator';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import Instruments from '../Instruments/Instruments';
import Rates from '../Rates/Rates';
import PlaceForLessonsForm from '../PlaceForLessons/PlaceForLessonsForm';
import Availability from '../Availability/Availability';
import { AvailabilityType } from '../Availability/model';
import Qualification from '../Qualifications/Qualifications';
import JobPreferences from '../JobPreferences/JobPreferences';
import Languages from '../Languages/Languages';
import { JobPreferencesType } from '../ProfileBuilder/models';
import { AvailabilityComponent } from '../Availability/constants';
import { placeForLessonsOptions } from '../PlaceForLessons/constants';
import { qualificationsOptions, } from "../Qualifications/constants"


interface StateProps {
  user: UserType;
  isRequesting: boolean;
  buildJobPreferencesError: string;
  isFetchingUser: boolean;
}

interface DispatchProps {
  buildJobPreferences: (instructor: InstructorType) => void;
  fetchUser: () => void;
}

interface OwnProps {}

interface State extends
  JobPreferencesType,
  ProfileStepValidatorState {
  name: string;
  language: string;
  skillLevel: SkillLevel;
  availability: AvailabilityType;
  fields: any;
}

interface Props extends
  DispatchProps,
  OwnProps,
  StateProps { }

/**
 * Profile: First step of the Profile Builder
 */
export class JobPreferencesStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      language: '',
      instruments: [],
      languages: [],
      availability: AvailabilityComponent.availability,
      mins30: 0,
      mins45: 0,
      mins60: 0,
      mins90: 0,
      home: false,
      studio: false,
      online: false,
      fields : fields,
      oneStudent: false,
      smallGroups: false,
      largeGroups: false,
      children: false,
      teens: false,
      adults: false,
      seniors: false,
      certifiedTeacher: false,
      musicTherapy: false,
      musicProduction: false,
      earTraining: false,
      conducting: false,
      virtuosoRecognition: false,
      performance: false,
      musicTheory: false,
      youngChildrenExperience: false,
      repertoireSelection: false,
      instrument: '',
      skillLevel: '' as SkillLevel,
      step: [1],
      currentStep: 0,
      continue: false,
      continueStepBtnEnabled: {
        instruments: false,
        jobPreferences: false,
        rates: false,
        placeForLessons:false,
        availability: false,
        qualifications: false,
        languages: false
      },
      jobPreferences: [
        'instruments',
        'jobPreferences',
        'rates',
        'placeForLessons',
        'availability',
        'qualifications',
        'languages'
      ]
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.props.fetchUser();
    const profile = this.props.user.profile as InstructorType;
    
    // set instruments state
    if (profile) {
      if (profile.instruments) {
        this.setState({
          instruments: profile.instruments
        }, () => {
          if (this.state.instruments.length > 0) {
            const {
              step,
              continueStepBtnEnabled
            } = this.state;

            this.setState({
              step: [
                ...step,
              ],
              currentStep: 0,
              continueStepBtnEnabled: {
                ...continueStepBtnEnabled,
                instruments: true
              }
            });
          }
        });
      }

      // set lessonSize state
      if (profile.lessonSize) {
        this.setState({
          oneStudent: profile.lessonSize.oneStudent,
          smallGroups: profile.lessonSize.smallGroups,
          largeGroups: profile.lessonSize.largeGroups,
        }, () => {
          // set ageGroup state
          if (profile.ageGroup) {
            this.setState({
              children: profile.ageGroup.children,
              teens: profile.ageGroup.teens,
              adults: profile.ageGroup.adults,
              seniors: profile.ageGroup.seniors,
            }, () => {
              if (this.confirmSelectedJobPreferences(this.state)) {
                const {
                  step,
                  continueStepBtnEnabled
                } = this.state;
    
                this.setState({
                  step: [...step, 2],
                  currentStep: 1,
                  continueStepBtnEnabled: {
                    ...continueStepBtnEnabled,
                    jobPreferences: true
                  }
                });
              }
            });
          }
        });
      }

      // set rates state
      if (profile.rates) {
        this.setState({
          mins30: profile.rates.mins30,
          mins45: profile.rates.mins45,
          mins60: profile.rates.mins60,
          mins90: profile.rates.mins90,
        }, () => {
          if (this.confirmSelectedRates(this.state)) {
            const {
              step,
              continueStepBtnEnabled
            } = this.state;

            this.setState({
              step: [...step, 3],
              currentStep: 2,
              continueStepBtnEnabled: {
                ...continueStepBtnEnabled,
                rates: true
              }
            });
          }
        });
      }

      // set placeForLesson state
      if (profile.placeForLessons) {
        this.setState({
          home: profile.placeForLessons.home,
          studio: profile.placeForLessons.studio,
          online: profile.placeForLessons.online
        }, () => {
          if (this.confirmSelectedPlaces(this.state)) {
            const {
              step,
              continueStepBtnEnabled
            } = this.state;

            this.setState({
              step: [...step, 4],
              currentStep: 3,
              continueStepBtnEnabled: {
                ...continueStepBtnEnabled,
                placeForLessons: true
              }
            });
          }
        });
      }

      // set studioAddress state
      if (profile.studioAddress) {
        this.setState({ studioAddress: profile.studioAddress });
      }

      // set studioAddress state
      if (profile.travelDistance) {
        this.setState({ distance: profile.travelDistance });
      }

      // set availability state
      if (profile.availability) {
        this.setState({
          availability: {
            mon8to10: profile.availability.mon8to10,
            mon10to12: profile.availability.mon10to12,
            mon12to3: profile.availability.mon12to3,
            mon3to6: profile.availability.mon3to6,
            tue8to10: profile.availability.tue8to10,
            tue10to12: profile.availability.tue10to12,
            tue12to3: profile.availability.tue12to3,
            tue3to6: profile.availability.tue3to6,
            wed8to10: profile.availability.wed8to10,
            wed10to12: profile.availability.wed10to12,
            wed12to3: profile.availability.wed12to3,
            wed3to6: profile.availability.wed3to6,
            thu8to10: profile.availability.thu8to10,
            thu10to12: profile.availability.thu10to12,
            thu12to3: profile.availability.thu12to3,
            thu3to6: profile.availability.thu3to6,
            fri8to10: profile.availability.fri8to10,
            fri10to12: profile.availability.fri10to12,
            fri12to3: profile.availability.fri12to3,
            fri3to6: profile.availability.fri3to6,
            sat8to10: profile.availability.sat8to10,
            sat10to12: profile.availability.sat10to12,
            sat12to3: profile.availability.sat12to3,
            sat3to6: profile.availability.sat3to6,
            sun8to10: profile.availability.sun8to10,
            sun10to12: profile.availability.sun10to12,
            sun12to3: profile.availability.sun12to3,
            sun3to6: profile.availability.sun3to6
          }
        }, () => {
          if (this.confirmSelectedAvailability(this.state)) {
            const {
              step,
              continueStepBtnEnabled
            } = this.state;

            this.setState({
              step: [...step, 5],
              currentStep: 4,
              continueStepBtnEnabled: {
                ...continueStepBtnEnabled,
                availability: true
              }
            });
          }
        });
      }

      // set qualifications state
      if (profile.qualifications) {
        this.setState({
          certifiedTeacher: profile.qualifications.certifiedTeacher,
          musicTherapy: profile.qualifications.musicTherapy,
          musicProduction: profile.qualifications.musicProduction,
          earTraining: profile.qualifications.earTraining,
          conducting: profile.qualifications.conducting,
          virtuosoRecognition: profile.qualifications.virtuosoRecognition,
          performance: profile.qualifications.performance,
          musicTheory: profile.qualifications.musicTheory,
          youngChildrenExperience: profile.qualifications.youngChildrenExperience,
          repertoireSelection: profile.qualifications.repertoireSelection
        }, () => {
          if (this.confirmSelectedQualifications(this.state)) {
            const {
              step,
              continueStepBtnEnabled
            } = this.state;

            this.setState({
              step: [...step, 6],
              currentStep: 5,
              continueStepBtnEnabled: {
                ...continueStepBtnEnabled,
                qualifications: true
              }
            });
          }
        });
      }

      // set languages state
      if (profile.languages) {
        this.setState({
          languages: profile.languages
        }, () => {
          if (this.state.languages.length) {
            const {
              step,
              continueStepBtnEnabled
            } = this.state;

            this.setState({
              step: [...step, 7],
              currentStep: 6,
              continueStepBtnEnabled: {
                ...continueStepBtnEnabled,
                languages: true
              }
            });
          }
        });
      }
    }
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const checkAvailability = Object.keys(this.state.availability).some((available) => {
      return name === available;
    });

    this.setState({
      ...this.state,
      ...(checkAvailability && { availability: {
          ...this.state.availability,
          [name]: value
        }
      }),
      [name]: value,
    }, () => {
      this.setState({
        currentStep: 1,
        continueStepBtnEnabled: {
          ...this.state.continueStepBtnEnabled,
          jobPreferences: this.confirmSelectedJobPreferences(this.state)
        }
      }, () => {
        
        this.setState({
          currentStep: 2,
          continueStepBtnEnabled: {
            ...this.state.continueStepBtnEnabled,
            rates: this.confirmSelectedRates(this.state)
          }
        }, () => {
          this.setState({
            currentStep: 3,
            continueStepBtnEnabled: {
              ...this.state.continueStepBtnEnabled,
              placeForLessons: this.confirmSelectedPlaces(this.state)
            }
          }, () => {
            this.setState({
              currentStep: 4,
              continueStepBtnEnabled: {
                ...this.state.continueStepBtnEnabled,
                availability: this.confirmSelectedAvailability(this.state)
              }
            }, () => {
              this.setState({
                currentStep: 5,
                continueStepBtnEnabled: {
                  ...this.state.continueStepBtnEnabled,
                  qualifications: this.confirmSelectedQualifications(this.state)
                }
              });
            });
          });
        });
      });
    });
  }

  public addInstrument = (): void => {
    const instrumentToAdd: InstrumentsType = {
      instrument: this.state.instrument,
      skillLevel: this.state.skillLevel
    };
    if (this.state.instruments.find(t => t.instrument === instrumentToAdd.instrument)) {
      return;
    } else if (instrumentToAdd.instrument && instrumentToAdd.skillLevel) {
      this.setState({
        instruments: [...this.state.instruments, instrumentToAdd],
        instrument: '',
        skillLevel: SkillLevel.beginner
      }, () => {
        this.setState({
          currentStep: 0,
          continueStepBtnEnabled: {
            ...this.state.continueStepBtnEnabled,
            instruments: true
          }
        })
      });
    }
  }

  confirmSelectedJobPreferences = (state: State) => {
    const numberOfStudentsPreferences = ['oneStudent', 'smallGroups', 'largeGroups'];
    const ageGroupPreferences = ['children', 'teens', 'adults', 'seniors'];
    const selectNumberOfStudents = numberOfStudentsPreferences.some((preference) => {
      if (state[preference]) {
        return true;
      }
    });
    const selectAgeGroup = ageGroupPreferences.some((preference) => {
      if (state[preference]) {
        return true;
      }
    });
    return selectNumberOfStudents && selectAgeGroup ? true : false;
  }

  confirmSelectedRates = (state: State) => {
    const ratesListContent = [
      'mins30',
      'mins45',
      'mins60',
      'mins90',
    ];

    return ratesListContent.every((rate) => {
      if (state[rate]) {
        return true
      }
    });
  }

  confirmSelectedPlaces = (state: State) => {
    return Object.keys(placeForLessonsOptions).some((place) => {
      const isPlace = `${place.charAt(0).toLowerCase()}${place.substring(1)}`;
      if (state[isPlace]) {
        return true;
      }
    });
  }

  confirmSelectedAvailability = (state: State) => {
    return Object.keys(state.availability).some((available) => {
      if (state.availability[available]) {
        return true
      }
    });
  }

  confirmSelectedQualifications = (state: State) => {
    return Object.keys(qualificationsOptions).some((qualification) => {
      const selectedQualification = `${qualification.charAt(0).toLowerCase()}${qualification.substring(1)}`;
      if (state[selectedQualification]) {
        return true;
      }
    });
  }

  public deleteInstrument = (instrumentName: string) => {
    this.setState({
      instruments: this.state.instruments.filter(instrument =>
        instrumentName.indexOf(instrument.instrument) === -1)
    });
  }

  public addLanguage = (): void =>  {
    if (this.state.languages.find(t => t === this.state.language)) {
      return;
    } else if (this.state.language) {
      
      this.setState({
        languages: [...this.state.languages, this.state.language]
      }, () => {
        this.setState({
          currentStep: 6,
          continueStepBtnEnabled: {
            ...this.state.continueStepBtnEnabled,
            languages: true
          }
        });
      });
    }
  }

  public deleteLanguage = (languageName: string) => {
    this.setState({ languages: this.state.languages.filter(language =>
      languageName.indexOf(language) === -1)
    });
  }

  public renderAvailabilityCheckbox = (stateName: string): JSX.Element => {
    return (
      <Checkbox
        checked={this.state.availability[stateName]}
        name={stateName}
        onChange={this.handleChange}
      />
    );
  }

  public handleNext = async () => {
    const lessonSize: LessonSizeType = {
      oneStudent: this.state.oneStudent,
      smallGroups: this.state.smallGroups,
      largeGroups: this.state.largeGroups
    };

    const ageGroup: AgeGroupType = {
      children: this.state.children,
      teens: this.state.teens,
      adults: this.state.adults,
      seniors: this.state.seniors,
    };

    const placeForLessons: PlaceForLessonsType = {
      home: this.state.home,
      studio: this.state.studio,
      online: this.state.online,
    };

    const qualifications: QualificationsType = {
      certifiedTeacher: this.state.certifiedTeacher,
      musicTherapy: this.state.musicTherapy,
      musicProduction: this.state.musicProduction,
      earTraining: this.state.earTraining,
      conducting: this.state.conducting,
      virtuosoRecognition: this.state.virtuosoRecognition,
      performance: this.state.performance,
      musicTheory: this.state.musicTheory,
      youngChildrenExperience: this.state.youngChildrenExperience,
      repertoireSelection: this.state.repertoireSelection,
    };

    const rates: RatesType = {
      mins30: this.state.mins30,
      mins45: this.state.mins45,
      mins60: this.state.mins60,
      mins90: this.state.mins90,
    };

    const availability: AvailabilityType = this.state.availability;

    const jobPreferences: InstructorType = {
      rates,
      lessonSize,
      ageGroup,
      placeForLessons,
      availability,
      studioAddress: this.state.studioAddress,
      travelDistance: this.state.distance,
      qualifications,
      instruments: this.state.instruments,
      languages: this.state.languages,
    };

    const {
      step,
    } = this.state;
    if (step.length < 7) {
      this.setState({
        step: [
          ...step,
          step[step.length - 1] + 1
        ]
      });
    } else {
      await this.props.buildJobPreferences(jobPreferences);
      Router.push(Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Education);
    }
  }

  public render(): JSX.Element {
    const {
      jobPreferences,
      step,
      continueStepBtnEnabled,
      instruments,
      languages,
      currentStep
    } = this.state;
    const preference = jobPreferences[currentStep];

    return (
      <div>
        {this.props.isFetchingUser ?
         <div className="nabi-text-center">
          <CircularProgress />
        </div> :
        <div>
          {(step.includes(1) || (instruments.length > 0)) && (
            <div className="nabi-margin-bottom-large">
              <Instruments
                instruments={this.state.instruments.length > 0 ? this.state.instruments : undefined}
                instrument={this.state.instrument}
                skillLevel={this.state.skillLevel}
                handleChange={this.handleChange}
                addInstrument={this.addInstrument}
                deleteInstrument={this.deleteInstrument}
              />
            </div>
          )}
          {(step.includes(2) || this.confirmSelectedJobPreferences(this.state)) && (
              <div className="nabi-margin-bottom-large">
                <JobPreferences
                  handleChange={this.handleChange}
                  oneStudent={this.state.oneStudent}
                  smallGroups={this.state.smallGroups}
                  largeGroups={this.state.largeGroups}
                  children={this.state.children}
                  teens={this.state.teens}
                  adults={this.state.adults}
                  seniors={this.state.seniors}
                />
              </div>
          )}

          {(step.includes(3) || this.confirmSelectedRates(this.state)) && (
            <div className="nabi-margin-bottom-large">
              <Rates
                handleChange={this.handleChange}
                mins30={this.state.mins30}
                mins45={this.state.mins45}
                mins60={this.state.mins60}
                mins90={this.state.mins90}
              />
            </div>
          )}

          {(step.includes(4) || this.confirmSelectedPlaces(this.state)) && (
            <div className="nabi-margin-bottom-large">
              <PlaceForLessonsForm
                handleChange={this.handleChange}
                home={this.state.home}
                studio={this.state.studio}
                online={this.state.online}
                distance={this.state.distance}
                studioAddress={this.state.studioAddress}
                studioAddressError={this.state.fields.studioAddress.error}
              />
            </div>
          )}

          {(step.includes(5) || this.confirmSelectedAvailability(this.state))  && (
            <div className="nabi-margin-bottom-large">
              <Availability
                renderCheckbox={this.renderAvailabilityCheckbox}
                handleChange={this.handleChange}
                availability={this.state.availability}
              />
            </div>
          )}

          {(step.includes(6) || this.confirmSelectedQualifications(this.state)) && (
            <div className="nabi-margin-bottom-large">
              <Qualification
                handleChange={this.handleChange}
                certifiedTeacher={this.state.certifiedTeacher}
                musicTherapy={this.state.musicTherapy}
                musicProduction={this.state.musicProduction}
                earTraining={this.state.earTraining}
                conducting={this.state.conducting}
                virtuosoRecognition={this.state.virtuosoRecognition}
                performance={this.state.performance}
                musicTheory={this.state.musicTheory}
                youngChildrenExperience={this.state.youngChildrenExperience}
                repertoireSelection={this.state.repertoireSelection}
              />
            </div>
          )}

          {(step.includes(7) || languages.length > 0) && (
            <Languages
              languages={this.state.languages}
              handleChangeLanguage={this.handleChange}
              addLanguage={this.addLanguage}
              language={this.state.language}
              deleteLanguage={this.deleteLanguage}
            />
          )}
        </div>}
        <StepperButtons
          // nextPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Education}
          backPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Profile}
          handleNext={this.handleNext}
          icon={<ArrowForward />}
          isNextDisabled={!continueStepBtnEnabled[preference] ? true : false}
          isRequesting={this.props.isRequesting || this.props.isFetchingUser}
          errors={this.props.buildJobPreferencesError}
          // continue={this.state.continue}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    actions: {
      buildJobPreferences: {
        isRequesting,
        error: buildJobPreferencesError
      },
    },
  } = state.instructor;

  return {
    user: state.user.user,
    isRequesting,
    buildJobPreferencesError,
    isFetchingUser: state.user.actions.fetchUser.isRequesting
  };
};

function mapDispatchToProps(
  dispatch: Dispatch<Action | ThunkAction<{}, {}, {}>>,
  _ownProps: OwnProps
): DispatchProps {
  return {
    buildJobPreferences: (instructor: InstructorType) =>
      dispatch(buildJobPreferences(instructor)),
    fetchUser:() => dispatch(fetchUser())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobPreferencesStep);


// first template in array
// continue button is grey
// save details
// continue button is enabled
// click continue
// add next template to array
// continue button is greyed
