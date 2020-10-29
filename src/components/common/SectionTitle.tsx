import * as React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';

interface Props {
  text: string;
  cta?: JSX.Element;
}

const SectionTitle = (props: Props) => {
  return (
    <React.Fragment>
      <Grid container={true}>
        <Grid item={true} xs={props.cta ? 8 : 12}>
          <Typography className="nabi-text-mediumbold nabi-margin-bottom-xsmall">
            {props.text}
          </Typography>
        </Grid>
        {props.cta &&
          <Grid item={true} xs={4} className="nabi-text-right">
            {props.cta}
          </Grid>
        }
      </Grid>
    </React.Fragment>
  );
};

export default SectionTitle;
