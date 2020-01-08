import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import {
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import ArrowForward from '@material-ui/icons/ArrowForward';

import { StoreState } from '../../redux/reducers/store';
import { RequestType } from '../../redux/models/RequestModel';
import {
  createRequest,
  fetchRequests,
  deleteRequestAsnyc,
  editRequestAsync
} from '../../redux/actions/RequestActions';
import { Role } from '../Auth/Registration/constants';
import SectionTitle from '../common/SectionTitle';
import { Routes } from '../common/constants/Routes';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import { RequestBuilderStepper } from '../RequestBuilder/constants';
import RequestForm from './RequestForm';
import {
  StudentType
} from './models';
import RequestAdded from './RequestAdded';
import SnackBar from '../common/SnackBar';
import {
  RequestComponent,
  RequestAddedComponent,
  RequestCreateSuccessMessage
} from './constants';

interface StateProps {
  userId: string;
  role: string;
  firstName?: string;
  birthday?: string;
  requests: RequestType[];
  request: RequestType;
  isFetchingRequests: boolean;
  isCreatingRequest: boolean;
  isEditingRequest: boolean;
  isDeletingRequest: boolean;
  editRequestMessage: string;
  deleteRequestMessage: string;
}
interface DispatchProps {
  createRequest: (request: RequestType) => void;
  fetchRequests: () => void;
  deleteRequest: (id: number) => void;
  editRequest: (id: number, data: RequestType) => void;
}

export interface Props extends
  StateProps,
  DispatchProps { }

interface State {
  requestDetail: RequestType;
  studentDetail: StudentType;
  requests: RequestType[];
  isEditing: boolean;
  showRequestForm: boolean;
  showSnackbar: boolean;
  allFieldsFilled: boolean;
  snackBarMessage: string;
}

/**
 * Request: allows students to request instructors
 */
export class Request extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {
      requestDetail: {
        id: 0,
        instrument: '',
        skillLevel: '',
        lessonDuration: '',
        requestTitle: '',
        requestMessage: '',
        students: [],
        placeForLessons: ''
      },
      studentDetail: {
        name: '',
        age: 0,
        skillLevel: ''
      },
      requests: [],
      // name: this.props.role === Role.student && this.props.firstName ? this.props.firstName : '',
      // age: this.props.role === Role.student && this.props.birthday ?
      //   Math.abs(moment(this.props.birthday).diff(moment(), 'years')) : 0,
      isEditing: false,
      showRequestForm: false,
      showSnackbar: false,
      snackBarMessage: '',
      allFieldsFilled: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  public componentDidMount() {
    this.props.fetchRequests();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.requests.length !== this.props.requests.length) {
      this.setState({
        requests: this.props.requests ? this.props.requests : []
      });
    }
    if (prevProps.request.id !== this.props.request.id) {
      this.setState({
        showSnackbar: !this.state.showSnackbar,
        snackBarMessage: RequestCreateSuccessMessage.createdRequest
      });
      this.resetRequestState();
    }
    if (prevProps.editRequestMessage !== this.props.editRequestMessage) {
      this.setState({
        showSnackbar: !this.state.showSnackbar,
        snackBarMessage: RequestCreateSuccessMessage.editedRequest
      });
    }

    if (prevProps.deleteRequestMessage !== this.props.deleteRequestMessage) {
      this.setState({
        showSnackbar: !this.state.showSnackbar,
        snackBarMessage: RequestCreateSuccessMessage.deletedRequest
      });
    }
  }

  public closeSnackbar = () => this.setState({ showSnackbar: false });

  public handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.currentTarget;
    let value = target.value as any;
    let name = target.name;
    const isStudentDetail = ['name', 'age', 'skillLevel'].includes(name);
    this.setState({
      ...this.state,
      requestDetail: {
        ...this.state.requestDetail,
        [name]: value
      }
      // tslint:disable-next-line: align
    }, () => {
      if (name === 'placeForLessons' && value !== 'studio') {
        delete this.state.requestDetail.travelDistance;
        this.setState({
          ...this.state,
          requestDetail: {
            ...this.state.requestDetail,
          }
        });
      }
      if (isStudentDetail) {
        this.setState({
          ...this.state,
          studentDetail: {
            ...this.state.studentDetail,
            [name]: value
          }
          // tslint:disable-next-line: align
        }, () => {
          this.setState({
            allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
          });
        });
      }
      this.setState({
        allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
      });
    });
  }

  public handleOnBlur = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    let value = target.value as any;
    let name = target.name;
    const isStudentDetail = ['name', 'age', 'skillLevel'].includes(name);
    this.setState({
      ...this.state,
      requestDetail: {
        ...this.state.requestDetail,
        [name]: value
      }
      // tslint:disable-next-line: align
    }, () => {
      if (name === 'placeForLessons' && value !== 'studio') {
        delete this.state.requestDetail.travelDistance;
        this.setState({
          ...this.state,
          requestDetail: {
            ...this.state.requestDetail,
          }
        });
      }
      if (isStudentDetail) {
        this.setState({
          ...this.state,
          studentDetail: {
            ...this.state.studentDetail,
            [name]: value
          }
          // tslint:disable-next-line: align
        }, () => {
          this.setState({
            allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
          });
        });
      }
      this.setState({
        allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
      });
    });
  }

  public confirmAllFieldsAreFilled = (requestState: State) => {
    const validationFields = [
      'instrument',
      'requestTitle',
      'lessonDuration',
      'requestMessage',
      'placeForLessons',
      'students'
    ];

    const requestFields = requestState.requestDetail.placeForLessons === 'studio'
      ? validationFields.slice(0, 6).concat(['travelDistance'])
      : validationFields;

    const requestFieldsFromState = requestFields.map((field) => {
      if (requestState.requestDetail.students && requestState.requestDetail.students.length) {
        return {
          [field]: field === 'students' ?
            requestState.requestDetail.students :
            requestState.requestDetail[field]
        };
      }
      return {
        [field]: requestState.requestDetail[field]
      };
    }).filter((requestField) => requestField !== null) as { [x: string]: string }[];
    return requestFieldsFromState.every((field) => {
      if (!field[Object.keys(field)[0]]) {
        return false;
      }
      return field[Object.keys(field)[0]].length !== 0;
    });
  }

  public handleSubmit(event: React.SyntheticEvent<HTMLInputElement>): void {
    if (event) {
      event.preventDefault();
    }
    delete this.state.requestDetail.id;
    this.props.createRequest(this.state.requestDetail);
  }

  public handleEditSubmit(event: React.SyntheticEvent<HTMLInputElement>): void {
    if (event) {
      event.preventDefault();
    }
    const id = this.state.requestDetail.id;
    delete this.state.requestDetail.id;
    this.props.editRequest(id, this.state.requestDetail);
  }

  public addStudent = (): void => {
    const {
      name,
      age,
      skillLevel
    } = this.state.studentDetail;
    const studentToAdd: StudentType = {
      name: name,
      age: age,
      skillLevel: skillLevel
    };

    if (this.state.requestDetail.students &&
      this.state.requestDetail.students.find(t => t.name === studentToAdd.name)) {
      return;
    } else if (studentToAdd.name && studentToAdd.age) {

      this.setState(
        {
          requestDetail: {
            ...this.state.requestDetail,
            students: [...this.state.requestDetail.students as StudentType[], studentToAdd]
          }
        },
        () => {
          // clear student name and age state
          this.setState({
            studentDetail: {
              name: '',
              age: 0,
              skillLevel: ''
            },
            allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
          });
        }
      );
    }
  }

  public resetRequestState(): void {
    this.setState({
      requestDetail: {
        id: 0,
        instrument: '',
        skillLevel: '',
        lessonDuration: '',
        requestTitle: '',
        requestMessage: '',
        students: [],
        placeForLessons: ''
      },
      isEditing: false
    });
  }

  public deleteRequest = (requestId: number): void => {
    this.props.deleteRequest(requestId);
    this.setState({
      requests: this.state.requests.filter(request =>
        request.id !== requestId
      )
    });
  }

  public editRequest(requestId: number): void {
    const editRequest = this.state.requests.filter(request =>
      request.id === requestId
    );

    this.setState({
      isEditing: true,
      requestDetail: {
        id: editRequest[0].id,
        instrument: editRequest[0].instrument,
        placeForLessons: editRequest[0].placeForLessons,
        lessonDuration: editRequest[0].lessonDuration,
        requestTitle: editRequest[0].requestTitle,
        requestMessage: editRequest[0].requestMessage,
        students: editRequest[0].studentDetails,
        skillLevel: editRequest[0].skillLevel
      }
      // tslint:disable-next-line
    }, () => {
      this.toggleRequestForm();
      this.setState({
        allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
      });
    });
  }

  public toggleRequestForm = () => this.setState(prevState => ({
    showRequestForm: !prevState.showRequestForm,
    allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
  }))

  public handleCancel = (): void => {
    this.resetRequestState();
    this.toggleRequestForm();
  }

  public deleteStudent = (studentName: string) => {
    const {
      students
    } = this.state.requestDetail as { students: StudentType[] };
    this.setState({
      requestDetail: {
        ...this.state.requestDetail,
        students: students.filter(student =>
          studentName.indexOf(student.name) === -1)
      }
      // tslint:disable-next-line: align
    }, () => {
      this.setState({
        allFieldsFilled: this.confirmAllFieldsAreFilled(this.state)
      });
    });
  }

  public createRequest(): void {
    const {
      students
    } = this.state.requestDetail as { students: StudentType[] };
    const createdStudents = students.length > 0 ? this.state.requestDetail.students :
      [{
        name: this.state.studentDetail.name,
        age: this.state.studentDetail.age,
        skillLevel: this.state.studentDetail.skillLevel
      }];

    const requestValues: RequestType = {
      students: createdStudents,
      ...this.state.requestDetail,
      id: Number(this.props.userId),
    };
    // when editing
    if (this.state.isEditing) {
      requestValues.id = this.state.requestDetail.id;

      const index = this.state.requests.findIndex(item => item.id === requestValues.id);
      const requestsCopy = [...this.state.requests];

      requestsCopy.splice(index, 1, requestValues);

      this.setState({
        requests: requestsCopy
      },
        // tslint:disable-next-line: align
        () => {
          this.resetRequestState();
          this.toggleRequestForm();
        });
      // when adding a new request
    } else {
      requestValues.id = this.state.requests.length;
      if (requestValues.requestTitle && requestValues.instrument && requestValues.placeForLessons &&
        requestValues.lessonDuration && requestValues.requestMessage) {
        this.setState({
          requests: [...this.state.requests, requestValues]
          // tslint:disable-next-line: align
        }, () => {
          this.resetRequestState();
          this.toggleRequestForm();
        });
      }
    }
  }

  public renderRequestForm = (): JSX.Element => (
    <RequestForm
      handleChange={this.handleChange}
      handleBlur={this.handleOnBlur}
      handleSubmit={this.handleSubmit}
      handleEditSubmit={this.handleEditSubmit}
      handleCancel={this.handleCancel}
      instrument={this.state.requestDetail.instrument}
      skillLevel={this.state.requestDetail.skillLevel}
      requestTitle={this.state.requestDetail.requestTitle}
      requestMessage={this.state.requestDetail.requestMessage}
      lessonDuration={this.state.requestDetail.lessonDuration}
      placeForLessons={this.state.requestDetail.placeForLessons}
      role={this.props.role}
      name={this.state.studentDetail.name}
      age={this.state.studentDetail.age}
      students={this.state.requestDetail.students as StudentType[]}
      addStudent={this.addStudent}
      deleteStudent={this.deleteStudent}
      isEditing={this.state.isEditing}
      isCreatingRequest={this.props.isCreatingRequest}
      isEditingRequest={this.props.isEditingRequest}
      allFieldsFilled={this.state.allFieldsFilled}
    />
  )

  public handleNext = () => {
    // ff
  }

  public render(): JSX.Element {
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
          skillLevel={request.skillLevel}
          students={request.studentDetails}
          deleteRequest={(requestId: number) => this.deleteRequest(requestId)}
          editRequest={(requestId: number) => this.editRequest(requestId)}
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
              this.props.isFetchingRequests || this.props.isCreatingRequest ?
                <div className="nabi-section nabi-profile-loader-container">
                  <CircularProgress />
                </div> :
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
                <Add className="nabi-margin-right-xsmall" />
                {this.state.requests.length > 0 ? RequestComponent.ButtonText.AddAnother :
                  RequestComponent.ButtonText.Add}
              </Button>
            </div>
          </div>
          : this.renderRequestForm()}

        <StepperButtons
          nextPath={Routes.Dashboard}
          backPath={Routes.BuildRequest + RequestBuilderStepper.StepsPaths.AccountInfo}
          handleNext={this.handleNext}
          icon={<ArrowForward />}
        />
        <SnackBar
          isOpen={this.state.showSnackbar}
          message={this.state.snackBarMessage}
          handleClose={this.closeSnackbar}
          variant="success"
          hideIcon={true}
        />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState, _ownProps: {}): StateProps {
  const {
    user: {
      user: {
        role,
        firstName,
        id,
        birthday
      }
    },
    requests: {
      requests,
      request,
      actions: {
        fetchRequests: {
          isRequesting: isFetchingRequests
        },
        createRequest: {
          isRequesting: isCreatingRequest
        },
        editRequest: {
          isRequesting: isEditingRequest,
          message: editRequestMessage
        },
        deleteRequest: {
          isRequesting: isDeletingRequest,
          message: deleteRequestMessage
        }
      }
    }
  } = state;
  return {
    userId: id || '',
    role: role || '',
    firstName: firstName,
    birthday: birthday,
    requests: requests,
    request: request,
    isFetchingRequests,
    isCreatingRequest,
    isEditingRequest,
    isDeletingRequest,
    editRequestMessage,
    deleteRequestMessage
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchProps => ({
  createRequest: (requests: RequestType) => dispatch(createRequest(requests)),
  fetchRequests: () => dispatch(fetchRequests()),
  deleteRequest: (id: number) => dispatch(deleteRequestAsnyc(id)),
  editRequest: (id: number, data: RequestType) => dispatch(editRequestAsync(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
