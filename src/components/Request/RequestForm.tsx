import * as React from 'react';

import moment from 'moment';

import {
  FormControl,
  Grid,
  Input,
  ListItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import DistanceSelect from '../common/DistanceSelect';
import { Role } from '../Auth/Registration/constants';
import { instruments } from '../../../assets/data/instruments';
import { skillLevelOptions } from '../Instruments/constants';
import { placeForLessonsOptions } from '../PlaceForLessons/constants';
import { lessonDurationOptions } from '../Rates/constants';
import { RequestFormComponent } from './constants';
import LessonTime from '../ScheduleLessons/LessonTime';
import LessonDate from '../ScheduleLessons/LessonDate';
import Timezone from '../ScheduleLessons/TimeZone';
import { ScheduleLessonsComponent } from '../ScheduleLessons/constants';
import Students from './Students';
import {
  RequestType,
  StudentType
} from './models';

interface Timezones {
  name: string;
  offset: string;
  [x: string]: string;
}
interface Props extends
  RequestType,
  StudentType {
  handleChange: (event: React.FormEvent<{}>) => void;
  role: string;
  addStudent: (event: React.FormEvent<{}>) => void;
  deleteStudent: (instrument: string) => void;
  isEditing: boolean;
  isCreatingRequest: boolean;
  isEditingRequest: boolean;
  steps?: number[];
  enableAddStudentBtn?: boolean;
  enableAddRequestBtn?: boolean;
  lessonDate?: string;
  lessonTime?: string;
  timezone?: string;
  handleDateChange?: (date: moment.Moment) => void;
  lessonDateError?: string;
  timezones?: Timezones[];
}

const RequestForm: React.StatelessComponent<Props> = props => {
  const { handleChange } = props;

  const skillLevelItems: any = [];
  for (const [key, value] of Object.entries(skillLevelOptions)) {
    skillLevelItems.push(<option key={key} value={value.value}>{value.label}</option>);
  }

  const placeForLessonItems: any = [];
  for (const [key, value] of Object.entries(placeForLessonsOptions)) {
    placeForLessonItems.push(<option key={key} value={value.name}>{value.label}</option>);
  }

  const lessonDurationItems: any = [];
  for (const [key, value] of Object.entries(lessonDurationOptions)) {
    lessonDurationItems.push(<option key={key} value={value.value}>{value.label}</option>);
  }

  const instrumentSelectItems = instruments.map(instrument => {
    return (
      <option key={instrument.value} value={instrument.value}>{instrument.name}</option>
    );
  });

  const renderStudentSection = (
    <div className="nabi-margin-bottom-medium">
      <Students
        students={props.students}
        name={props.name}
        age={props.age}
        skillLevel={props.skillLevel}
        handleChange={props.handleChange}
        addStudent={props.addStudent}
        deleteStudent={props.deleteStudent}
        enableAddStudentBtn={props.enableAddStudentBtn}
      />
    </div>
  );

  const renderTrialSchedule = (
    <>
      <SectionTitle text={ScheduleLessonsComponent.title} />
      <ListItem>
        <LessonDate
          lessonDate={props.lessonDate}
          handleDateChange={props.handleDateChange}
          errors={props.lessonDateError}
        />
      </ListItem>
      
      <ListItem>
        <LessonTime
          lessonTime={props.lessonTime}
          handleChange={props.handleChange}
        />
      </ListItem>

      <ListItem>
        <Timezone
          timezone={props.timezone}
          handleChange={props.handleChange}
          timezones={props.timezones}
        />
      </ListItem>
    </>
  )

  const renderRequestMessage = (
    <React.Fragment>
      <SectionTitle text={RequestFormComponent.Labels.RequestMessage} />
      <Typography>
        {RequestFormComponent.requestMessageDescription}
      </Typography>

      <TextField
        id={RequestFormComponent.Ids.RequestMessage}
        margin="normal"
        name={RequestFormComponent.FieldNames.RequestMessage}
        placeholder={RequestFormComponent.Placeholders.RequestMessage}
        required={true}
        multiline={true}
        fullWidth={true}
        rows={6}
        onChange={handleChange}
        value={props.requestMessage}
      />
    </React.Fragment>
  )

  return (
    <form
      className="nabi-general-form nabi-margin-top-medium"
      noValidate={true}
      autoComplete="off"
    >
      {props.steps.includes(1) && renderTrialSchedule}
      {props.steps.includes(2) && (
        <React.Fragment>
          <SectionTitle text={RequestFormComponent.title} />
          <Typography>
            {RequestFormComponent.Labels.RequestTitle}
          </Typography>

          <Grid item={true} md={7}>
            <TextField
              fullWidth={true}
              id={RequestFormComponent.Ids.RequestTitle}
              margin="normal"
              name={RequestFormComponent.FieldNames.RequestTitle}
              required={true}
              onChange={handleChange}
              value={props.requestTitle}
            />
          </Grid>

          <ListItem>
            <Typography className="list-text">
              {RequestFormComponent.Labels.Instrument}
            </Typography>

            <FormControl className="nabi-instruments-select">
              <Select
                native={true}
                input={<Input id={RequestFormComponent.Ids.Instrument} name={RequestFormComponent.FieldNames.Instrument} />}
                value={props.instrument}
                onChange={handleChange}
              >
                <option value="" disabled={true}>{RequestFormComponent.Placeholders.Instrument}</option>
                {instrumentSelectItems}
              </Select>
            </FormControl>
          </ListItem>

          {(props.role === Role.student || props.role !== Role.parent) && (
            <ListItem>
              <Typography className="list-text">
                {RequestFormComponent.Labels.SkillLevel}
              </Typography>

              <FormControl className="nabi-instruments-select">
                <Select
                  native={true}
                  input={
                    <Input
                      id={RequestFormComponent.Ids.SkillLevel}
                      name={RequestFormComponent.FieldNames.SkillLevel}
                    />}
                  value={props.skillLevel}
                  onChange={handleChange}
                >
                  <option value="" disabled={true}>{RequestFormComponent.Placeholders.SkillLevel}</option>
                  {skillLevelItems}
                </Select>
              </FormControl>
            </ListItem>
          )}

          <ListItem>
            <Typography className="list-text">
              {RequestFormComponent.Labels.PlaceForLessons}
            </Typography>

            <FormControl className="nabi-instruments-select">
              <Select
                native={true}
                input={
                  <Input
                    id={RequestFormComponent.Ids.PlaceForLessons}
                    name={RequestFormComponent.FieldNames.PlaceForLessons}
                  />}
                value={props.placeForLessons}
                onChange={handleChange}
              >
                <option value="" disabled={true}>{RequestFormComponent.Placeholders.PlaceForLesson}</option>
                {placeForLessonItems}
              </Select>
            </FormControl>
          </ListItem>

          {props.placeForLessons === placeForLessonsOptions.Studio.name &&
            <ListItem>
              <Grid item={true} xs={12} md={6}>
                <DistanceSelect
                  handleChange={handleChange}
                  distance={props.distance}
                />
              </Grid>
            </ListItem>
          }

          <ListItem>
            <Typography className="list-text">
              {RequestFormComponent.Labels.LessonDuration}
            </Typography>

            <FormControl className="nabi-instruments-select">
              <Select
                native={true}
                input={
                  <Input
                    id={RequestFormComponent.Ids.LessonDuration}
                    name={RequestFormComponent.FieldNames.LessonDuration}
                  />}
                value={props.lessonDuration}
                onChange={handleChange}
              >
                <option value="" disabled={true}>{RequestFormComponent.Placeholders.LessonDuration}</option>
                {lessonDurationItems}
              </Select>
            </FormControl>
          </ListItem>
        </React.Fragment>
      )}

      <div className="nabi-margin-top-medium">
        {props.steps.includes(3) && (props.role === Role.parent) && renderStudentSection}
        {props.steps.includes(3) && (props.role === Role.student) && renderRequestMessage}
        {props.steps.includes(4) && (props.role === Role.parent) && renderRequestMessage}
      </div>
    </form>
  );
};
export default RequestForm;
