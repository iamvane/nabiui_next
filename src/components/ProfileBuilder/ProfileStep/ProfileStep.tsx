import * as React from 'react';
import {
  Action,
  Dispatch
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';
import Router from "next/router";

import ArrowForward from '@material-ui/icons/ArrowForward';

import { StoreState } from '../../../redux/reducers/store';
import { UserType } from '../../../redux/models/UserModel';
import { fetchUser } from '../../../redux/actions/UserActions';
import { InstructorType } from '../../../redux/models/InstructorModel';
import {
  buildProfile,
  fetchProfile
} from '../../../redux/actions/InstructorActions';
import { Routes } from '../../common/constants/Routes';
import Music from '../../Music/Music';
import {
  MusicTypes,
  MusicComponent,
} from '../../Music/constants';
import Bio from '../../Bio/Bio';
import { StepperButtons } from '../../CommonStepper/StepperButtons';
import { ProfileBuilderStepper } from '../constants';
import {
  fields,
  validateField
} from './ProfileStepValidator';
import  { ValidatorState as ProfileStepValidatorState } from '../../../utils/Validator';
import { ProfileType } from './models';
import VideoProfileUploader from './VideoProfileUploader';

interface StateProps {
  user: UserType;
  instructor: InstructorType;
  isRequestingBuildProfile: boolean;
  errorBuildProfile: string;
}

interface DispatchProps {
  buildProfile: (profile: ProfileType) => void;
  fetchProfile: () => void;
  fetchUser: () => void;
}

interface OwnProps { }

interface State extends
  ProfileStepValidatorState,
  ProfileType {
  fields: any;
  id: number;
  embedCode: string;
  typeOfEmbedCode: MusicTypes;
  errorMessage: string;
  showMusicForm: boolean;
  redirect: boolean;
  [x: string]: any;
}

interface Props extends
  DispatchProps,
  OwnProps,
  StateProps { }

/**
 * Profile: First step of the Profile Builder
 */
export class ProfileStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fields: fields,
      id: 0,
      embedCode: '',
      typeOfEmbedCode: MusicTypes.soundCloud,
      errorMessage: '',
      showMusicForm: false,
      formErrors: {},
      redirect: false
    };
  }

  public componentDidMount(): void {
    this.props.fetchProfile();
    this.props.fetchUser();
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.instructor.music && prevProps.instructor.music !== this.props.instructor.music) {
      this.setState({ music: this.props.instructor.music });
    }
    if (this.props.instructor.yearsOfExperience && prevProps.instructor.yearsOfExperience !== this.props.instructor.yearsOfExperience) {
      this.setState({ yearsOfExperience: String(this.props.instructor.yearsOfExperience) })
    }
    if (this.props.instructor.bioDescription && prevProps.instructor.bioDescription !== this.props.instructor.bioDescription) {
      this.setState({ bioDescription: this.props.instructor.bioDescription })
    }
    if (this.props.instructor.bioTitle && prevProps.instructor.bioTitle !== this.props.instructor.bioTitle) {
      this.setState({ bioTitle: this.props.instructor.bioTitle })
    }
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const bioFields = ['bioDescription', 'bioTitle', 'yearsOfExperience'];
    this.setState({ ...this.state, [name]: value }, () => {
      bioFields.forEach((field) => {
        if (this.state[field]) {
          validateField(this.state, field);
        }
      });
    });
  }

  public handleOnBlur = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const bioFields = ['bioDescription', 'bioTitle', 'yearsOfExperience'];
    this.setState({ ...this.state, [name]: value }, () => {
      bioFields.forEach((field) => {
        if (this.state[field]) {
          validateField(this.state, field);
        }
      });
    });
  }

  public deleteMusic(musicUrl: string): void {
    if (this.state.music) {
      this.setState({
        music: this.state.music.filter(url =>
           url !== musicUrl
        )
      });
    }
  }

  public resetState(): void {
    this.setState({
      id: 0,
      embedCode: ''
    });
  }

  // gets the src url from an iFrame string
  public validateMusicAndReturnIFrame = () => {
    const soundCloudRegex = /src\=([^\s]*)\</;

    let srcWithQuotes = this.state.embedCode.match(soundCloudRegex);

    if (srcWithQuotes) {
      let match = srcWithQuotes[1];
      return match.substring(1, match.length - 1);
    } else {
      this.setState({ errorMessage: MusicComponent.Text.EmbedError });
      this.resetState();
    }
    return;
  }

  public toggleMusicForm = () => this.setState(prevState => ({
    showMusicForm: !prevState.showMusicForm
  }))

  public handleCancel = (): void => {
    this.resetState();
    this.toggleMusicForm();
  }

  public addMusic = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    if (event) {
      event.preventDefault();
    }

    // validates maximum number of music items
    if (this.state.music && this.state.music.length >= MusicComponent.maxMusicItems) {
      this.setState({ errorMessage: MusicComponent.Text.MaxMusicError });
      return;
    }
    if (this.state.embedCode) {
      let content: string;
      if (this.state.typeOfEmbedCode === MusicTypes.youTube) {
        if (this.state.embedCode.includes('youtube')) {
          const videoId = this.state.embedCode.slice(-11);
          content = `https://www.youtube.com/embed/${videoId}`;
        } else {
          this.setState({ errorMessage: MusicComponent.Text.EmbedErrorYoutube });
          this.resetState();
          return;
        }
      } else {
        content = this.validateMusicAndReturnIFrame() as string;
      }

      //  Add music if exits the iframe src
      if (content) {

        if (this.state.music) {
          if (this.state.music.find(t => t === content)) {
            return;
          }
          this.setState({ music: [...this.state.music as string[], content] }, () => {
            this.props.buildProfile({music: this.state.music});
            this.resetState();
            this.toggleMusicForm();
          });
        } else {
          this.setState({ music: [content] }, () => {
            this.props.buildProfile({music: this.state.music});
            this.resetState();
            this.toggleMusicForm();
          });
        }
      }
    }
  }

  public handleNext = async () => {
    const profile = {
      bioTitle: this.state.bioTitle,
      bioDescription: this.state.bioDescription,
      yearsOfExperience: Number(this.state.yearsOfExperience),
      music: this.state.music
    };
    await this.props.buildProfile(profile);
    this.setState({
      redirect: true
    });
  }

  public render(): JSX.Element {
    const clearError = () => this.setState({ errorMessage: '' });
    return (
      <div>
        <VideoProfileUploader />
        <div className="nabi-margin-bottom-large nabi-margin-top-large">
          <Bio
            user={this.props.user}
            handleChange={this.handleChange}
            handleOnBlur={this.handleOnBlur}
            bioDescriptionError={this.state.fields.bioDescription.error}
            bioTitleError={this.state.fields.bioTitle.error}
            bioTitle={this.state.bioTitle || this.props.instructor.bioTitle}
            bioDescription={this.state.bioDescription || this.props.instructor.bioDescription}
            yearsOfExperience={this.state.yearsOfExperience || this.props.instructor.yearsOfExperience}
            yearsOfExperienceError={this.state.fields.yearsOfExperience.error}
          />
        </div>
        <div className="nabi-margin-bottom-large">
          <Music
            handleChange={this.handleChange}
            clearError={clearError}
            handleCancel={this.handleCancel}
            deleteMusic={(id: string) => this.deleteMusic(id)}
            addMusic={this.addMusic}
            embedCode={this.state.embedCode}
            typeOfEmbedCode={this.state.typeOfEmbedCode}
            toggleMusicForm={this.toggleMusicForm}
            music={this.state.music ? this.state.music : []}
            errorMessage={this.state.errorMessage}
            showMusicForm={this.state.showMusicForm}
          />
        </div>

        <StepperButtons
          nextPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.JobPreferences}
          backPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.AccountInfo}
          handleNext={this.handleNext}
          icon={<ArrowForward />}
        />
        {this.state.redirect && Router.push(Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.JobPreferences)}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user,
  } = state.user;

  const {
    instructor,
    actions: {
      buildProfile: {
        isRequesting: isRequestingBuildProfile,
        error: errorBuildProfile
      }
    }
  } = state.instructor;

  return {
    user,
    instructor,
    isRequestingBuildProfile,
    errorBuildProfile
  };
};

function mapDispatchToProps(
  dispatch: Dispatch<Action | ThunkAction<{}, {}, {}>>,
  _ownProps: OwnProps
): DispatchProps {
  return {
    buildProfile: (profile: ProfileType) => dispatch(buildProfile(profile)),
    fetchProfile: () => dispatch(fetchProfile()),
    fetchUser: () => dispatch(fetchUser())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStep);
