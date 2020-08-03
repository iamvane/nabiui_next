import * as React from 'react';

import {
  Checkbox,
  FormGroup,
  FormControlLabel,
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
    </div>
  );
};

export default (PlaceForLessonsForm);
