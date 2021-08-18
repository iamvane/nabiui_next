import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  //Dispatch
} from 'redux';

//import {
//  Dispatch,
//  ThunkAction
//} from 'redux-fixed';
import {
  Dispatch,
  ThunkAction
} from 'redux-fixed';


import Router from "next/router";

import {
  CircularProgress,
  Grid
} from '@material-ui/core';
import {
  createStudent,
  fetchStudents
} from '../../redux/actions/RequestActions';
import PrivateRoute from "../Auth/PrivateRoutes"
import { getCookie, setCookie, removeCookie } from '../../utils/cookies';
import { Timezone } from '../../redux/models/TimeZonesModel';
import { StoreState } from '../../redux/reducers/store';
import PageTitle from '../common/PageTitle';
import SnackBar from '../common/SnackBar';
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';
import { StudentDetailsType } from '../Dashboard/ParentStudentDashboard/model';
import {
  LessonDetailsComponent,
} from './constants';
import StudentForm from './StudentForm';
import { Header } from '../Header/Header';
import { Footer } from "../common/Footer";

interface DispatchProps {
  createStudent: (student: StudentDetailsType) => void;
  fetchStudents: () => void;
}

interface OwnProps {
  nextPath: string;
}

interface StateProps {
  isFetchingStudents: boolean;
  isAddingStudent: boolean;
  isDeletingStudent: boolean;
  fetchError: string;
  deleteError: string;
  addError: string;
  students: StudentDetailsType[];
  timezones: Timezone[];
  student: StudentDetailsType;
}

interface Props extends
  DispatchProps,
  StateProps,
  OwnProps {
  redirectUrl: string;
}

export const LessonDetails = (props: Props) => {
  const [addStudent, setAddStudent] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackErrorMessage, setSnackErrorMessage] = React.useState('');


  const createStudent = async (student) => {
    await props.createStudent(student);

    setAddStudent(true);
  }


  React.useEffect(() => {
    if (props.addError) {
      setSnackErrorMessage(props.addError)
      return setShowSnackbar(true);
    }

    if (addStudent && props.student?.studentId) {
      setCookie("studentId", props.student.studentId);
      removeCookie("lessonId");
      Router.push(Routes.BookTrial + Routes.InstructorPreferences);
    }
  }, [addStudent, props.addError]);

  const role = getCookie('role');

  return (
    <div>
      <Header />
      <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium">
        <Grid xs={12} md={7} className="nabi-background-white nabi-section nabi-margin-center">
          <div className="nabi-text-center">
            <PageTitle
              pageTitle={
                role === Role.parent ? LessonDetailsComponent.pageTitleParent :
                  LessonDetailsComponent.pageTitleStudent
              }
            />
          </div>
          {
            props.isAddingStudent ?
              <CircularProgress /> :
              <StudentForm addChild={createStudent} role={role} />
          }
        </Grid>
        <SnackBar
          isOpen={showSnackbar}
          message={snackErrorMessage}
          handleClose={() => setShowSnackbar(false)}
          variant="error"
        />
      </div>
      <Footer />
    </div>
  )
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    students,
    student,
    actions: {
      fetchStudents: {
        isRequesting: isFetchingStudents,
        error: fetchError
      },
      createStudent: {
        isRequesting: isAddingStudent,
        error: addError
      },
      deleteStudent: {
        isRequesting: isDeletingStudent,
        error: deleteError
      },
    },
  } = state.requests;

  const {
    timezones
  } = state.timezones;
  return {
    isFetchingStudents,
    fetchError,
    isAddingStudent,
    addError,
    isDeletingStudent,
    deleteError,
    students,
    timezones,
    student,
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  createStudent: (student: StudentDetailsType) => dispatch(createStudent(student)),
  fetchStudents: () => dispatch(fetchStudents())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(LessonDetails, 'Private', ['Student', 'Parent']));
