import * as React from "react";
import { Redirect } from "react-router-dom";

import InstructorCard from "./InstructorCard";
import { Route } from "./constants";
import {
  Instructor,
  Rates,
  InstructorType
} from "../../redux/models/InstructorModel";

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
        // props.instructor.id ? <Redirect to={`${Route.Profile}/${props.instructor.id}`} /> :
        <React.Fragment>
          {props.instructors && props.instructors.length > 0 && props.instructors.map((instructor: Instructor, i: number) => (
            <InstructorCard
              key={i}
              id={instructor.id as number}
              fetchInstructor={props.fetchInstructor}
              age={instructor.age ? instructor.age : 0}
              memberSince={instructor.memberSince ? instructor.memberSince : ''}
              lastLogin={instructor.lastLogin ? instructor.lastLogin : ''}
              displayName={instructor.displayName ? instructor.displayName : ''}
              reviewsNumber={instructor.reviews ? instructor.reviews : 0}
              instruments={instructor.instruments ? instructor.instruments as any : []}
              backgroundCheckStatus={instructor.backgroundCheckStatus ? instructor.backgroundCheckStatus : ''}
              favorite={instructor.favorite ? instructor.favorite : false}
              lessonsTaught={instructor.lessonsTaught ? instructor.lessonsTaught : 0}
              avatarImage={instructor.avatar as string}
              rateStartAt={instructor.rates as Rates}
              bioTitle={instructor.bioTitle as string}
              bioDescription={instructor.bioDescription as string}
              distance={instructor.distance}
              experience={instructor.yearsOfExperience}
              placeForLessons={instructor.placeForLessons}
            />
          ))}
        </React.Fragment>}
    </div>
  );
};

export default Instructors;
