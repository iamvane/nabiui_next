import * as React from 'react';
import {
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

import { TrialTimesAddedComponent } from './constants';

interface Props {
  day: string;
  timeFrame: string;
  deleteTrialTime: (day: string, timeFrame: string) => void;
}

const TrialTimesAdded: React.StatelessComponent<Props> = props => {
  // const dayUppercase = props.day &&
  //   props.day.charAt(0).toUpperCase() + props.day.slice(1);

  return (
    <Grid item={true} md={6} xs={12}>
      <ListItem>
        <ListItemText
          primary={
            TrialTimesAddedComponent.trialTimesAdded.replace(
              TrialTimesAddedComponent.dayPlaceholder,
              props.day
            ).replace(
              TrialTimesAddedComponent.timeFramePlaceholder,
              props.timeFrame
            )
          }
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => props.deleteTrialTime(props.day, props.timeFrame)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Grid>
  );
};

export default TrialTimesAdded;
