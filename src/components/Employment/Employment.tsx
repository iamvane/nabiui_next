import * as React from 'react';
import {
  Action,
  Dispatch
} from 'redux';
import { connect } from 'react-redux';

import {
  Button,
  CircularProgress,
  Typography
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';

import Add from '@material-ui/icons/Add';

import { StoreState } from '../../redux/reducers/store';
import {
  fetchEmployment,
  addEmployment,
  editEmployment,
  deleteEmployment
} from '../../redux/actions/InstructorActions';
import { Routes } from '../common/constants/Routes';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import { ProfileBuilderStepper } from '../ProfileBuilder/constants';
import SectionTitle from '../common/SectionTitle';
import { EmploymentComponent } from './constants';
import { EmploymentType } from './model';
import EmploymentForm from './EmploymentForm';
import EmploymentAdded from './EmploymentAdded';

interface DispatchProps {
  fetchEmployment: () => void;
  addEmployment: (employment: EmploymentType) => void;
  editEmployment: (employment: Partial<EmploymentType>) => void;
  deleteEmployment: (id: number) => void;
}

interface StateProps {
  employment: EmploymentType[];
  isFetchEmploymentRequesting: boolean;
  isAddEmploymentRequesting: boolean;
  isDeleteEmploymentRequesting: boolean;
  isEditEmploymentRequesting: boolean;
  fetchEmploymentError: string;
  addEmploymentError: string;
  editEmploymentError: string;
  deleteEmploymentError: string;
}

interface Props extends
  DispatchProps,
  StateProps { }

interface State extends EmploymentType {
  employment?: EmploymentType[];
  showEmploymentForm: boolean;
  isEditing: boolean;
  allFieldsFilled: boolean;
  validationFields: string[];
  [x: string]: any;
}

/**
 * Employment: Third step of the Profile Builder
 */
export class Employment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      id: 0,
      employer: '',
      jobTitle: '',
      jobLocation: '',
      fromMonth: '',
      fromYear: '',
      toMonth: '',
      toYear: '',
      showEmploymentForm: false,
      isEditing: false,
      allFieldsFilled: false,
      validationFields: [
        'employer',
        'jobTitle',
        'jobLocation',
        'fromMonth',
        'fromYear',
        'toMonth',
        'toYear',
      ]
    };
  }

  public handleChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value }, () => {
      this.confirmAllFieldsAreFilled();
    });
  }

  public async componentDidMount(): Promise<void>  {
    await this.props.fetchEmployment();
    this.setEmployment();
  }

  public setEmployment(): void {
    this.setState({
      employment: this.props.employment
    });
  }

  public handleSave = async (event: React.SyntheticEvent<HTMLInputElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    const employment: EmploymentType = {
      employer: this.state.employer,
      jobTitle: this.state.jobTitle,
      jobLocation: this.state.jobLocation,
      fromMonth: this.state.fromMonth,
      fromYear: this.state.fromYear,
    };

    if (this.state.stillWorkHere) {
      employment.stillWorkHere = this.state.stillWorkHere;
    } else {
      employment.toMonth = this.state.toMonth;
      employment.toYear = this.state.toYear;
    }

    // handle save when editing an exisitng employment
    if (this.state.isEditing) {
      employment.id = this.state.id;
      await this.props.editEmployment(employment);
      // handle save when adding a new education
    } else {
      await this.props.addEmployment(employment);
    }
    this.resetState();
    this.toggleEmploymentForm();
    await this.props.fetchEmployment();
    this.setEmployment();
  }

  public resetState(): void {
    this.setState({
      employer: '',
      jobTitle: '',
      jobLocation: '',
      fromMonth: '',
      fromYear: '',
      toMonth: '',
      toYear: '',
      stillWorkHere: false,
      isEditing: false,
      allFieldsFilled: false,
      validationFields: [
        'employer',
        'jobTitle',
        'jobLocation',
        'fromMonth',
        'fromYear',
        'toMonth',
        'toYear',
      ]
    });
  }

  public deleteEmployment = async (employmentId: number): Promise<void> => {
    await this.props.deleteEmployment(employmentId);
    await this.props.fetchEmployment();
  }

  public editEmployment(employmentId: number): void {
    const employmentToEdit = this.state.employment && this.state.employment.filter(employment =>
      employment.id === employmentId
    );
    if (employmentToEdit) {
      this.setState({
        isEditing: true,
        id: employmentToEdit[0].id,
        employer: employmentToEdit[0].employer,
        jobTitle: employmentToEdit[0].jobTitle,
        jobLocation: employmentToEdit[0].jobLocation,
        fromMonth: employmentToEdit[0].fromMonth,
        fromYear: employmentToEdit[0].fromYear,
        toMonth: employmentToEdit[0].stillWorkHere === false ? employmentToEdit[0].toMonth : '',
        toYear: employmentToEdit[0].stillWorkHere === false ? employmentToEdit[0].toYear : '',
        stillWorkHere: employmentToEdit[0].stillWorkHere
        // tslint:disable-next-line
      }, () => {
        this.toggleEmploymentForm();
      });
    }
  }

  public toggleEmploymentForm = () => this.setState(prevState => ({
    showEmploymentForm: !prevState.showEmploymentForm
  }))

  public handleOnBlur = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value }, () => {
      this.confirmAllFieldsAreFilled();
    });
  }

  public confirmAllFieldsAreFilled = () => {
    const validationFields = this.state.stillWorkHere
      ? this.state.validationFields.slice(0, 5).concat(['stillWorkHere'])
      : [ 'employer',
        'jobTitle',
        'jobLocation',
        'fromMonth',
        'fromYear',
        'toMonth',
        'toYear'];
    this.setState({
      validationFields
    },            () => {
      const employmentFieldsFromState = Object.keys(this.state).map((field) => {
        if (this.state.validationFields.includes(field)) {
          return {
            [field]: this.state[field]
          };
        }
        return null;
      }).filter((employmentField) => employmentField !== null) as { [x: string]: any }[];
      const allFieldsFilled = employmentFieldsFromState.every((field) => {
        const fieldValue = field[Object.keys(field)[0]];
        if (typeof fieldValue === 'string') {
          return fieldValue.length !== 0;
        }
        return fieldValue !== false;
      });
      this.setState({
        ...this.state,
        allFieldsFilled
      });
    });
  }

  public handleCancel = (): void => {
    this.resetState();
    this.toggleEmploymentForm();
  }

  public renderEmploymentForm = (): JSX.Element => (
    <div>
      <Typography className="nabi-margin-top-xsmall nabi-text-uppercase" variant="body2">
        {EmploymentComponent.Text.AddEmployment}
      </Typography>
      <EmploymentForm
        handleChange={this.handleChange}
        handleOnBlur={this.handleOnBlur}
        handleSave={this.handleSave}
        employer={this.state.employer}
        jobTitle={this.state.jobTitle}
        jobLocation={this.state.jobLocation}
        fromMonth={this.state.fromMonth}
        fromYear={this.state.fromYear}
        toMonth={this.state.toMonth}
        toYear={this.state.toYear}
        stillWorkHere={this.state.stillWorkHere}
        isEditing={this.state.isEditing}
        handleCancel={this.handleCancel}
        allFieldsFilled={this.state.allFieldsFilled}
      />
    </div>
  )

  public render(): JSX.Element {
    const requesting = this.props.isAddEmploymentRequesting || this.props.isEditEmploymentRequesting ||
      this.props.isFetchEmploymentRequesting || this.props.isDeleteEmploymentRequesting;

    const employmentAdded = this.props.employment.map((employment, i) => (
      <li className="nabi-list" key={i}>
        <EmploymentAdded
          id={employment.id}
          gridWidth={6}
          employer={employment.employer}
          jobTitle={employment.jobTitle}
          jobLocation={employment.jobLocation}
          fromMonth={employment.fromMonth}
          fromYear={employment.fromYear}
          toMonth={employment.toMonth}
          toYear={employment.toYear}
          stillWorkHere={this.state.stillWorkHere}
          deleteEmployment={(employmentId: number) => this.deleteEmployment(employmentId)}
          editEmployment={(employmentId: number) => this.editEmployment(employmentId)}
        />
      </li>
    ));
    return (
      <div>
        {requesting ?
          <div className="nabi-text-center">
            <CircularProgress />
          </div> :
          (!this.state.showEmploymentForm ?
            <div>
              <SectionTitle text={EmploymentComponent.Text.YourEmployment} />
              <Typography className="nabi-margin-top-xsmall">
                {EmploymentComponent.Text.ListYourPastExperience}
              </Typography>
              <ul>
                {employmentAdded}
              </ul>
              <div className="nabi-margin-top-medium">
                <Button color="primary" variant="contained" onClick={this.toggleEmploymentForm}>
                  <Add className="nabi-margin-right-xsmall" />
                  {EmploymentComponent.Text.AddEmployment}
                </Button>
              </div>
            </div>
            : this.renderEmploymentForm())
        }
        <StepperButtons
          nextPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.References}
          backPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Education}
          icon={<ArrowForward />}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    actions: {
      fetchEmployment: {
        isRequesting: isFetchEmploymentRequesting,
        error: fetchEmploymentError
      },
      addEmployment: {
        isRequesting: isAddEmploymentRequesting,
        error: addEmploymentError
      },
      editEmployment: {
        isRequesting: isEditEmploymentRequesting,
        error: editEmploymentError
      },
      deleteEmployment: {
        isRequesting: isDeleteEmploymentRequesting,
        error: deleteEmploymentError
      }
    }
  } = state.instructor;

  return {
    employment: state.instructor.instructor.employment || [],
    isFetchEmploymentRequesting,
    isAddEmploymentRequesting,
    isDeleteEmploymentRequesting,
    isEditEmploymentRequesting,
    fetchEmploymentError,
    addEmploymentError,
    editEmploymentError,
    deleteEmploymentError
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: {}
): DispatchProps => {
  return {
    fetchEmployment: () => dispatch(fetchEmployment()),
    addEmployment: (employment: EmploymentType) => dispatch(addEmployment(employment)),
    editEmployment: (employment: Partial<EmploymentType>) =>
      dispatch(editEmployment(employment)),
    deleteEmployment: (id: number) => dispatch(deleteEmployment(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employment);
