import * as React from 'react';

import {
  Checkbox,
  FormControl,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select
} from '@material-ui/core';

import { optionsText, placeholder } from '../common/constants/DistanceSelect';

import {
  SelectOption,
  sortByOptions,
  InstructorFilterComponent,
  ageOptions,
  placeForLessonsLabels,
  placeForLessonsOptions
} from '../Instructors/constants';

interface Props {
  sortBy: string;
  distance: number;
  placeForLessons: string[];
  age: string;
  handleChange: (event: React.FormEvent<{}>) => void;
}

const RequestFilter: React.StatelessComponent<Props> = props => {
  const milesSelectItems = (): JSX.Element[] => {
    const items = [];
    let index;
    for (index = 1; index < 50; index++) {
      if (index > 5) {
        index += 4;
      }
      items.push(<option key={index} value={index}>{index} {optionsText}</option>);
    }
    return items;
  };

  const selectOptions = (options: SelectOption[]) => {
    return  options.map(item =>
      <option key={item.value} value={item.value}>{item.label}</option>
    );
  };

  const selectMenuItems = (options: SelectOption[], values: string[]) => {
    return options.map(item => (
      <MenuItem key={item.value} value={item.value}>
        <Checkbox checked={values.indexOf(item.value) > -1} />
        <ListItemText primary={item.label} />
      </MenuItem>
    ));
  };

  const getLabels = (selected: string[], labels: Object) => {
    const labelsArray: string[] = [];
    selected.forEach(item =>
      labelsArray.push((labels as any)[item])
    );
    return labelsArray.join(', ');
  };

  return (
    <div className="hide-on-mobile">
      <Grid container={true} spacing={0}>
        <Grid item={true} xs={3}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>
              {InstructorFilterComponent.FieldLabels.Sort}
            </InputLabel>
            <Select
              native={true}
              value={props.sortBy}
              onChange={props.handleChange}
              inputProps={{
                id: InstructorFilterComponent.Ids.Sort,
                name: InstructorFilterComponent.FieldNames.Sort
              }}
            >
              <option value="" disabled={true}>
                {InstructorFilterComponent.Placeholders.Sort}
              </option>
              {selectOptions(sortByOptions)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} xs={3}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>
              {InstructorFilterComponent.FieldLabels.Distance}
            </InputLabel>
            <Select
              native={true}
              value={props.distance}
              onChange={props.handleChange}
              inputProps={{
                id: InstructorFilterComponent.Ids.Distance,
                name: InstructorFilterComponent.FieldNames.Distance
              }}
            >
              <option value="" disabled={true}>
                {placeholder}
              </option>
              {milesSelectItems()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} xs={3}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>
              {InstructorFilterComponent.FieldLabels.Location}
            </InputLabel>
            <Select
              multiple={true}
              value={props.placeForLessons}
              onChange={props.handleChange}
              input={<Input />}
              displayEmpty={true}
              name={InstructorFilterComponent.FieldNames.Location}
              renderValue={(selected: string[]) => {
                if (selected.length === 0) {
                  return InstructorFilterComponent.Placeholders.Location;
                }
                return getLabels(selected, placeForLessonsLabels);
              }}
            >
              {selectMenuItems(placeForLessonsOptions, props.placeForLessons)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} xs={3}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>
              {InstructorFilterComponent.FieldLabels.Age}
            </InputLabel>
            <Select
              native={true}
              value={props.age}
              onChange={props.handleChange}
              inputProps={{
                id: InstructorFilterComponent.Ids.Age,
                name: InstructorFilterComponent.FieldNames.Age
              }}
            >
              <option value="" disabled={true}>
                {InstructorFilterComponent.Placeholders.Age}
              </option>
              {selectOptions(ageOptions)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default RequestFilter;
