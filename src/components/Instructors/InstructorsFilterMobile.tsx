import * as React from 'react';

import {
  Button,
  Drawer,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  Select,
  Slider
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import PlaceForLessonsForm from '../PlaceForLessons/PlaceForLessonsForm';
import Qualifications from '../Qualifications/Qualifications';
import { optionsText, placeholder } from '../common/constants/DistanceSelect';
import {
  SelectOption,
  sortByOptions,
  InstructorFilterComponent,
  availabilityOptions,
  ageOptions,
  genderOptions,
  QualificationsFilterType,
  PlaceForLessonsFilterType
} from './constants';

interface Props {
  sortBy: string;
  distance: number;
  placeForLessons: PlaceForLessonsFilterType;
  availability: string;
  priceRange: number[];
  age: string;
  gender: string;
  qualifications: QualificationsFilterType;
  handleChange: (event: React.FormEvent<{}>) => void;
  handlePriceChange: (event: any, newValue: number | number[]) => void;
  handleMobileSortBy: (event: React.FormEvent<{}>) => void;
  setQueryParams: () => void;
}

const InstructorFilterMobile: React.StatelessComponent<Props> = props => {
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
              {InstructorFilterComponent.FieldLabels.Availability}
            </InputLabel>
            <Select
              native={true}
              value={props.availability}
              onChange={props.handleChange}
              inputProps={{
                id: InstructorFilterComponent.Ids.Availability,
                name: InstructorFilterComponent.FieldNames.Availability
              }}
            >
              <option value="" disabled={true}>
                {InstructorFilterComponent.Placeholders.Availability}
              </option>
              <option value="">
                Any
              </option>
              {selectOptions(availabilityOptions)}
            </Select>
          </FormControl>
          <FormControl fullWidth={true} className="nabi-margin-bottom-small">
            <InputLabel shrink={true}>
              {InstructorFilterComponent.FieldLabels.Price}
            </InputLabel>
              <Slider
                value={props.priceRange}
                onChange={props.handlePriceChange}
                name={InstructorFilterComponent.FieldNames.Price}
                valueLabelDisplay="auto"
                marks={InstructorFilterComponent.sliderMarks}
                step={10}
                min={InstructorFilterComponent.rangeMinValue}
                max={InstructorFilterComponent.rangeMaxValue}
                defaultValue={InstructorFilterComponent.rangeDefaulValue}
              />
          </FormControl>
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
          <FormControl fullWidth={true} className="nabi-margin-bottom-small">
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
          <Qualifications
            handleChange={props.handleChange}
            certifiedTeacher={!!props.qualifications.certifiedTeacher}
            musicTherapy={!!props.qualifications.musicTherapy}
            musicProduction={!!props.qualifications.musicProduction}
            earTraining={!!props.qualifications.earTraining}
            conducting={!!props.qualifications.conducting}
            virtuosoRecognition={!!props.qualifications.virtuosoRecognition}
            performance={!!props.qualifications.performance}
            musicTheory={!!props.qualifications.musicTheory}
            youngChildrenExperience={!!props.qualifications.youngChildrenExperience}
            repertoireSelection={!!props.qualifications.repertoireSelection}
            isFilter={true}
          />
          <div className="nabi-text-center nabi-margin-top-small">
            <Button variant="contained" color="primary" onClick={closeFilter}>View Instructors</Button>
          </div>
        </Grid>
      </Drawer>
    </div>
  );
};

export default InstructorFilterMobile;
