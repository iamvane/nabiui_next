import * as React from 'react';
import {
  Divider,
  Grid,
  Typography
} from '@material-ui/core';

interface Props {
  text: string;
  cta?: JSX.Element;
  noDivider?: boolean;
}

const SectionTitle: React.StatelessComponent<Props> = props => {
  return (
    <React.Fragment>
      <Grid container={true}>
        <Grid item={true} xs={props.cta ? 8 : 12}>
          <Typography color="primary" className="nabi-text-mediumbold nabi-text-uppercase nabi-margin-bottom-xsmall">
            {props.text}
          </Typography>
        </Grid>
        {props.cta &&
          <Grid item={true} xs={4} className="nabi-text-right">
            {props.cta}
          </Grid>
        }
      </Grid>
      {!props.noDivider && <Divider className="nabi-margin-bottom-xsmall" />}
    </React.Fragment>
  );
};

export default SectionTitle;
