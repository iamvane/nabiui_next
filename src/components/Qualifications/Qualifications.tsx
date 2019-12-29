import * as React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import {
  qualificationsOptions,
  QualificationsComponent
} from './constants';
import { QualificationsType } from './model';

interface Props extends  QualificationsType {
  handleChange: (event: React.FormEvent<{}>) => void;
  isFilter?: boolean;
}

const Qualification: React.StatelessComponent<Props> = props => {
  const qualificationFields = [];

  for (const [key, value] of Object.entries(qualificationsOptions)) {
    qualificationFields.push(
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

  const qualificationFieldsFirstHalf = qualificationFields.slice(0, 5);
  const qualificationFieldsSecondHalf = qualificationFields.slice(5);
  return (
    <div>
      {!props.isFilter && <SectionTitle text={QualificationsComponent.Text.AdditionalQualifications} />}
      {!props.isFilter &&
        <Typography className="nabi-margin-bottom-small">
         {QualificationsComponent.Text.SpecifyYourAditional}
        </Typography>
      }
      <FormControl component="fieldset">
        {props.isFilter && <FormLabel component="legend">Qualifications</FormLabel>}
          <FormGroup className="nabi-margin-left-small nabi-margin-top-large">
            <Grid container={true} spacing={10}>
              <Grid
                className="qualifications nabi-padding-top-zero nabi-padding-bottom-zero"
                item={true}
                xs={12}
                md={!props.isFilter ? 6 : 12}
              >
                {qualificationFieldsFirstHalf}
              </Grid>
              <Grid
                className="qualifications nabi-padding-top-zero"
                item={true}
                xs={12}
                md={!props.isFilter ? 6 : 12}
              >
              {qualificationFieldsSecondHalf}
              </Grid>
            </Grid>
          </FormGroup>
      </FormControl>
    </div>
  );
};

export default (Qualification);
