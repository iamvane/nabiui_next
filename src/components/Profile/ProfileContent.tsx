import * as React from 'react';

import {
  Grid,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import EducationAdded from '../Education/EducationAdded';
import { Qualifications } from '../Qualifications/constants';
import EmploymentAdded from '../Employment/EmploymentAdded';
// import Reviews from '../Reviews/Reviews';
import MusicAdded from '../Music/MusicAdded';
import { ProfileContentComponent } from './constants';

interface Props {
  instructor: any;
}

/**
 * Profile Content
 */
const ProfileContent: React.StatelessComponent<Props> = props => {
  const qualifications = props.instructor.qualifications && Object.keys(props.instructor.qualifications).map((key: string, i: number) => {
    let qualificationItems = [];
    if (props.instructor.qualifications[key] === true) {
      qualificationItems.push(Qualifications[key])
    }
    return qualificationItems;
  });

  const employmentAdded = props.instructor.employment && props.instructor.employment.map((employment, i) => (
    <li className="nabi-list" key={i}>
      <EmploymentAdded
        id={employment.id}
        employer={employment.employer}
        jobTitle={employment.jobTitle}
        jobLocation={employment.jobLocation}
        fromMonth={employment.fromMonth}
        fromYear={employment.fromYear}
        toMonth={employment.toMonth}
        toYear={employment.toYear}
        notEditable={true}
      />
    </li>
  ));

  const educationAdded = props.instructor.education && props.instructor.education.map((education, i) => (
    <li className="nabi-list" key={i}>
      <EducationAdded
        id={education.id}
        school={education.school}
        graduationYear={education.graduationYear}
        schoolLocation={education.schoolLocation}
        degreeType={education.degreeType}
        fieldOfStudy={education.fieldOfStudy}
        notEditable={true}
      />
    </li>
  ));

  // const reviews = props.reviews.map((review, i) => (
  //     <Reviews
  //       key={i}
  //       id={review.id}
  //       name={review.name}
  //       avatarImage={review.avatarImage}
  //       rating={review.rating}
  //       comment={review.comment}
  //       date={review.date}
  //     />
  // ));
  const firstName = props.instructor.displayName ? props.instructor.displayName.split(' ')[0] : '';
  const music = props.instructor.music && props.instructor.music.map((item, i) => (
    <MusicAdded
      key={i}
      deleteMusic={() => null}
      addMusic={() => null}
      notEditable={true}
      embedCode={
        item ?
        <iframe
          src={item}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        /> : <iframe />
      }
    />
  ));
  return (
    <div>
      <SectionTitle
        text={
          ProfileContentComponent.Text.Meet.replace(
            ProfileContentComponent.instructorNamePlaceholder,
            firstName
          )
        }
      />
      <Typography className="nabi-margin-bottom-medium">
        {props.instructor.bioDescription ? props.instructor.bioDescription : ProfileContentComponent.Text.noContent}
      </Typography>
      <SectionTitle text={ProfileContentComponent.Text.TeachingExperience} />
      {props.instructor.employment && props.instructor.employment.length ?
        <ul className="nabi-margin-bottom-medium">{employmentAdded}</ul> :
        <Typography className="nabi-margin-bottom-medium">{ProfileContentComponent.Text.noContent}</Typography>
      }
      <SectionTitle text={ProfileContentComponent.Text.Education} />
      {props.instructor.education && props.instructor.education.length ?
        <ul className="nabi-margin-bottom-medium">{educationAdded}</ul> :
        <Typography className="nabi-margin-bottom-medium">{ProfileContentComponent.Text.noContent}</Typography>
      }
      <SectionTitle text={ProfileContentComponent.Text.Music} />
      <Grid container={true} className="nabi-margin-top-small">
        {props.instructor.music && props.instructor.music.length ?
          music :
          <Typography className="nabi-margin-bottom-medium">{ProfileContentComponent.Text.noContent}</Typography>
        }
      </Grid>
      <SectionTitle text={ProfileContentComponent.Text.AdditionalQualifications} />
      {props.instructor.qualifications ?
        <Typography className="nabi-margin-bottom-medium">{qualifications.join(', ')}</Typography> :
        <Typography className="nabi-margin-bottom-medium">{ProfileContentComponent.Text.noContent}</Typography>
      }
      {/* <SectionTitle text={ProfileContentComponent.Text.Reviews} /> */}
      {/* <div id="reviews-wrapper" className="nabi-padding-right-small nabi-padding-left-xsmall">
        <div id="reviews">
          {reviews}
        </div>
      </div> */}
    </div>
  );
};

export default ProfileContent;
