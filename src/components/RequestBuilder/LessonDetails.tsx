import * as React from 'react';
import Router from "next/router";
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import * as _ from "lodash";

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Icon,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import Delete from '@material-ui/icons/Delete';

import {
  fetchUser,
  requestToken
} from '../../redux/actions/UserActions';
import {
  createStudent,
  fetchStudents,
  deleteStudent
} from '../../redux/actions/RequestActions';
import { getCookie } from '../../utils/cookies';
import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import PhoneValidation from '../AccountInfo/PhoneValidation';
import PageTitle from '../common/PageTitle';
import { VerificationChannel } from '../AccountInfo/models';
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';
import { StudentDetailsType } from '../Dashboard/ParentStudentDashboard/model';
import { LessonDetailsComponent } from './constants';
import StudentForm from './StudentForm';
import ScheduleLessonForm from './ScheduleLessonForm';

interface DispatchProps {
  createStudent: (student: StudentDetailsType) => void;
  fetchStudents: () => void;
  deleteStudent: (id: number) => void;
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
}

interface Props extends
  DispatchProps,
  StateProps,
  OwnProps {
    redirectUrl: string;
  }


export const LessonDetails = (props: Props) => {
  const [showForm, setShowForm] = React.useState(false);
  const [students, setStudents] = React.useState([] as StudentDetailsType[]);
  const [lessonDate, setLessonDate] = React.useState('');
  const [lessonTime, setLessonTime] = React.useState('');
  const [timezone, setTimezone] = React.useState('');

  React.useEffect(() => {
    //get students
    const fetchData = async () => {
      await props.fetchStudents();
    };
    fetchData();

  },[]);

  React.useEffect(() => {
    if (props.students.length > 0) {
      setStudents(props.students)
    }
  },[props.students])

  const addStudent = async (student) => {
    await props.createStudent(student);
  }

  const deleteStudent = async (id) => {
    await props.deleteStudent(id);
  }

  const role = getCookie('role');

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <PageTitle
        pageTitle={role === Role.parent ?
          LessonDetailsComponent.pageTitleParent :
          LessonDetailsComponent.pageTitleStudent
        }
      />
      <div className="nabi-section nabi-background-white">
        {(students.length > 0) ?
          students.map((item, i) => (
            <Grid item={true} xs={12} md={6} className="nabi-border-radius nabi-padding-xsmall nabi-background-nabi nabi-margin-bottom-small" key={i}>
              <Grid container={true}>
                <Grid item={true} xs={1}>
                  <FaceIcon style={{ color: '#ffffff' }} className="nabi-margin-left-xsmall" />
                </Grid>
                <Grid item={true} xs={10} >
                  <Typography className="nabi-color-white nabi-margin-top-xsmall">{`${item.name} (${item.instrument})`}</Typography>
                </Grid>
                <Grid item={true} xs={1}>
                  <Delete
                  style={{ color: '#ffffff' }}
                  className="nabi-float-right nabi-cursor-pointer"
                  onClick={() => deleteStudent(item.id)}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))
        :''
      }
      {role === Role.parent &&
        (!showForm ?
          props.isAddingStudent ?
          <CircularProgress /> :
          <Button
            color="primary"
            onClick={()  => setShowForm(true)}
            startIcon={<Icon color="primary">add_circle</Icon>}
          >
            Add Child
          </Button> :
        <StudentForm closeForm={() => setShowForm(false)} addChild={addStudent} role={role} />
        )}
      {
        role === Role.student && <StudentForm closeForm={() => setShowForm(false)} addChild={addStudent} role={role} />
      }
      </div>
      {role === Role.student || (role === Role.parent && students.length > 0) &&
        <div className="nabi-text-right">
          <Button color="primary" variant="contained" className="nabi-margin-top-small">
            Next
          </Button>
        </div>
      }
      {/* <ScheduleLessonForm 
      /> */}
    </div>
  )
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    students,
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
      }
    },
  } = state.requests;

  return {
    isFetchingStudents,
    fetchError,
    isAddingStudent,
    addError,
    isDeletingStudent,
    deleteError,
    students
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  createStudent: (student: StudentDetailsType) => dispatch(createStudent(student)),
  fetchStudents: () => dispatch(fetchStudents()),
  deleteStudent: (id: number) => dispatch(deleteStudent(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonDetails);
