import * as React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import NavigationMobile from './NavigationMobile';
import NavigationDesktop from './NavigationDesktop';
import { LessonType, NextLesson } from '../Dashboard/models';

interface Props {
  instructorId?: number;
  role?: string;
  isRequesting?: boolean;
  handleUserLogout?: () => void;
  lessons?: LessonType[];
  nextLesson?: NextLesson;
}

const navigationContainerGrid = makeStyles(() => ({
  root: {
    display: "flex !important",
    justifyContent: "center !important",
    padding: "10px !important",
    marginBottom: "20px !important"
  }
}))

export const NavigationContainer = (props: Props) => {
  const containerClass = navigationContainerGrid();
  return (
    <Grid className={containerClass.root} item={true} xs={12}>
      <Grid container={true} className="nabi-flex-space-between">
          <NavigationMobile
            instructorId={props.instructorId}
            role={props.role}
            handleUserLogout={props.handleUserLogout}
            isRequesting={props.isRequesting}
            lessons={props.lessons}
            nextLesson={props.nextLesson}
          />
          <NavigationDesktop
            instructorId={props.instructorId} role={props.role}
            lessons={props.lessons}
            nextLesson={props.nextLesson}
          />
        </Grid>
    </Grid>
  );
}

export default NavigationContainer;
