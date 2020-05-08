import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from "next/router";
import {
  bindActionCreators,
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
import { fetchUser } from '../../redux/actions/UserActions';
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
  RequestCreateSuccessMessage,
  enableContinueBtn
} from './constants';

export const Request = () => {
  const requestInfo = [
    'requestDetail',
    'studentDetail',
    'requestMessage'
  ]
  const [requestId, setRequestId] = useState(0);
  const [instrument, setInstrument] = useState('');
  const [title, setTitle] = useState('');
  const [placeForLessons, setPlaceForLessons] = useState('');
  const [lessonDuration, setLessonDuration] = useState('');
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState(0);
  const [studentSkillLevel, setStudentSkillLevel] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [studentRequests, setStudentRequests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [requestFormIsOpen, showRequestForm] = useState(false);
  const [snackbarIsOpen, showSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [steps, setStep] = useState([1]);
  const [currentStep, setCurrentStep] = useState(0);
  const [enableContinue, setEnableContinue] = useState(enableContinueBtn);
  const [enableAddStudentBtn, setEnableAddStudentBtn] = useState(false);

  const closeSnackbar = () => showSnackbar(false);

  const dispatch = useDispatch();
  const fetchUserAction = bindActionCreators(fetchUser, dispatch);
  const fetchRequestsAction = bindActionCreators(fetchRequests, dispatch);
  const createRequestAction = bindActionCreators(createRequest, dispatch);
  const deleteRequestAction = bindActionCreators(deleteRequestAsnyc, dispatch);
  const editRequestAction = bindActionCreators(editRequestAsync, dispatch);

  const resetRequestState = () => {
    setTitle('');
    setPlaceForLessons('');
    setLessonDuration('');
    setInstrument('');
    setStudents([]);
    setStudentSkillLevel('');
    setStudentName('');
    setStudentAge(0);
    setRequestMessage('');
  }

  let {
    userId,
    role,
    firstName,
    birthday,
    requests,
    request,
    isFetchingRequests,
    isCreatingRequest,
    isEditingRequest,
    isDeletingRequest,
    editRequestMessage,
    deleteRequestMessage,
    createRequestError,
    editRequestError
  } = useSelector((state: StoreState) => {
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
            isRequesting: isCreatingRequest,
            error: createRequestError
          },
          editRequest: {
            isRequesting: isEditingRequest,
            message: editRequestMessage,
            error: editRequestError
          },
          deleteRequest: {
            isRequesting: isDeletingRequest,
            message: deleteRequestMessage,
            error: deleteRequestError
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
      deleteRequestMessage,
      createRequestError,
      editRequestError
    };
  });

  useEffect(() => {
    fetchRequestsAction();
    if (requests.length) {
      setStudentRequests(requests);
      showRequestForm(false);
    }
  },
    [
      JSON.stringify(requests)
    ]);

  useEffect(() => {
    fetchUserAction();
  }, [
    userId
  ]);

  useEffect(() => {
    if (editRequestMessage) {
      showSnackbar(true);
      setSnackbarMessage(RequestCreateSuccessMessage.editedRequest);
      fetchRequestsAction();
    }
  }, [
    isEditingRequest,
    editRequestMessage,
  ]);

  useEffect(() => {
    if (deleteRequestMessage) {
      showSnackbar(true);
      setSnackbarMessage(RequestCreateSuccessMessage.deletedRequest);
    }
  }, [
    isDeletingRequest,
    deleteRequestMessage
  ]);

  useEffect(() => {
    if (createRequestError) {
      showSnackbar(true);
      setSnackbarMessage(createRequestError);
    }
  }, [
    createRequestError
  ]);

  useEffect(() => {
    if (editRequestError) {
      showSnackbar(true);
      setSnackbarMessage(editRequestError);
    }
  }, [
    editRequestError
  ]);

  const addStudent = useCallback(
    (): void => {
      const studentToAdd: StudentType = {
        name: studentName,
        age: studentAge,
        skillLevel: studentSkillLevel
      };

      if (students &&
        students.find(t => t.name === studentToAdd.name)) {
        return;
      } else if (studentToAdd.name && studentToAdd.age) {

        // setStudentRequests(prevState => ([
        //   ...prevState, requests
        // ]));

        setStudents(prevState => (
          [...prevState, studentToAdd]
        ));
      }
    },
    [
      studentName,
      studentAge,
      studentSkillLevel,
      JSON.stringify(students)
    ]
  );

  const deleteRequest = useCallback(
    (requestId: number): void => {
      deleteRequestAction(requestId);
      setStudentRequests(prevState => prevState.filter(request => request.id === requestId));
    },
    [studentRequests]
  );

  const editRequest = useCallback(
    (requestId: number): void => {
      const editRequest = studentRequests.find(request =>
        request.id === requestId
      );

      setRequestId(editRequest.id);
      setInstrument(editRequest.instrument);
      setPlaceForLessons(editRequest.placeForLessons);
      setLessonDuration(editRequest.lessonDuration);
      setTitle(editRequest.requestTitle);
      setStudents(editRequest.studentDetails);
      setRequestMessage(editRequest.requestMessage);
      setIsEditing(true);

      showRequestForm(true);
      setStep(prevState => ([
        ...prevState,
        2, 3
      ]));

    },
    [
      requestId,
      instrument,
      placeForLessons,
      lessonDuration,
      JSON.stringify(students),
      requestMessage,
      isEditing,
      requestFormIsOpen,
      JSON.stringify(studentRequests)
    ]
  );

  const handleCancel = useCallback(
    (): void => {
      console.log("handle cancel")
      resetRequestState();
      showRequestForm(false);
    },
    [requestFormIsOpen]
  );

  const deleteStudent = useCallback(
    (studentName: string) => {

      setStudents(prevState => (
        prevState.filter(student =>
          studentName.indexOf(student.name) === -1)
      ));
    },
    [
      JSON.stringify(students)
    ]
  );

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>): void => {
      const target = event.currentTarget;
      let value = target.value as any;
      let name = target.name;
      if (name === 'requestTitle') {
        setTitle(value);
      }
      if (name === 'name') {
        setStudentName(value);
      }
      if (name === 'age') {
        setStudentAge(value);
      }
      if (name === 'skillLevel') {
        setStudentSkillLevel(value);
      }
      if (name === 'placeForLessons') {
        setPlaceForLessons(value);
      }
      if (name === 'instrument') {
        setInstrument(value);
      }
      if (name === 'lessonDuration') {
        setLessonDuration(value);
      }

      if (name === 'requestMessage') {
        setRequestMessage(value);
      }
    },
    []
  );

  useEffect(() => {
    const allRequestDetailFieldsFilled = [
      instrument,
      title,
      placeForLessons,
      lessonDuration
    ].every((field) => field.length);

    setEnableContinue(prevState => ({
      ...prevState,
      requestDetail: allRequestDetailFieldsFilled
    }));
  }, [
    instrument,
    title,
    placeForLessons,
    lessonDuration
  ]);

  useEffect(() => {
    const allStudentDetailFieldsFilled = [
      studentName,
      studentAge,
      studentSkillLevel,
    ].every((field) => {
      if (typeof field === 'string') {
        return field.length
      }
      return field > 0;
    });
    setEnableAddStudentBtn(allStudentDetailFieldsFilled)
    setEnableContinue(prevState => ({
      ...prevState,
      studentDetail: students.length ? true : false
    }));
  }, [
    students,
    studentAge,
    studentName,
    studentSkillLevel
  ]);

  useEffect(() => {
    setEnableContinue(prevState => ({
      ...prevState,
      requestMessage: requestMessage.length ? true : false
    }));
  }, [
    requestMessage
  ]);

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const requestDetails = {
        students,
        instrument,
        skillLevel: studentSkillLevel,
        lessonDuration,
        requestMessage,
        placeForLessons,
        requestTitle: title,
      } as any
      createRequestAction(requestDetails);
      fetchRequestsAction();
    },
    [
      students,
      instrument,
      studentSkillLevel,
      lessonDuration,
      requestMessage,
      placeForLessons,
      title
    ]
  );

  const handleEditSubmit = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const requestDetails = {
        students,
        instrument,
        lessonDuration,
        requestMessage,
        placeForLessons,
        requestTitle: title,
      } as any;
      if (role === Role.student) {
        delete requestDetails.students;
      }
      editRequestAction(requestId, requestDetails);
      // showRequestForm(!requestFormIsOpen);
    },
    [
      JSON.stringify(students),
      instrument,
      studentSkillLevel,
      lessonDuration,
      requestMessage,
      placeForLessons,
      title
    ]
  );

  const handleNext = useCallback(
    () => {
      if (steps.length < 3) {
        setStep(prevState => {
          const updatedSteps = [
            ...prevState,
            steps[steps.length - 1] + 1
          ];
          return updatedSteps;
        });
        setCurrentStep(prevState => prevState + 1);
      } else {
        Router.push(Routes.Dashboard);
      }
    },
    [
      steps
    ]
  );

  const showAddRequestForm = useCallback(
    () => {
      setCurrentStep(0);
      setStep([1]);
      showRequestForm(!requestFormIsOpen); 
    },
    [steps]
  )

  const renderRequestForm = (): JSX.Element => (
    <RequestForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleEditSubmit={handleEditSubmit}
      handleCancel={handleCancel}
      instrument={instrument}
      skillLevel={studentSkillLevel}
      requestTitle={title}
      requestMessage={requestMessage}
      lessonDuration={lessonDuration}
      placeForLessons={placeForLessons}
      role={role}
      name={studentName}
      age={studentAge}
      students={students as StudentType[]}
      addStudent={addStudent}
      deleteStudent={deleteStudent}
      isEditing={isEditing}
      isCreatingRequest={isCreatingRequest}
      isEditingRequest={isEditingRequest}
      steps={steps}
      enableAddStudentBtn={enableAddStudentBtn}
    />
  );

  const requestAdded = requests.map((request, i) => (
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
        deleteRequest={(requestId: number) => deleteRequest(requestId)}
        editRequest={(requestId: number) => editRequest(requestId)}
      />
    </li>
  ));

  return (
    <div>
      {!requestFormIsOpen ?
        <div>
          <SectionTitle text={RequestComponent.title} />

          <Typography className="nabi-margin-top-xsmall">
            {role !== Role.parent ? RequestComponent.descriptionStudent :
              RequestComponent.descriptionParent}
          </Typography>

          {
            isFetchingRequests || isCreatingRequest ?
              <div className="nabi-section nabi-profile-loader-container">
                <CircularProgress />
              </div> :
              requests.length > 0 && (
                <div className="nabi-margin-top-small">
                  <SectionTitle text={RequestAddedComponent.title} />
                  <ul>
                    {requestAdded}
                  </ul>
                </div>
              )
          }

          <div className="nabi-margin-top-medium">
            <Button color="primary" variant="contained" onClick={showAddRequestForm}>
              <Add className="nabi-margin-right-xsmall" />
              {requests.length > 0 ? RequestComponent.ButtonText.AddAnother :
                RequestComponent.ButtonText.Add}
            </Button>
          </div>
        </div>
        : renderRequestForm()}

      <StepperButtons
        backPath={Routes.BuildRequest + RequestBuilderStepper.StepsPaths.AccountInfo}
        icon={<ArrowForward />}
        handleNext={handleNext}
        isNextDisabled={!enableContinue[requestInfo[currentStep]] ? true : false}
      />
      <SnackBar
        isOpen={snackbarIsOpen}
        message={snackbarMessage}
        handleClose={closeSnackbar}
        variant="success"
        hideIcon={true}
      />
    </div>
  );
}

export default Request;