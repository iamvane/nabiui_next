import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from "next/router";
import moment from 'moment';
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
import ConfirmExit from '../CommonStepper/ConfirmExit';
import {
  RequestComponent,
  RequestAddedComponent,
  RequestCreateSuccessMessage,
  enableContinueBtn
} from './constants';
import { ScheduleLessonsComponent } from '../ScheduleLessons/constants';
import { timeSelect } from '../../../assets/data/time';

export const Request = () => {
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
  const [travelDistance, setTravelDistance] = useState('');
  const [studentRequests, setStudentRequests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [requestFormIsOpen, showRequestForm] = useState(false);
  const [snackbarIsOpen, showSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [steps, setStep] = useState([0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [enableContinue, setEnableContinue] = useState(enableContinueBtn);
  const [enableAddStudentBtn, setEnableAddStudentBtn] = useState(false);
  const [enableAddRequestBtn, setAddRequestEnabled] = useState(false);
  const [exitFormIsOpen, setExitFormOpen] = useState(false);
  const [lessonDateError, setLessonDateError] = useState('');
  const [allFieldsFilledError, setAllFieldsFilledError] = useState('');
  const [requestInfo, setRequestInfo] = useState([
    'none',
    'scheduleTrial',
    'requestDetail',
    'studentDetail',
    'requestMessage'
  ]);

  const [lessonDate, setLessonDate] = useState('');
  const [lessonTime, setLessonTime] = useState('');
  const [timezone, setTimezone] = useState('');
  // const [errors, setErrors] = useState({} as ScheduleLessonsComponent.FormErrors);
  // const [scheduleLessons, setScheduleLessons] = useState(false);

  const closeSnackbar = () => showSnackbar(false);
  const closeExitForm = () => setExitFormOpen(false);
  const handleProceed = () => {
    showRequestForm(false);
    setExitFormOpen(false);
    setCurrentStep(0);
    setStep([0]);
    resetRequestState();
  }

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
    setTravelDistance('');
    setLessonTime('');
    setLessonDate('');
    setTimezone('');
  }

  const resetStudentState = () => {
    setStudentSkillLevel('');
    setStudentName('');
    setStudentAge(0);
  }

  let {
    userId,
    role,
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
      setCurrentStep(0);
      setStep([0]);
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

        setStudents(prevState => {
          const currentStudentsState = [...prevState, studentToAdd];
          resetStudentState();
          return currentStudentsState;
        });
      }
    },
    [
      studentName,
      studentAge,
      studentSkillLevel,
      JSON.stringify(students)
    ]
  );

  const deleteRequest = (requestId: number): void => {
    deleteRequestAction(requestId);
  }

  useEffect(() => {
    if (deleteRequestMessage) {
      fetchRequestsAction();
    }
  }, [
    deleteRequestMessage
  ]);

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
      setStudentSkillLevel(editRequest.skillLevel);
      setTravelDistance(editRequest.travelDistance);
      setIsEditing(true);

      showRequestForm(true);
      setStep(prevState => ([
        ...prevState,
        1, 2, 3, 4
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
      if (name === 'timezone') {
        setTimezone(value);
      }
      if (name === 'time') {
        setLessonTime(value);
      }
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

      if (name === 'distance') {
        setTravelDistance(value);
      }
    },
    []
  );

  const handleBirthdayChange = (date: moment.Moment): void => {
    const trialDay = moment().add({
      days: 2
    }).toDate();

    if (date.toDate() < trialDay) {
      setLessonDateError('Trial day must not be less than 2 days from now')
    } else {
      setLessonDate(String(date));
    }
  };

  useEffect(() => {
    const allTrialScheduleFieldsFilled = [
      timezone,
      lessonDate,
      lessonTime
    ].every((field) => field.length);

    setEnableContinue(prevState => ({
      ...prevState,
      scheduleTrial: allTrialScheduleFieldsFilled
    }));
  }, [
    timezone,
    lessonDate,
    lessonTime
  ]);

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

  const confirmAllFieldsSelected = (
    instrument,
    title,
    placeForLessons,
    lessonDuration,
    students,
    requestMessage,
    studentSkillLevel,
    timezone,
    lessonDate,
    lessonTime
  ) => {
    const allTrialScheduleFieldsFilled = [
      timeSelect,
      lessonDate,
      lessonTime
    ].every(field => field.length);
    const allRequestDetailFieldsFilled = role === Role.parent ? [
      instrument,
      title,
      placeForLessons,
      lessonDuration
    ].every((field) => field.length) : [
      instrument,
      title,
      placeForLessons,
      lessonDuration,
      studentSkillLevel
    ].every((field) => field.length);

    const hasStudent = students.length > 0;
    const requestMessageIsFilled = requestMessage.length > 0;
    return role === Role.parent ? [
      allRequestDetailFieldsFilled,
      hasStudent,
      requestMessageIsFilled,
      allTrialScheduleFieldsFilled
    ].every(value => value) : [
      allRequestDetailFieldsFilled,
      requestMessageIsFilled,
      allTrialScheduleFieldsFilled
    ].every(value => value);
  }

  const confirmSomeFieldsSelected = (
    instrument,
    title,
    placeForLessons,
    lessonDuration,
    students,
    studentName,
    studentSkillLevel,
    studentAge,
    requestMessage,
    timezone,
    lessonDate,
    lessonTime
  ) => {
    const allTrialScheduleFieldsFilled = [
      timezone,
      lessonDate,
      lessonTime
    ].some(field => field.length);
    const allRequestDetailFieldsFilled = [
      instrument,
      title,
      placeForLessons,
      lessonDuration
    ].some((field) => field.length);

    const allStudentDetailFieldsFilled = [
      studentName,
      studentAge,
      studentSkillLevel
    ].some((field) => {
      if (typeof 'string') {
        field.length > 0;
      }
      field > 0;
    });

    const hasStudent = students.length > 0;
    const requestMessageIsFilled = requestMessage.length > 0;

    return [
      allRequestDetailFieldsFilled,
      hasStudent,
      requestMessageIsFilled,
      allStudentDetailFieldsFilled,
      allTrialScheduleFieldsFilled
    ].some(value => value);
  }

  useEffect(() => {
    const allFieldsSelected = confirmAllFieldsSelected(
      instrument,
      title,
      placeForLessons,
      lessonDuration,
      students,
      requestMessage,
      studentSkillLevel,
      timezone,
      lessonDate,
      lessonTime
    );

    setAddRequestEnabled(allFieldsSelected);
  }, [
    instrument,
    title,
    placeForLessons,
    lessonDuration,
    students,
    requestMessage,
    timezone,
    lessonDate,
    lessonTime
  ]);

  const handleNext = useCallback(
    () => {
      const requestDetails = {
        timezone,
        lessonDate,
        lessonTime,
        students,
        instrument,
        lessonDuration,
        requestMessage,
        placeForLessons,
        requestTitle: title,
        skillLevel: studentSkillLevel || 'beginner',
        ...(travelDistance && {
          travelDistance
        })
      } as any

      const numberOfSteps = role === Role.parent ? 5 : 4;
      if (currentStep === 0) {
        Router.push(Routes.Dashboard);
      } else if (steps.length < numberOfSteps) {
        setStep(prevState => {
          const updatedSteps = [
            ...prevState,
            steps[steps.length - 1] + 1
          ];
          return updatedSteps;
        });
        setCurrentStep(prevState => prevState + 1);
      } else {
        const allFieldsSelected = confirmAllFieldsSelected(
          instrument,
          title,
          placeForLessons,
          lessonDuration,
          students,
          requestMessage,
          studentSkillLevel,
          timezone,
          lessonDate,
          lessonTime
        );
        if (role === Role.student) {
          delete requestDetails.students;
        }
        if (allFieldsSelected) {
          if (isEditing) {
            editRequestAction(requestId, requestDetails);
          } else {
            createRequestAction(requestDetails);
            fetchRequestsAction();
          }
        } else {
          setAllFieldsFilledError("All fields must be filled");
        }
      }
    },
    [
      steps,
      instrument,
      title,
      placeForLessons,
      lessonDuration,
      students,
      studentName,
      studentSkillLevel,
      studentAge,
      requestMessage,
      requestId
    ]
  );

  useEffect(() => {
    if (studentRequests.length < requests.length) {
      showRequestForm(false);
      resetRequestState();
      setCurrentStep(0);
      setStep([0]);
    }
  }, [
    JSON.stringify(requests)
  ]);

  useEffect(() => {
    if (role) {
      if (role === Role.student) {
        setRequestInfo([
          'none',
          'requestDetail',
          'requestMessage'
        ])
      }
    }
  }, [
    role
  ])

  const handleExit = useCallback(
    () => {
      const someFieldsSelected = confirmSomeFieldsSelected(
        instrument,
        title,
        placeForLessons,
        lessonDuration,
        students,
        studentName,
        studentAge,
        studentSkillLevel,
        requestMessage,
        timezone,
        lessonDate,
        lessonTime
      );

      if (requestFormIsOpen) {
        if (someFieldsSelected) {
          setExitFormOpen(true);
        } else {
          showRequestForm(false);
          setStep([0]);
          setCurrentStep(0);
        }
      } else {
        Router.push(Routes.Dashboard);
      }
    },
    [
      steps,
      instrument,
      title,
      placeForLessons,
      lessonDuration,
      students,
      studentName,
      studentSkillLevel,
      studentAge,
      requestMessage,
      timezone,
      lessonDate,
      lessonTime
    ]
  );

  const showAddRequestForm = () => {
    setCurrentStep(1);
    setStep(prevState => ([
      ...prevState,
      1
    ]));
    showRequestForm(!requestFormIsOpen);
  }

  const renderRequestForm = (): JSX.Element => (
    <RequestForm
      handleChange={handleChange}
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
      distance={travelDistance}
      enableAddStudentBtn={enableAddStudentBtn}
      enableAddRequestBtn={enableAddRequestBtn}
      timezone={timezone}
      lessonDate={lessonDate}
      lessonTime={lessonTime}
      handleBirthdayChange={handleBirthdayChange}
      lessonDateError={lessonDateError}
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
        handleExit={handleExit}
        errors={allFieldsFilledError}
      />
      <SnackBar
        isOpen={snackbarIsOpen}
        message={snackbarMessage}
        handleClose={closeSnackbar}
        variant="success"
        hideIcon={true}
      />
      <ConfirmExit
        isFormDialogOpen={exitFormIsOpen}
        handleProceed={handleProceed}
        closeHandler={closeExitForm}
      />
    </div>
  );
}

export default Request;