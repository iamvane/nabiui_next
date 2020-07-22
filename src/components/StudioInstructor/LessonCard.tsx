import * as React from 'react';
import Router from 'next/router';

import {
  Avatar,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import StarIcon from '@material-ui/icons/Star';
import FaceIcon from '@material-ui/icons/Face';

import { setCookie } from "../../utils/cookies";
import { Routes } from '../common/constants/Routes';
import { LessonCardComponent }  from './constants';
import { LessonType } from '../Dashboard/models';
import '../../../assets/scss/LessonCard.scss';

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
    setCookie("lessonId", props.lesson.lastLessonId);
    setCookie("lessonInstrument", props.lesson.instrument);

    Router.push(Routes.GradeLesson);
  }

  const displayAvatar = () => {
    const findIndex = LessonCardComponent.avatarInstrumentImages.map(
      (o) => o.instrument).indexOf(props.lesson.instrument);

      if (findIndex < 0) {
        return LessonCardComponent.avatarInstrumentImages[7].image;
      } else {
        return LessonCardComponent.avatarInstrumentImages[findIndex].image;
      }
  };

  return (
    <Grid container={true} className="nabi-background-white nabi-border-radius nabi-padding-small">
      <Grid item={true} xs={2}>
        <Avatar className="lesson-card-avatar" src={displayAvatar()} />
      </Grid>
      <Grid item={true} xs={6} md={4}>
        {props.lesson.parent ?
          <Grid container={true}>
            <Grid xs={12} item={true}>
              <Typography color="primary"><span className="nabi-text-mediumbold nabi-display-block">{props.lesson.parent}</span></Typography>
            </Grid>
            <Grid xs={12} item={true}>
              <ChildCareIcon className="text-aligned-icon" />
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">
                {props.lesson.students.length > 0 ?
                  props.lesson.students.map((student, i) =>
                    <span key={i}>{`${student.name}`}</span>
                  )
                :
                  <span>No Data</span>
                }
              </Typography>
            </Grid>
            <Grid xs={12} item={true}>
              <HourglassEmptyIcon className="text-aligned-icon" />
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">
                {props.lesson.students.length > 0 ?
                  props.lesson.students.map((student, i) =>
                  <span key={i}>{`${student.age} y/o`}</span>
                ) :
                <span>No Data</span>
                }
              </Typography>
            </Grid>
          </Grid> :
          <Grid container={true}>
            <Grid xs={12} item={true}>
              <Typography color="primary" className="nabi-display-block"><span className="nabi-text-mediumbold nabi-display-block">{props.lesson.studentName}</span></Typography>
            </Grid>
            <Grid xs={12} item={true}>
              <FaceIcon className="text-aligned-icon" />
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">Student</Typography>
            </Grid>
            <Grid xs={12} item={true}>
              <HourglassEmptyIcon className="text-aligned-icon" />
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">{props.lesson.age} y/o</Typography>
            </Grid>
          </Grid>
          }
          <Grid xs={12} item={true}>
            <MusicNoteIcon className="text-aligned-icon" />
            <Typography className="nabi-display-inline nabi-margin-left-xsmall">{props.lesson.instrument}</Typography>
          </Grid>
          <Grid xs={12} item={true}>
            <ShowChartIcon className="text-aligned-icon" />
            <Typography className="nabi-display-inline nabi-margin-left-xsmall">{props.lesson.skillLevel}</Typography>
          </Grid>
      </Grid>
      <Grid item={true} xs={4} md={6} className="nabi-text-center">
        <Button
          variant="contained"
          color="primary"
          className="nabi-responsive-button"
          onClick={gradeLesson}
          disabled={!props.lesson.lessonsRemaining || (props.lesson.lastLessonId === null)}
        >
          <StarIcon />
          {LessonCardComponent.gradeLessonButton}
        </Button>
        <Typography color="primary">{props.lesson.lessonsRemaining} {LessonCardComponent.lessonsRemaining}</Typography>
      </Grid>
    </Grid>
  );
};

export default LessonCard;
