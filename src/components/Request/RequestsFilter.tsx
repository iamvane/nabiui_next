import * as React from 'react';

import {
  FormControl,
  Grid,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import { instruments } from '../../../assets/data/instruments';
import SectionTitle from '../common/SectionTitle';
import PlaceForLessonForm from '../PlaceForLessons/PlaceForLessonsForm';
import { PlaceForLessonsType } from '../PlaceForLessons/model';
import DistanceSelect from '../common/DistanceSelect';
import {
  RequestFilterComponent,
  skillLevelOptions,
  lessonDurationOptions
} from './constants';

interface Props extends
  PlaceForLessonsType {
  instrument: string;
  zipCode: string;
  skillLevel: string;
  lessonDuration: string;
  handleChange: (event: React.FormEvent<{}>) => void;
}

const RequestFilter: React.StatelessComponent<Props> = props => {
  const selectSkillLevelOptions: JSX.Element[] = [];
  const selectLessonDurationOptions: JSX.Element[] = [];

  for (const [key, value] of Object.entries(skillLevelOptions)) {
    selectSkillLevelOptions.push(<option key={key} value={value.value}>{value.label}</option>);
  }

  for (const [key, value] of Object.entries(lessonDurationOptions)) {
    selectLessonDurationOptions.push(<option key={key} value={value.value}>{value.label}</option>);
  }

  const instrumentSelectItems = instruments.map(instrument => {
    return (
      <option key={instrument.value} value={instrument.value}>{instrument.name}</option>
    );
  });

  return (
    <Grid container={true} spacing={8}>
      <Grid item={true} xs={12}>
        <SectionTitle text={RequestFilterComponent.title} />
      </Grid>
      <Grid className="nabi-align-vertical-items" item={true} xs={12} lg={4}>
        <Typography>{RequestFilterComponent.Text.Instruments}</Typography>
      </Grid>
      <Grid item={true} xs={12} lg={8}>
        <FormControl fullWidth={true}>
          <Select
            native={true}
            value={props.instrument}
            onChange={props.handleChange}
            inputProps={{
              id: RequestFilterComponent.Ids.Instrument,
              name: RequestFilterComponent.FieldNames.Instrument
            }}
          >
            <option disabled={true}>
              {RequestFilterComponent.DisabledPlaceholders.SelectInstrument}
            </option>
            {instrumentSelectItems}
          </Select>
        </FormControl>
      </Grid>
      <DistanceSelect
        label={RequestFilterComponent.Text.Within}
        handleChange={props.handleChange}
        distance={props.distance}
      />
      <Grid className="nabi-align-vertical-items" item={true} xs={12} lg={4}>
        <Typography>{RequestFilterComponent.Text.ZipCode}</Typography>
      </Grid>
      <Grid item={true} xs={12} lg={8}>
        <TextField
          placeholder={RequestFilterComponent.Text.ZipCode}
          value={props.zipCode}
          onChange={props.handleChange}
          name={RequestFilterComponent.FieldNames.ZipCode}
          id={RequestFilterComponent.Ids.ZipCode}
        />
      </Grid>
      <Grid className="nabi-align-vertical-items" item={true} xs={12} lg={4}>
        <Typography>{RequestFilterComponent.Text.LessonDuration}</Typography>
      </Grid>
      <Grid item={true} xs={12} lg={8}>
        <FormControl fullWidth={true}>
          <Select
            native={true}
            value={props.lessonDuration}
            onChange={props.handleChange}
            inputProps={{
              id: RequestFilterComponent.Ids.LessonDuration,
              name: RequestFilterComponent.FieldNames.LessonDuration
            }}
          >
            <option value="" disabled={true}>
              {RequestFilterComponent.DisabledPlaceholders.SelectlessonDuration}
            </option>
            {selectLessonDurationOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid className="nabi-align-vertical-items" item={true} xs={12} lg={4}>
        <Typography>{RequestFilterComponent.Text.SkillLevel}</Typography>
      </Grid>
      <Grid item={true} xs={12} lg={8}>
        <FormControl fullWidth={true}>
          <Select
            native={true}
            value={props.skillLevel}
            onChange={props.handleChange}
            inputProps={{
              id: RequestFilterComponent.Ids.SkillLevel,
              name: RequestFilterComponent.FieldNames.SkillLevel
            }}
          >
            <option value="" disabled={true}>
              {RequestFilterComponent.DisabledPlaceholders.SelectLevel}
            </option>
            {selectSkillLevelOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid item={true} xs={12} className="nabi-margin-top-small">
        <PlaceForLessonForm
          handleChange={props.handleChange}
          home={props.home}
          studio={props.studio}
          online={props.online}
          isFilter={true}
        />
      </Grid>
    </Grid>
  );
};

export default RequestFilter;
