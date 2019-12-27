import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import {
  Button,
  Icon,
  Typography,
} from '@material-ui/core';

import { StoreState } from 'redux/store';
import { createRequests } from 'redux/actions/RequestActions';
import { Role } from 'components/common/constants/Registration';
import SectionTitle from 'components/common/SectionTitle';
import { StepperButtons } from 'components/CommonStepper/StepperButtons';
import { RequestBuilderStepper } from 'components/RequestBuilder/constants';
import RequestForm from 'components/Request/RequestForm';
import {
  RequestType,
  StudentType
} from 'components/Request/models';
import RequestAdded from 'components/Request/RequestAdded';
import {
  RequestComponent,
  RequestAddedComponent
} from 'components/Request/constants';

interface StateProps {
  userId: string;
  role: string;
  firstName?: string;
  birthday?: string;
  requests: RequestType[];
}

interface DispatchProps {
  createRequests: (request: RequestType[]) => void;
}

export interface Props extends
  StateProps,
  DispatchProps {}

interface State extends
  RequestType,
  StudentType {
    requests: RequestType[];
    students: StudentType[];
    isEditing: boolean;
    showRequestForm: boolean;
  }

/**
 * Request: allows students to request instructors
 */
export class Request extends React.Component <Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: '',
      instrument: '',
      skillLevel: '',
      placeForLessons: '',
      lessonDuration: '',
      requestTitle: '',
      requestMessage: '',
      students: [],
      requests: this.props.requests ? this.props.requests : [],
      name: this.props.role === Role.student && this.props.firstName ? this.props.firstName : '',
      age: this.props.role === Role.student && this.props.birthday ?
        Math.abs(moment(this.props.birthday).diff(moment(), 'years')) : 0,
      isEditing: false,
      showRequestForm: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  public handleSubmit(event: React.SyntheticEvent<HTMLInputElement>): void {
    if (event) {
      event.preventDefault();
    }

    this.createRequest();
  }

  public addStudent = (): void => {
    const studentToAdd: StudentType = {
      name: this.state.name,
      age: this.state.age,
      skillLevel: this.state.skillLevel
    };

    if (this.state.students.find(t => t.name === studentToAdd.name)) {
      return;
    } else if (studentToAdd.name && studentToAdd.age) {
      this.setState(
        {students: [...this.state.students, studentToAdd] }, () => {
          // clear student name and age state
          this.setState({
            name: '',
            age: 0,
            skillLevel: ''
          });
        }
      );
    }
  }

  public resetRequestState(): void {
    this.setState({
      instrument: '',
      skillLevel: '',
      placeForLessons: '',
      lessonDuration: '',
      requestTitle: '',
      requestMessage: '',
      isEditing: false
    });
  }

  public deleteRequest = (requestId: string): void => {
    this.setState({
      requests: this.state.requests.filter(request =>
        request.id !== requestId
      )
    });
  }

  public editRequest(requestId: string): void {
    const editRequest = this.state.requests.filter(request =>
      request.id === requestId
    );

    this.setState({
      isEditing: true,
      id: editRequest[0].id,
      instrument: editRequest[0].instrument,
      placeForLessons: editRequest[0].placeForLessons,
      lessonDuration: editRequest[0].lessonDuration,
      requestTitle: editRequest[0].requestTitle,
      requestMessage: editRequest[0].requestMessage,
      // tslint:disable-next-line
    }, () => {
      this.toggleRequestForm();
    });
  }

  public toggleRequestForm = () => this.setState(prevState => ({
    showRequestForm: !prevState.showRequestForm
  }))

  public handleCancel = (): void => {
    this.resetRequestState();
    this.toggleRequestForm();
  }

  public deleteStudent = (studentName: string) => {
    this.setState({
      students: this.state.students.filter(student =>
        studentName.indexOf(student.name) === -1)
    });
  }

  public createRequest(): void {
    const students = this.state.students.length > 0 ? this.state.students :
    [{name: this.state.name,
        age: this.state.age, skillLevel: this.state.skillLevel}];

    const requestValues: RequestType = {
      students,
      id: this.props.userId,
      instrument: this.state.instrument,
      placeForLessons: this.state.placeForLessons,
      lessonDuration: this.state.lessonDuration,
      requestTitle: this.state.requestTitle,
      requestMessage: this.state.requestMessage
    };
    // when editing
    if (this.state.isEditing) {
      requestValues.id = this.state.id;

      const index = this.state.requests.findIndex(item => item.id === requestValues.id);
      const requestsCopy = [...this.state.requests];

      requestsCopy.splice(index, 1, requestValues);

      this.setState({requests: requestsCopy}, () => {
        this.resetRequestState();
        this.toggleRequestForm();
      });
      // when adding a new request
    } else {
      requestValues.id = String(this.state.requests.length);
      if (requestValues.requestTitle && requestValues.instrument && requestValues.placeForLessons &&
        requestValues.lessonDuration && requestValues.requestMessage) {
        this.setState({requests: [...this.state.requests, requestValues]}, () => {
          this.resetRequestState();
          this.toggleRequestForm();
        });
      }
    }
  }

  public renderRequestForm = (): JSX.Element => (
    <RequestForm
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      handleCancel={this.handleCancel}
      instrument={this.state.instrument}
      skillLevel={this.state.skillLevel}
      requestTitle={this.state.requestTitle}
      requestMessage={this.state.requestMessage}
      lessonDuration={this.state.lessonDuration}
      placeForLessons={this.state.placeForLessons}
      role={this.props.role}
      name={this.state.name}
      age={this.state.age}
      students={this.state.students}
      addStudent={this.addStudent}
      deleteStudent={this.deleteStudent}
      isEditing={this.state.isEditing}
    />
  )

  public handleNext = () => {
    this.props.createRequests(this.state.requests);
  }

  public render (): JSX.Element {
    const requestAdded = this.state.requests.map((request, i) => (
      <li className="nabi-list" key={i}>
        <RequestAdded
          id={request.id}
          notEditable={false}
          gridWidth={6}
          instrument={request.instrument}
          placeForLessons={request.placeForLessons}
          lessonDuration={request.lessonDuration}
          requestTitle={request.requestTitle}
          requestMessage={request.requestMessage}
          students={request.students}
          deleteRequest={(requestId: string) => this.deleteRequest(requestId)}
          editRequest={(requestId: string) => this.editRequest(requestId)}
        />
      </li>
    ));

    return (
      <div>
        {!this.state.showRequestForm ?
          <div>
            <SectionTitle text={RequestComponent.title} />

            <Typography className="nabi-margin-top-xsmall">
              {this.props.role !== Role.parent ? RequestComponent.descriptionStudent :
                RequestComponent.descriptionParent}
            </Typography>

            {
              this.state.requests.length > 0 && (
                <div className="nabi-margin-top-small">
                  <SectionTitle text={RequestAddedComponent.title} />
                  <ul>
                    {requestAdded}
                  </ul>
                </div>
              )
            }

            <div className="nabi-margin-top-medium">
              <Button color="primary" variant="contained" onClick={this.toggleRequestForm}>
                <Icon className="nabi-margin-right-xsmall">add</Icon>
                {this.state.requests.length > 0 ? RequestComponent.ButtonText.AddAnother :
                  RequestComponent.ButtonText.Add}
              </Button>
            </div>
          </div>
        : this.renderRequestForm()}

        <StepperButtons
          // nextPath={RequestBuilderStepper.StepsPaths.SendRequest}
          backPath={RequestBuilderStepper.StepsPaths.AccountInfo}
          handleNext={this.handleNext}
          icon={<Icon>arrow_forward</Icon>}
        />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState, _ownProps: {}): StateProps {
  return {
    userId: state.user.user.id || '',
    role: state.user.user.role || '',
    firstName: state.user.user.firstName,
    birthday: state.user.user.birthday,
    requests: state.requests.requests
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchProps => ({
  createRequests: (requests: RequestType[]) => dispatch(createRequests(requests))
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
