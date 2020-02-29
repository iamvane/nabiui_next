import * as React from 'react';

import {
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
// import Done from '@material-ui/icons/Done';
import dynamic from "next/dynamic";
const Done = dynamic(() => import('@material-ui/icons/Done'), {
  ssr: false,
});

import { PhoneValidationFormComponent } from './constants';

interface Props {
  phoneNumber: string | undefined;
  isEditing?: boolean;
}

const PhoneNumberAdded: React.StatelessComponent<Props> = props => {
  let value = props.phoneNumber + '';
  let formattedText = value.replace(/^(\d{3})(\d{3})(\d{4}).*/, '+1 ($1) $2-$3');

  return (
    <Grid item={true} xs={12} container={true}>
      <Grid xs={12} md={props.isEditing ? 5 : null} item={true}>
        <Typography>
          {formattedText}
        </Typography>
      </Grid>
      <Grid xs={12} md={props.isEditing ? 6 : null} item={true}>
        <Typography
          color="primary"
          className="nabi-margin-right-xsmall nabi-color-nabi nabi-display-inline"
        >
          {PhoneValidationFormComponent.validationSucessful}
        </Typography>
        <IconButton color="primary" disabled={true}>
          <Done />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PhoneNumberAdded;
