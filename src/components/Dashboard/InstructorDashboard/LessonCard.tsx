import * as React from 'react';
import Router from 'next/router';

import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';

import { setCookie } from "../../../utils/cookies";
import { Routes } from '../../common/constants/Routes';
import { InstructorDashboardComponent as constants }  from '../constants';
import { LessonType } from '../models';

interface Props {
  lesson: LessonType;
}

const LessonCard: React.StatelessComponent<Props> = props => {
  const gradeLesson = () => {
    if (props.lesson.parent) {
      const studentNames: string[] = [];
      props.lesson.students.forEach(student =>
        studentNames.push(student.name)
      );
      setCookie("lessonStudentName", studentNames.join(', '));
    } else {
      setCookie("lessonStudentName", props.lesson.studentName);
    }
    setCookie("lessonBookingId", props.lesson.bookingId);
    setCookie("lessonInstrument", props.lesson.instrument);

    Router.push(Routes.GradeLesson);
  }

  return (
    <Grid container={true}>
      <Grid item={true} xs={12} md={4} className="nabi-text-center">
        <p className="nabi-font-large nabi-color-nabi nabi-margin-top-xsmall nabi-margin-bottom-zero nabi-text-semibold">{props.lesson.lessonsRemaining}</p>
        <Typography color="primary">{constants.lessonsRemaining}</Typography>
        <Button
          variant="contained"
          color="primary"
          className="nabi-responsive-button"
          onClick={gradeLesson}
          disabled={!props.lesson.lessonsRemaining}
        >
          {constants.gradeLessonButton}
        </Button>
      </Grid>
      <Grid item={true} xs={12} md={8}>
        <Grid container={true} className="nabi-margin-top-small">
          {props.lesson.parent ?
          <React.Fragment>
            <Grid item={true} xs={6}>
              <Typography>{constants.lessonDetailLabels.parent}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{props.lesson.parent}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{constants.lessonDetailLabels.students}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>
                {props.lesson.students.map((student, i) =>
                  <span key={i}>{`${student.name} ${student.age} ${props.lesson.students[props.lesson.students.length - 1] ? '' : ', '}`}</span>
              )}
              </Typography>
            </Grid>
          </React.Fragment>
          :
          <React.Fragment>
            <Grid item={true} xs={6}>
              <Typography>{constants.lessonDetailLabels.name}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{props.lesson.studentName}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{constants.lessonDetailLabels.age}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{props.lesson.age}</Typography>
            </Grid>
            </React.Fragment>
          }
          <Grid item={true} xs={6}>
            <Typography>{constants.lessonDetailLabels.instrument}</Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Typography>{props.lesson.instrument}</Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Typography>{constants.lessonDetailLabels.skillLevel}</Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Typography>{props.lesson.skillLevel}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LessonCard;
