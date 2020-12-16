import * as React from 'react';

import {
  Grid,
  IconButton,
  DoneIcon as Done
} from 'nabi_web_components';

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
        <p>
          {formattedText}
        </p>
      </Grid>
      <Grid xs={12} md={props.isEditing ? 6 : null} item={true}>
        <p
          className="nabi-margin-right-xsmall nabi-color-nabi nabi-display-inline"
        >
          {PhoneValidationFormComponent.validationSucessful}
        </p>
        <IconButton color="primary" disabled={true}>
          <Done />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PhoneNumberAdded;
