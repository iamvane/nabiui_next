import * as React from 'react';

import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import DistanceSelect from '../common/DistanceSelect';
import { placeForLessonsOptions, PlaceForLessonsComponent } from './constants';
import { PlaceForLessonsType } from './model';

interface Props extends PlaceForLessonsType {
  handleChange: (event: React.FormEvent<{}>) => void;
  isFilter?: boolean;
  [key: string]: any;
}

const PlaceForLessonsForm: React.StatelessComponent<Props> = props => {
  const placeForLessonsItems = [];

  for (const [key, value] of Object.entries(placeForLessonsOptions)) {
    placeForLessonsItems.push(
      <FormControlLabel
        key={key}
        control={
          <Checkbox
            name={value.name}
            checked={props[value.name]}
            onChange={props.handleChange}
          />
        }
        label={value.label}
      />
    );
  }
  const studioAddressTextfield = props.studio && !props.isFilter && (
    <TextField
      fullWidth={true}
      name="studioAddress"
      onChange={props.handleChange}
      required={true}
      className="nabi-margin-top-xsmall"
      placeholder="Enter your studio address"
      error={!!props.studioAddressError}
      helperText={props.studioAddressError || ''}
      value={props.studioAddress}
    />
  );

  const distanceField = props.home && !props.isFilter && (
    <DistanceSelect
      handleChange={props.handleChange}
      distance={props.distance}
    />
  );

  return (
    <div>
      <SectionTitle text={PlaceForLessonsComponent.sectionTitle} />
      {!props.isFilter && <Typography className="nabi-margin-top-xsmall nabi-margin-bottom-xsmall">
        {PlaceForLessonsComponent.description}
      </Typography>
      }
      <FormGroup className="nabi-margin-left-small">
        {placeForLessonsItems}
      </FormGroup>
      {(studioAddressTextfield || distanceField) && 
        <Grid item={true} className="nabi-margin-top-small" xs={12} md={6}>
          {distanceField}
          {studioAddressTextfield}
        </Grid>
      }
    </div>
  );
};

export default (PlaceForLessonsForm);
