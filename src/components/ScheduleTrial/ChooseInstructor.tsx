import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import {
  Button,
  CircularProgress,
  Icon,
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
  ChooseInstructorComponent,
  instructorsDummuyData
} from './constants';
import StudentForm from './StudentForm';
import InstructorCard from './InstructorCard';
import { InstructorCardType } from './models';

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


export const ChooseInstructor = (props: Props) => {
  const [viewMore, setViewMore] = React.useState(false);

  const handleContinue = (id: number) => {
    console.log(id);
  }

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <PageTitle
        pageTitle={ChooseInstructorComponent.pageTitle}
      />
      {instructorsDummuyData.map((instructor, i) => (
        <>
        <InstructorCard
          key={instructor.id}
          bestMatch={i === 0 && true}
          show={i === 0 ? true : viewMore}
          id={instructor.id}
          displayName={instructor.displayName}
          reviews={instructor.reviews}
          experience={instructor.experience}
          age={instructor.age}
          backgroundCheckStatus={instructor.backgroundCheckStatus}
          rate={instructor.rate}
          avatar={instructor.avatar}
          bioTitle={instructor.bioTitle}
          handleContinue={handleContinue}
        />
        {i === 0 && !viewMore &&
          <div className="nabi-text-center nabi-margin-bottom-large">
            <Button
              color="primary"
              onClick={() => setViewMore(true)}
              startIcon={<Icon color="primary">visibility</Icon>}
            >
              View More Candidates
            </Button>
          </div>
        }
        </>
      ))}
    </div>
  )
}

export default ChooseInstructor;
