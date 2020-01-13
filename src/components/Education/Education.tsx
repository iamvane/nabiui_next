import * as React from 'react';
import {
  Action,
  Dispatch
} from 'redux';
import { connect } from 'react-redux';

import {
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Add from '@material-ui/icons/Add';

import { StoreState } from '../../redux/reducers/store';
import {
  fetchEducation,
  addEducation,
  editEducation,
  deleteEducation
 } from '../../redux/actions/InstructorActions';
import { Routes } from '../common/constants/Routes';
import { ProfileBuilderStepper } from '../ProfileBuilder/constants';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import SectionTitle from '../common/SectionTitle';
import EducationForm from './EducationForm';
import EducationAdded from './EducationAdded';
import { EducationType } from './model';
import { EducationComponent } from './constants';

interface DispatchProps {
  fetchEducation: () => void;
  addEducation: (education: EducationType) => void;
  editEducation: (education: Partial<EducationType>) => void;
  deleteEducation: (id: number) => void;
}

interface StateProps {
  education: EducationType[];

  isFetchEducationRequesting: boolean;
  isAddEducationRequesting: boolean;
  isDeleteEducationRequesting: boolean;
  isEditEducationRequesting: boolean;
  fetchEducationError: string;
  addEducationError: string;
  editEducationError: string;
  deleteEducationError: string;
}

interface Props extends
  DispatchProps,
  StateProps {}

interface State extends
EducationType {
  education?: EducationType[];
  showEducationForm: boolean;
  isEditing: boolean;
  allFieldsFilled: boolean;
  [x: string]: any;
}

/**
 * Education: Third step of the Profile Builder
 */
export class Education extends React.Component<Props, State > {
  constructor(props: Props) {
    super(props);

    this.state = {
      id: undefined,
      school: '',
      graduationYear: '',
      schoolLocation: '',
      degreeType: '',
      fieldOfStudy: '',
      showEducationForm: false,
      isEditing: false,
      allFieldsFilled: false
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.props.fetchEducation();
    this.setEducation();
  }

  public handleChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {

    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    this.setState({ ...this.state, [name]: value }, () => {
      this.setState({
        ...this.state, allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
      });
    });
  }

  public handleOnBlur = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value }, () => {
      this.setState({
        ...this.state, allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
      });
    });
  }

  public confirmAllFieldsAreFilled = (educationState: State) => {
    const educationFields = [
      'school',
      'graduationYear',
      'fieldOfStudy',
      'degreeType',
      'schoolLocation'
    ];
    const educationFieldsFromState = Object.keys(educationState).map((field) => {
      if (educationFields.includes(field)) {
        return {
          [field]: educationState[field]
        };
      }
      return null;
    }).filter((educationField) => educationField !== null) as { [x: string]: string }[];

    return educationFieldsFromState.every((field) => {
      return field[Object.keys(field)[0]].length !== 0;
    });
  }

  public handleSave = async (event: React.SyntheticEvent<HTMLInputElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }
    const education: EducationType = {
      school: this.state.school,
      graduationYear: this.state.graduationYear,
      degreeType: this.state.degreeType,
      fieldOfStudy: this.state.fieldOfStudy,
      schoolLocation: this.state.schoolLocation
    };

    // // handle save when editing an exisitng education
    if (this.state.isEditing) {
      education.id = this.state.id;
      await this.props.editEducation(education);
    } else {
      await this.props.addEducation(education);
    }
    this.resetState();
    this.toggleEducationForm();
    await this.props.fetchEducation();
    this.setEducation();
  }

  public resetState(): void {
    this.setState({
      id: undefined,
      school: '',
      graduationYear: '',
      degreeType: '',
      fieldOfStudy: '',
      schoolLocation: '',
      isEditing: false
    });
  }

  public setEducation(): void {
    this.setState({
      education: this.props.education
    });
  }

  public deleteEducation = async (educationId: number): Promise<void> => {
    await this.props.deleteEducation(educationId);
    await this.props.fetchEducation();
  }

  public editEducation = (educationId: number): void => {
    const educationToEdit = this.state.education && this.state.education.filter(education =>
      education.id === educationId
    );

    if (educationToEdit) {
      this.setState({
        isEditing: true,
        id: educationToEdit[0].id,
        school: educationToEdit[0].school,
        graduationYear: educationToEdit[0].graduationYear,
        schoolLocation: educationToEdit[0].schoolLocation,
        degreeType: educationToEdit[0].degreeType,
        fieldOfStudy: educationToEdit[0].fieldOfStudy,
        // tslint:disable-next-line
      }, () => {
        this.setState ({ showEducationForm: true });
      });
    }
  }

  public toggleEducationForm = () => this.setState(prevState => ({
    showEducationForm: !prevState.showEducationForm
  }))

  public handleCancel = (): void => {
    this.resetState();
    this.toggleEducationForm();
  }

  public renderEducationForm = (): JSX.Element => (
    <div>
      <Typography className="nabi-margin-top-xsmall nabi-text-uppercase" variant="body2">
        {EducationComponent.Text.AddEducation}
      </Typography>
      <EducationForm
        handleChange={this.handleChange}
        handleOnBlur={this.handleOnBlur}
        handleSave={this.handleSave}
        school={this.state.school}
        graduationYear={this.state.graduationYear}
        degreeType={this.state.degreeType}
        fieldOfStudy={this.state.fieldOfStudy}
        schoolLocation={this.state.schoolLocation}
        handleCancel={this.handleCancel}
        isEditing={this.state.isEditing}
        allFieldsFilled={this.state.allFieldsFilled}
      />
    </div>
  )

  public render(): JSX.Element {
    const requesting = this.props.isAddEducationRequesting || this.props.isEditEducationRequesting ||
      this.props.isFetchEducationRequesting || this.props.isDeleteEducationRequesting;

    const educationArray = this.props.education;
    const educationAdded = educationArray.map((education, i) => (
      <li className="nabi-list" key={i}>
        <EducationAdded
          id={education.id}
          gridWidth={6}
          school={education.school}
          graduationYear={education.graduationYear}
          schoolLocation={education.schoolLocation}
          degreeType={education.degreeType}
          fieldOfStudy={education.fieldOfStudy}
          deleteEducation={(educationId: number) => this.deleteEducation(educationId)}
          editEducation={(educationId: number) => this.editEducation(educationId)}
        />
      </li>
    ));
    return (
      <div>
        {requesting ?
          <div className="nabi-text-center">
            <CircularProgress />
          </div> :
          (!this.state.showEducationForm ?
            <div>
              <SectionTitle text={EducationComponent.Text.YourEducation} />
              <Typography className="nabi-margin-top-xsmall">
                {EducationComponent.Text.TellStudentsAbout}
              </Typography>
              <ul>
                {educationAdded}
              </ul>
              <div className="nabi-margin-top-medium">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.toggleEducationForm}
                >
                  <Add className="nabi-margin-right-xsmall" />
                  {EducationComponent.Text.AddEducation}
                </Button>
              </div>
            </div>
          : this.renderEducationForm())
        }
        <StepperButtons
          nextPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Employment}
          backPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.JobPreferences}
          icon={<ArrowForward />}
          errors={
            this.props.fetchEducationError ||
            this.props.addEducationError ||
            this.props.editEducationError ||
            this.props.deleteEducationError
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    actions: {
      fetchEducation: {
        isRequesting: isFetchEducationRequesting,
        error: fetchEducationError
      },
      addEducation: {
        isRequesting: isAddEducationRequesting,
        error: addEducationError
      },
      editEducation: {
        isRequesting: isEditEducationRequesting,
        error: editEducationError
      },
      deleteEducation: {
        isRequesting: isDeleteEducationRequesting,
        error: deleteEducationError
      }
    }
  } = state.instructor;

  return {
    education: state.instructor.instructor.education || [],
    isFetchEducationRequesting,
    isAddEducationRequesting,
    isDeleteEducationRequesting,
    isEditEducationRequesting,
    fetchEducationError,
    addEducationError,
    editEducationError,
    deleteEducationError
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: {}
): DispatchProps => {
  return {
    fetchEducation: () => dispatch(fetchEducation()),
    addEducation: (education: EducationType) => dispatch(addEducation(education)),
    editEducation: (education: Partial<EducationType>) =>
      dispatch(editEducation(education)),
    deleteEducation: (id: number) => dispatch(deleteEducation(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
