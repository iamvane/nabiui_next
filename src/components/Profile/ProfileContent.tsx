import * as React from 'react';

import {
  Grid,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import { EducationType } from '../Education/model';
import EducationAdded from '../Education/EducationAdded';
import { Qualifications } from '../Qualifications/constants';
import { EmploymentType } from '../Employment/model';
import EmploymentAdded from '../Employment/EmploymentAdded';
// import Reviews from '../Reviews/Reviews';
import { ReviewsType } from '../Reviews/model';
import MusicAdded from '../Music/MusicAdded';
import { ProfileContentComponent } from './constants';

interface Props {
  bio: string;
  employment: EmploymentType[];
  education: EducationType[];
  reviews: ReviewsType[];
  music: string[];
  qualifications: Qualifications[];
  displayName: string;
  deleteEmployment: (employmentId: number) => void;
  editEmployment: (employmentId: number) => void;
  deleteEducation: (employmentId: number) => void;
  editEducation: (employmentId: number) => void;
}

/**
 * Profile Content
 */
const ProfileContent: React.StatelessComponent<Props> = props => {
  const firstName = props.displayName ? props.displayName.split(' ')[0] : '';
  const qualifications = props.qualifications.map((item: string, i: number) => (
    <span key={i} className="nabi-margin-right-small">{item}</span>));

  const employmentAdded = props.employment.map((employment, i) => (
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
        deleteEmployment={(employmentId: number) => props.deleteEmployment(employmentId)}
        editEmployment={(employmentId: number) => props.editEmployment(employmentId)}
        notEditable={true}
      />
    </li>
  ));

  const educationAdded = props.education.map((education, i) => (
    <li className="nabi-list" key={i}>
      <EducationAdded
        id={education.id}
        school={education.school}
        graduationYear={education.graduationYear}
        schoolLocation={education.schoolLocation}
        degreeType={education.degreeType}
        fieldOfStudy={education.fieldOfStudy}
        deleteEducation={(educationId: number) => props.deleteEducation(educationId)}
        editEducation={(educationId: number) => props.editEducation(educationId)}
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

  const music = props.music.map((item, i) => (
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
        {props.bio ? props.bio : ProfileContentComponent.Text.noContent}
      </Typography>
      <SectionTitle text={ProfileContentComponent.Text.TeachingExperience} />
      {props.employment.length ?
        <ul className="nabi-margin-bottom-medium">{employmentAdded}</ul> :
        <Typography className="nabi-margin-bottom-medium">{ProfileContentComponent.Text.noContent}</Typography>
      }
      <SectionTitle text={ProfileContentComponent.Text.Education} />
      {props.education.length ?
        <ul className="nabi-margin-bottom-medium">{educationAdded}</ul> :
        <Typography className="nabi-margin-bottom-medium">{ProfileContentComponent.Text.noContent}</Typography>
      }
      <SectionTitle text={ProfileContentComponent.Text.Music} />
      <Grid container={true} className="nabi-margin-top-small">
        {props.music.length ?
          music :
          <Typography className="nabi-margin-bottom-medium">{ProfileContentComponent.Text.noContent}</Typography>
        }
      </Grid>
      <SectionTitle text={ProfileContentComponent.Text.AdditionalQualifications} />
      {props.qualifications.length ?
        <Typography className="nabi-margin-bottom-medium">{qualifications}</Typography> :
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
