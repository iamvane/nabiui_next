import * as React from 'react';

import {
  Button,
  Drawer,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  Select,
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import PlaceForLessonsForm from '../PlaceForLessons/PlaceForLessonsForm';
import Qualifications from '../Qualifications/Qualifications';
import { optionsText, placeholder } from '../common/constants/DistanceSelect';

import {
  SelectOption,
  sortByOptions,
  InstructorFilterComponent,
  ageOptions,
  placeForLessonsLabels,
  placeForLessonsOptions,
  PlaceForLessonsFilterType
} from '../Instructors/constants';


interface Props {
  sortBy: string;
  distance: number;
  placeForLessons: PlaceForLessonsFilterType;
  age: string;
  handleChange: (event: React.FormEvent<{}>) => void;
  handleMobileSortBy: (event: React.FormEvent<{}>) => void;
  setQueryParams: () => void;
}

const RequestsFilterMobile: React.StatelessComponent<Props> = props => {
  const [isFilterOpen, toggleFilter] = React.useState(false);

  const openFilter = () => {
    toggleFilter(prevOpen => !prevOpen);
  };

  const closeFilter = () => {
    props.setQueryParams();
    toggleFilter(prevOpen => !prevOpen);
  };

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

  return (
    <div className="hide-on-desktop">
      <FormControl fullWidth={true}>
        <Select
          native={true}
          value={props.sortBy}
          onChange={props.handleMobileSortBy}
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
      <Button
        className="filter-button"
        variant="contained"
        onClick={openFilter}
        fullWidth={true}
      >
        Filter
        <Icon>filter_list</Icon>
      </Button>
      <Drawer
        open={isFilterOpen}
        onClose={closeFilter}
        className="filter-drawer"
      >
        <Grid item={true} xs={10} className="nabi-margin-center nabi-padding-top-small nabi-padding-bottom-small">
          <SectionTitle text="Filters" />
          <FormControl fullWidth={true} className="nabi-margin-bottom-small">
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
          <PlaceForLessonsForm
            handleChange={props.handleChange}
            home={!!props.placeForLessons.home}
            studio={!!props.placeForLessons.studio}
            online={!!props.placeForLessons.online}
            isFilter={true}
          />
          <FormControl fullWidth={true} className="nabi-margin-bottom-small">
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
          <div className="nabi-text-center nabi-margin-top-small">
            <Button variant="contained" color="primary" onClick={closeFilter}>View Instructors</Button>
          </div>
        </Grid>
      </Drawer>
    </div>
  );
};

export default RequestsFilterMobile;
