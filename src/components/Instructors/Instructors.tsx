import * as React from 'react';
import { Redirect } from 'react-router-dom';

import InstructorCard from 'components/Instructors/InstructorCard';
import { Instructor, Rates, InstructorType } from 'redux/models/InstructorModel';
import { Route } from 'components/Instructors/constants';

interface Props {
  instructors: Instructor[];
  isRequestingInstructor: boolean;
  instructor: InstructorType;
  fetchInstructor: (id: number) => void;
}

const Instructors: React.StatelessComponent<Props> = props => {
  return (
    <div>
      {
        props.instructor.id ? <Redirect to={`${Route.Profile}/${props.instructor.id}`} /> :
        <React.Fragment>
          {props.instructors.length > 0 && props.instructors.map((instructor: Instructor, i: number) => (
            <InstructorCard
              key={i}
              id={instructor.id as number}
              fetchInstructor={props.fetchInstructor}
              age={instructor.age ? instructor.age : 0}
              memberSince={instructor.memberSince ? instructor.memberSince : ''}
              lastLogin={instructor.lastLogin ? instructor.lastLogin : ''}
              address={instructor.address ? instructor.address : ''}
              displayName={instructor.displayName ? instructor.displayName : ''}
              reviewsNumber={instructor.reviews ? instructor.reviews : 0}
              instruments={instructor.instruments ? instructor.instruments as any : []}
              backgroundCheck={instructor.backgroundCheck ? instructor.backgroundCheck : false}
              favorite={instructor.favorite ? instructor.favorite : false}
              lessonsTaught={instructor.lessonsTaught ? instructor.lessonsTaught : 0}
              avatarImage={instructor.avatar as string}
              rateStartAt={instructor.rates as Rates}
              bioTitle={instructor.bioTitle as string}
              bioDescription={instructor.bioDescription as string}
            />
          ))}
        </React.Fragment>}
    </div>
  );
};

export default Instructors;
