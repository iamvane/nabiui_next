import * as React from 'react';
import {
  Grid,
  Icon,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

import { InstrumentAddedComponent } from './constants';

interface Props {
  instrument: string;
  skillLevel: string;
  deleteInstrument: (instrumentName: string) => void;
}

const InstrumentAdded: React.StatelessComponent<Props> = props => {
  const instrumentNameUppercase = props.instrument && 
    props.instrument.charAt(0).toUpperCase() + props.instrument.slice(1);

  return (
    <Grid item={true} md={6} xs={12}>
      <ListItem>
        <ListItemText
          primary={
            InstrumentAddedComponent.instrumentAdded.replace(
              InstrumentAddedComponent.instrumentPlaceholder,
              instrumentNameUppercase
            ).replace(
              InstrumentAddedComponent.skillLevelPlaceholder,
              props.skillLevel
            )
          }
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => props.deleteInstrument(props.instrument)}>
            <Icon>delete</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Grid>
  );
};

export default InstrumentAdded;
