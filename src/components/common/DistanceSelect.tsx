import * as React from 'react';

import {
  Typography,
  Grid,
  FormControl,
  Select,
} from '@material-ui/core';

import * as constants from 'components/common/constants/DistanceSelect';

interface Props {
  label?: string;
  distance: string | undefined;
  handleChange: (event: React.FormEvent<{}>) => void;
}

const DistanceSelect: React.StatelessComponent<Props> = props => {
  const milesSelectItems = (): JSX.Element[] => {
    const items = [];
    let index;
    for (index = 1; index < 50; index++) {
      if (index > 5) {
        index += 4;
      }
      items.push(<option key={index} value={index}>{index} {constants.optionsText}</option>);
    }
    return items;
  };

  return (
    <Grid container={true} spacing={8}>
      <Grid className="nabi-align-vertical-items" item={true} xs={12} lg={4}>
        <Typography>
          {props.label || constants.defaultLabel}
        </Typography>
      </Grid>
      <Grid item={true} xs={12} lg={8}>
        <FormControl fullWidth={true}>
          <Select
            native={true}
            value={props.distance}
            onChange={props.handleChange}
            inputProps={{
              id: constants.fieldId,
              name: constants.fieldName
            }}
          >
            <option value="" disabled={true}>
              {constants.placeholder}
            </option>
            {milesSelectItems()}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DistanceSelect;
