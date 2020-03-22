import * as React from 'react';

import { Grid } from '@material-ui/core';

import NavigationMobile from './NavigationMobile';
import NavigationDesktop from './NavigationDesktop';

interface Props {
  instructorId?: number;
  role?: string;
}

export const NavigationContainer = (props: Props) => {
  return (
    <Grid className="" item={true} xs={12}>
      <div className="nabi-border-radius nabi-background-white-md">
        <Grid container={true}>
          <NavigationMobile instructorId={props.instructorId} role={props.role} />
          <NavigationDesktop instructorId={props.instructorId} role={props.role} />
        </Grid>
      </div>
    </Grid>
  );
}

export default NavigationContainer;