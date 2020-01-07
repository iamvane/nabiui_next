import * as React from 'react';
import {
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

import { StudentType } from './models';
import { StudentAddedComponent } from './constants';

interface Props extends StudentType {
  deleteStudent: (instrumentName: string) => void;
}

const StudentAdded: React.StatelessComponent<Props> = props => {
  const instrumentNameUppercase = props.name.charAt(0).toUpperCase() + props.name.slice(1);

  return (
    <Grid item={true} md={6} xs={12}>
      <ListItem>
        <ListItemText
          primary={
            StudentAddedComponent.studentAdded.replace(
              StudentAddedComponent.instrumentPlaceholder,
              instrumentNameUppercase
            ).replace(
              StudentAddedComponent.agePlaceholder,
              String(props.age)
            ).replace(
              StudentAddedComponent.skillLevelPlaceholder,
              props.skillLevel
            )
          }
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => props.deleteStudent(props.name)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Grid>
  );
};

export default StudentAdded;
