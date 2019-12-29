import * as React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { addMusicSteps } from './constants';

interface Props {
  stepImages: string[];
}

const AddMusicSteps: React.StatelessComponent<Props> = props => {
  const musicSteps = props.stepImages.map((step, i) => (
    <Grid xs={12} sm={7} md={4} item={true} key={i}>
      <Typography className="nabi-margin-bottom-xsmall">
        {addMusicSteps[i]}
      </Typography>
      <img
        className="nabi-text-center nabi-full-width"
        src={step}
        alt=""
      />
    </Grid>
  ));

  return (
    <Grid container={true} spacing={10} justify="space-between" className="nabi-margin-bottom-small">
      {musicSteps}
    </Grid>
  );
};

export default AddMusicSteps;