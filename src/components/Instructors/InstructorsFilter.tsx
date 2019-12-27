import * as React from 'react';

import {
  Checkbox,
  FormControl,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Slider
} from '@material-ui/core';

import { optionsText, placeholder } from 'components/common/constants/DistanceSelect';
import { qualificationTypes } from 'components/Qualifications/constants';

import {
  SelectOption,
  sortByOptions,
  InstructorFilterComponent,
  availabilityLabels,
  availabilityOptions,
  qualificationOptions,
  ageOptions,
  genderOptions,
  placeForLessonsLabels,
  placeForLessonsOptions
} from 'components/Instructors/constants';

interface Props {
  sortBy: string;
  distance: number;
  placeForLessons: string[];
  availability: string[];
  priceRange: number[];
  age: string;
  gender: string;
  qualifications: string[];
  handleChange: (event: React.FormEvent<{}>) => void;
  handlePriceChange: (event: any, newValue: number | number[]) => void;
  handlePriceCommitted: (event: any, newValue: number | number[]) => void;
}

const InstructorFilter: React.StatelessComponent<Props> = props => {
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
              {InstructorFilterComponent.FieldLabels.Availability}
            </InputLabel>
            <Select
              id="demo-mutiple-checkbox"
              multiple={true}
              value={props.availability}
              onChange={props.handleChange}
              input={<Input />}
              displayEmpty={true}
              name={InstructorFilterComponent.FieldNames.Availability}
              renderValue={(selected: string[]) => {
                if (selected.length === 0) {
                  return InstructorFilterComponent.Placeholders.Availability;
                }
                return getLabels(selected, availabilityLabels);
              }}
            >
              {selectMenuItems(availabilityOptions, props.availability)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} xs={3}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>
              {InstructorFilterComponent.FieldLabels.Price}
            </InputLabel>
            <Select
              value={props.priceRange}
              multiple={true}
              input={<Input />}
              displayEmpty={true}
              renderValue={(selected: string[]) => {
                if (selected.length === 0) {
                  return InstructorFilterComponent.Placeholders.Price;
                }
                return `$${selected.join('-')}`;
              }}
            >
              <MenuItem className="price-filter">
                <Slider
                  value={props.priceRange}
                  onChange={props.handlePriceChange}
                  onChangeCommitted={props.handlePriceCommitted}
                  name={InstructorFilterComponent.FieldNames.Price}
                  valueLabelDisplay="auto"
                  marks={InstructorFilterComponent.sliderMarks}
                  step={10}
                  min={InstructorFilterComponent.rangeMinValue}
                  max={InstructorFilterComponent.rangeMaxValue}
                  defaultValue={InstructorFilterComponent.rangeDefaulValue}
                />
              </MenuItem>
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
        <Grid item={true} xs={3}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>
              {InstructorFilterComponent.FieldLabels.Gender}
            </InputLabel>
            <Select
              native={true}
              value={props.gender}
              onChange={props.handleChange}
              inputProps={{
                id: InstructorFilterComponent.Ids.Gender,
                name: InstructorFilterComponent.FieldNames.Gender
              }}
            >
              <option value="" disabled={true}>
                {InstructorFilterComponent.Placeholders.Gender}
              </option>
              {selectOptions(genderOptions)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} xs={3}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>
              {InstructorFilterComponent.FieldLabels.Qualifications}
            </InputLabel>
            <Select
              multiple={true}
              value={props.qualifications}
              onChange={props.handleChange}
              input={<Input />}
              name={InstructorFilterComponent.FieldNames.Qualifications}
              displayEmpty={true}
              renderValue={(selected: string[]) => {
                if (selected.length === 0) {
                  return InstructorFilterComponent.Placeholders.Qualifications;
                }
                return getLabels(selected, qualificationTypes);
              }}
            >
              {selectMenuItems(qualificationOptions, props.qualifications)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default InstructorFilter;
