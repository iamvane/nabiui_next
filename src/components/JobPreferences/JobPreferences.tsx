import * as React from 'react';

import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import {
  JobPreferencesOptions,
  JobPreferencesComponent
} from './constants';
import {
  AgeGroupType
} from './model';

interface Props extends AgeGroupType {
  handleChange: (event: React.FormEvent<{}>) => void;
}

const JobPreferences: React.StatelessComponent<Props> = props => {
  const JobPreferencesFields = [];

  for (const [key, value] of Object.entries(JobPreferencesOptions)) {
    JobPreferencesFields.push(
      <FormControlLabel
        key={key}
        control={
          <Checkbox
            name={value.name}
            onChange={props.handleChange}
            checked={(props as any)[value.name]}
          />
        }
        label={value.label}
      />
    );
  }

  return (
    <div>
      <SectionTitle text={JobPreferencesComponent.Text.StudentAge} />
      <Typography className="nabi-margin-top-small nabi-margin-bottom-xsmall">
        {JobPreferencesComponent.Text.SpecifyWhatAge}
      </Typography>
      <FormGroup className="nabi-margin-left-small">
        {JobPreferencesFields}
      </FormGroup>
    </div>
  );
};

export default (JobPreferences);
