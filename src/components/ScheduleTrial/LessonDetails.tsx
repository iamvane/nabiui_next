import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import {
  CircularProgress,
  Grid
} from '@material-ui/core';
import {
  createStudent,
} from '../../redux/actions/RequestActions';
import { fetchTimezones } from '../../redux/actions/TimezonesActions';
import { getCookie } from '../../utils/cookies';
import { Timezone } from '../../redux/models/TimeZonesModel';
import { StoreState } from '../../redux/reducers/store';
import PageTitle from '../common/PageTitle';
import { Role } from '../../constants/Roles';
import { StudentDetailsType } from '../Dashboard/ParentStudentDashboard/model';
import {
  LessonDetailsComponent,
  ScheduleTrialFormComponent
} from './constants';
import StudentForm from './StudentForm';

interface DispatchProps {
  createStudent: (student: StudentDetailsType) => void;
  fetchTimezones: () => void;
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
}

interface Props extends
  DispatchProps,
  StateProps,
  OwnProps {
    redirectUrl: string;
  }


export const LessonDetails = (props: Props) => {
  const [lessonDate, setLessonDate] = React.useState('');
  const [lessonTime, setLessonTime] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const [scheduleErrors, setScheduleErrors] = React.useState({} as ScheduleTrialFormComponent.FormErrors)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    if (name === ScheduleTrialFormComponent.FieldNames.LessonTime) {
      setLessonTime(value);
      setScheduleErrors({
        ...scheduleErrors,
        time: ''
      });
    } else if (name === ScheduleTrialFormComponent.FieldNames.UserTimezone) {
      setTimezone(value);
      setScheduleErrors({
        ...scheduleErrors,
        timezone: ''
      });
    }
  }

  const handleLessonDateChange = (date: moment.Moment): void => {
    setLessonDate(String(date));
  };

  const validate = () => {
    const { FieldKey } = ScheduleTrialFormComponent

    const formErrors: ScheduleTrialFormComponent.FormErrors = {
      date: "",
      time: "",
      timezone: ""
    };

    // Validate date
    if (!lessonDate) {
      formErrors[FieldKey.LessonDate] = ScheduleTrialFormComponent.ErrorMessages.LessonDate;
    }

    // Validate time
    if (!lessonTime) {
      formErrors[FieldKey.LessonTime] = ScheduleTrialFormComponent.ErrorMessages.LessonTime;
    }

    // Validate timezone
    if (!timezone) {
      formErrors[FieldKey.UserTimezone] =
      ScheduleTrialFormComponent.ErrorMessages.UserTimezone;
    }
    return formErrors;
  };

  const addStudent = async (student) => {
    await props.createStudent(student);
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
      <Grid
        item={true}
        xs={12}
        md={8} className="nabi-section nabi-background-white nabi-margin-center"
      >
        {
          props.isAddingStudent ?
          <CircularProgress /> :
          <StudentForm addChild={addStudent} role={role} />
        }
      </Grid>
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
    timezones
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  createStudent: (student: StudentDetailsType) => dispatch(createStudent(student)),
  fetchTimezones: () => dispatch(fetchTimezones())
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonDetails);
