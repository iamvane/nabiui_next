import * as React from 'react';
import {
  Action,
  Dispatch
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';

import { useRouter } from 'next/router';

import { Grid, CircularProgress } from '@material-ui/core';

import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import { InstructorType } from '../../redux/models/InstructorModel';
import { changeAvatar } from '../../redux/actions/UserActions';
import { updateInstructor, fetchInstructor } from '../../redux/actions/InstructorActions';
import { RatesType } from '../Rates/model';
import { SkillLevel } from '../Instruments/constants';
import PageTitle from '../common/PageTitle';
// import { ReviewsType } from '../Reviews/model';
import { QualificationsType } from '../Qualifications/model';
import { Qualifications } from '../Qualifications/constants';
import { InstrumentsType } from '../Instruments/model';
import { EmploymentType } from '../Employment/model';
import { EducationType } from '../Education/model';
import { ProfileComponent, ProfileContentComponent } from './constants';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import ProfileSidebar from './ProfileSidebar';

interface State extends RatesType, InstrumentsType {
  bioTitle: string;
  showRatesForm: boolean;
  showBioTitleForm: boolean;
  displayName: string;
  employment: EmploymentType[];
  instruments: InstrumentsType[];
  showInstrumentsForm: boolean;
  education: EducationType[];
  lessonsTaught: number;
  memberSince: string;
  reviews: number;
  music: string[];
  bioDescription: string;
  online: boolean;
  studio: boolean;
  home: boolean;
  studioAddress: string;
  qualifications: QualificationsType;
  availability: {
    [x: string]: any
  };
  yearsOfExperience: number;
  age: number;
  id: number;
}

interface StateProps {
  user: UserType;
  instructor: InstructorType;
  isRequestingInstructor: boolean;
}

interface DispatchProps {
  changeAvatar: (id: string, avatar: string) => void;
  updateInstructor: (instructor: InstructorType) => void;
  fetchInstructor: (id: number) => void;
}

interface OwnProps { }

interface Props extends
  StateProps,
  DispatchProps { }

// const router = useRouter();

export class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bioTitle: '',
      bioDescription: '',
      displayName: '',
      memberSince: '',
      reviews: 0,
      instrument: '',
      home: false,
      online: false,
      studio: false,
      studioAddress: '',
      skillLevel: SkillLevel.beginner,
      instruments: [],
      employment: [],
      education: [],
      music: [],
      yearsOfExperience: 0,
      age: 0,
      id: 0,
      showInstrumentsForm: false,
      showBioTitleForm: false,
      showRatesForm: false,
      lessonsTaught: 0,
      mins30: 0,
      mins45: 0,
      mins60: 0,
      mins90: 0,
      qualifications: {
        certifiedTeacher: false,
        conducting: false,
        earTraining: false,
        musicProduction: false,
        musicTheory: false,
        musicTherapy: false,
        performance: false,
        repertoireSelection: false,
        virtuosoRecognition: false,
        youngChildrenExperience: false
      },
      availability: {}
    };
  }

  public handleChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  public componentDidMount(): void {

    this.props.fetchInstructor(Number(1));
    if (this.props.instructor.id) {
      this.setPropsToState(this.props);
    }
    // set displayName state
    this.setState({
      displayName: `${this.props.user.firstName} ${this.props.user.lastName}`,
    });
  }

  public setPropsToState (props: Props) {
    const {
      rates,
      education,
      instruments,
      bioTitle,
      employment,
      lessonsTaught,
      displayName,
      reviews,
      memberSince,
      bioDescription,
      studioAddress,
      placeForLessons,
      qualifications,
      availability,
      yearsOfExperience,
      age,
      id,
      music
    } = props.instructor;
    this.setState({
      mins30: rates && rates.mins30 ? Number(Number(rates.mins30).toFixed(2)) : 0.00,
      mins45: rates && rates.mins45 ? Number(Number(rates.mins45).toFixed(2)) : 0.00,
      mins60: rates && rates.mins60 ? Number(Number(rates.mins60).toFixed(2)) : 0.00,
      mins90: rates && rates.mins90 ? Number(Number(rates.mins90).toFixed(2)) : 0.00,
      id: id ? id : 0,
      education: education ? education : [],
      instruments: instruments ? instruments : [],
      bioTitle: bioTitle ? bioTitle : '',
      bioDescription: bioDescription ? bioDescription : '',
      employment: employment ? employment : [],
      lessonsTaught: lessonsTaught ? lessonsTaught : 0,
      displayName: displayName ? displayName : '',
      memberSince: memberSince ? memberSince : '',
      yearsOfExperience: yearsOfExperience ? yearsOfExperience : 0,
      age: age ? age : 0,
      reviews: reviews ? reviews : 0,
      home: placeForLessons ? placeForLessons.home : false,
      online: placeForLessons ? placeForLessons.online : false,
      studio: placeForLessons ? placeForLessons.studio : false,
      studioAddress: placeForLessons && placeForLessons.studio && studioAddress ? studioAddress : '',
      qualifications: qualifications ? qualifications : this.state.qualifications,
      availability: availability ? availability : this.state.availability, // availability
      music: music ? music : this.state.music
    });
  }

  componentDidUpdate(prevProps: Props) {
    const {
      id
    } = this.props.instructor;
    if (id !== prevProps.instructor.id) {
      this.setPropsToState(this.props);
    }
    // if (this.props.message !== prevProps.message) {
    //   this.setState({
    //     uploadedAvatarStatus: this.props.message ? true : false
    //   });
    // }
  }

  public handleCancelNameEdition = () => {
    this.resetStoreState();
  }

  public handleSave = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    if (event) {
      event.preventDefault();
    }

    const rates: RatesType = {
      mins30: this.state.mins30,
      mins45: this.state.mins45,
      mins60: this.state.mins60,
      mins90: this.state.mins90
    };

    const instructor: InstructorType = {
      userId: this.props.instructor.userId,
      bioTitle: this.state.bioTitle,
      rates,
      instruments: this.state.instruments
    };

    this.props.updateInstructor(instructor);
    this.closeFormDialog();
    this.resetInstrumentsLabel();
  }

  public closeFormDialog = () => {
    this.setState({
      showBioTitleForm: false,
      showRatesForm: false,
      showInstrumentsForm: false
    });
  }

  public resetInstrumentsLabel = () => {
    this.setState({
      instrument: '',
      skillLevel: SkillLevel.beginner
    });
  }

  public resetStoreState(): void {
    const { bioTitle, rates, instruments } = this.props.instructor;
    const { displayName } = this.props.user;

    if (bioTitle && rates && instruments && displayName) {
      this.setState({
        displayName,
        bioTitle,
        instruments,
        mins30: rates.mins30,
        mins45: rates.mins45,
        mins60: rates.mins60,
        mins90: rates.mins90,
      });
    }
  }

  public toggleBioTitleForm = () => {
    if (this.state.showBioTitleForm) {
      this.resetStoreState();
      this.setState(prevState => ({
        showBioTitleForm: !prevState.showBioTitleForm,
      }));
    } else {
      this.setState(prevState => ({
        showBioTitleForm: !prevState.showBioTitleForm,
      }));
    }
  }

  public toggleInstrumentsForm = () => {
    if (this.state.showInstrumentsForm) {
      this.resetStoreState();
      this.setState(prevState => ({
        showInstrumentsForm: !prevState.showInstrumentsForm,
      }));
      this.resetInstrumentsLabel();
    } else {
      this.setState(prevState => ({
        showInstrumentsForm: !prevState.showInstrumentsForm
      }));
    }
  }

  public toggleRatesForm = () => {
    if (this.state.showRatesForm) {
      this.resetStoreState();
      this.setState(prevState => ({
        showRatesForm: !prevState.showRatesForm,
        showBioTitleForm: false
      }));
    } else {
      this.setState(prevState => ({
        showRatesForm: !prevState.showRatesForm,
        showBioTitleForm: false
      }));
    }
  }

  public getQualifications = (qualifications: QualificationsType) => {
    const qualificationTypes = {
      certifiedTeacher: 'Certified teacher',
      musicTherapy: 'Music therapy',
      musicProduction: 'Music production',
      earTraining: 'Ear training',
      conducting: 'Conducting',
      virtuosoRecognition: 'Virtuoso recognition',
      performance: 'Performance',
      musicTheory: 'Music theory',
      experienceTeachingYoungChildren: 'Experience teaching young children',
      repertoireSelection: 'Repertoire selection',
    } as { [x: string]: Qualifications };

    const instructorsQualifications = [] as Qualifications[];
    Object.keys(qualificationTypes).forEach((qualificationType) => {
        if (qualifications[qualificationType]) {
          instructorsQualifications.push(qualificationTypes[qualificationType]);
        }
      });
    return instructorsQualifications;
  }

  public getAvailability = (availability: { [x: string]: any }) => {
    const daysOfAvailability = [
      { monday: ProfileContentComponent.monday },
      { tuesday: ProfileContentComponent.tuesday },
      { wednesday: ProfileContentComponent.wednesday },
      { thursday: ProfileContentComponent.thursday },
      { friday: ProfileContentComponent.friday },
      { saturday: ProfileContentComponent.saturday },
      { sunday: ProfileContentComponent.sunday }
    ] as { [x: string]: { [x: string]: string } }[];

    const days = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    } as { [x: string]: string[] };

    Object.keys(ProfileContentComponent.availability).forEach((dayTime: string) => {
      if (availability[dayTime]) {
        daysOfAvailability.forEach((day) => {
          if (day[Object.keys(day)[0]][dayTime]) {
            days[Object.keys(day)[0]].push(day[Object.keys(day)[0]][dayTime]);
          }
        });
      }
    });

    return days;
  }

  public addInstrument = (): void => {
    const instrumentToAdd: InstrumentsType = {
      instrument: this.state.instrument,
      skillLevel: this.state.skillLevel
    };

    if (this.state.instruments.find(t => t.instrument === instrumentToAdd.instrument)) {
      return;
    } else if (instrumentToAdd.instrument && instrumentToAdd.skillLevel) {
      this.setState({ instruments: [...this.state.instruments, instrumentToAdd] });
      this.resetInstrumentsLabel();
    }
  }

  public deleteInstrument = (instrumentName: string) => {
    this.setState({
      instruments: this.state.instruments.filter(instrument =>
        instrumentName.indexOf(instrument.instrument) === -1)
    });
  }

  public render(): JSX.Element {
    // get the user's age
    const rates: RatesType = {
      mins30: this.state.mins30,
      mins45: this.state.mins45,
      mins60: this.state.mins60,
      mins90: this.state.mins90,
    };

    return (
      <div className="nabi-container">
        <PageTitle pageTitle={ProfileComponent.pageTitle} />
        {this.props.isRequestingInstructor && !this.state.id ?
          <div className="nabi-section nabi-profile-loader-container">
            <CircularProgress />
          </div> :
          <React.Fragment>
            <div className="nabi-section nabi-background-white">
              <Grid container={true}>
                <Grid item={true} md={12} xs={12} className="nabi-margin-top-xsmall">
                  <ProfileHeader
                    user={this.props.user}
                    bioTitle={this.state.bioTitle}
                    displayName={this.state.displayName}
                    showInstrumentsForm={this.state.showInstrumentsForm}
                    memberSince={Number(this.state.memberSince)}
                    lessonsTaught={this.state.lessonsTaught}
                    avatarImage={this.props.instructor.avatar}
                    instruments={this.state.instruments}
                    reviews={this.state.reviews}
                    experience={this.state.yearsOfExperience}
                    showBioTitleForm={this.state.showBioTitleForm}
                    instrument={this.state.instrument}
                    skillLevel={this.state.skillLevel}
                    handleSave={this.handleSave}
                    addInstrument={this.addInstrument}
                    deleteInstrument={this.deleteInstrument}
                    showRatesForm={this.state.showRatesForm}
                    handleChange={this.handleChange}
                    backgroundCheck={false}
                    favorite={true}
                    cancelNameEdition={this.handleCancelNameEdition}
                    toggleInstrumentsForm={this.toggleInstrumentsForm}
                    toggleBioTitleForm={this.toggleBioTitleForm}
                    toggleRatesForm={this.toggleRatesForm}
                    changeAvatar={(avatar: string) => { this.props.changeAvatar(this.props.user.id || '', avatar); }}
                    rates={rates}
                    age={this.state.age}
                    notEditable={true}
                  />
                </Grid>
              </Grid>
            </div>
            <Grid container={true} spacing={1}>
              <Grid item={true} md={8} xs={12} className="nabi-margin-top-xsmall">
                <div className="nabi-section-wide nabi-background-white">
                  <ProfileContent
                    bio={this.state.bioDescription}
                    employment={this.state.employment}
                    education={this.state.education}
                    displayName={this.state.displayName}
                    qualifications={this.getQualifications(this.state.qualifications)}
                    deleteEmployment={() => null}
                    deleteEducation={() => null}
                    editEducation={() => null}
                    editEmployment={() => null}
                    reviews={[]}
                    music={this.state.music}
                  />
                </div>
              </Grid>
              <Grid item={true} md={4} xs={12} className="nabi-margin-top-xsmall">
                <ProfileSidebar
                  online={this.state.online}
                  studio={this.state.studio}
                  home={this.state.home}
                  studioAddress={this.state.studioAddress}
                  availableDays={this.getAvailability(this.state.availability)}
                  displayName={this.state.displayName}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user: {
      user
    },
    instructor: {
      instructor,
      actions: {
        fetchInstructor: {
          isRequesting: isRequestingInstructor
        }
      }
    },
  } = state;
  return {
    user,
    instructor,
    isRequestingInstructor
  };
};

function mapDispatchToProps(
  dispatch: Dispatch<Action | ThunkAction<{}, {}, {}>>,
  _ownProps: OwnProps
): DispatchProps {
  return {
    changeAvatar: (id: string, avatar: string) => dispatch(changeAvatar(id, avatar)),
    updateInstructor: (instructor: InstructorType) => dispatch(updateInstructor(instructor)),
    fetchInstructor: (id: number) => dispatch(fetchInstructor(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
