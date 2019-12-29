import * as React from 'react';

import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import {
  JobPreferencesOptions,
  JobPreferencesComponent
} from './constants';
import {
  LessonSizeType,
  AgeGroupType
} from './model';

interface Props extends
  LessonSizeType,
  AgeGroupType {
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

  const JobPreferencesFieldsFirstHalf = JobPreferencesFields.slice(0, 3);
  const JobPreferencesFieldsSecondHalf = JobPreferencesFields.slice(3);
  return (
    <div>
      <SectionTitle text={JobPreferencesComponent.Text.JobPreferences} />
      <Typography className="nabi-margin-top-xsmall nabi-margin-bottom-xsmall">
        {JobPreferencesComponent.Text.SpecifyHowMany}
      </Typography>
      <FormGroup className="nabi-margin-left-small">
        {JobPreferencesFieldsFirstHalf}
      </FormGroup>
      <Typography className="nabi-margin-top-small nabi-margin-bottom-xsmall">
        {JobPreferencesComponent.Text.SpecifyWhatAge}
      </Typography>
      <FormGroup className="nabi-margin-left-small">
        {JobPreferencesFieldsSecondHalf}
      </FormGroup>
    </div>
  );
};

export default (JobPreferences);
