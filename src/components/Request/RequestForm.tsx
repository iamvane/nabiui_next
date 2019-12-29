import * as React from 'react';

import {
  Button,
  FormControl,
  Grid,
  Icon,
  Input,
  ListItem,
  Select,
  TextField,
  Typography,
  CircularProgress
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import DistanceSelect from '../common/DistanceSelect';
import { Role } from '../Auth/Registration/constants';
import { instruments } from '../../../assets/data/instruments';
import { skillLevelOptions } from '../Instruments/constants';
import { placeForLessonsOptions } from '../PlaceForLessons/constants';
import { lessonDurationOptions } from '../Rates/constants';
import { RequestFormComponent } from './constants';
import Students from './Students';
import {
  RequestType,
  StudentType
} from './models';

interface Props extends
  RequestType,
  StudentType {
  handleChange: (event: React.FormEvent<{}>) => void;
  handleBlur: (event: React.FormEvent<{}>) => void;
  handleSubmit: (event: React.FormEvent<{}>) => void;
  handleEditSubmit: (event: React.FormEvent<{}>) => void;
  handleCancel: () => void;
  role: string;
  addStudent: (event: React.FormEvent<{}>) => void;
  deleteStudent: (instrument: string) => void;
  isEditing: boolean;
  isCreatingRequest: boolean;
  isEditingRequest: boolean;
  allFieldsFilled: boolean;
}

const RequestForm: React.StatelessComponent<Props> = props => {
  const { handleChange, handleSubmit, handleEditSubmit } = props;

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
        handleBlur={props.handleBlur}
        addStudent={props.addStudent}
        deleteStudent={props.deleteStudent}
      />
    </div>
  );

  const editSubmitButton: JSX.Element = (
    <Button
      color="primary"
      variant="contained"
      className="nabi-margin-top-small nabi-text-uppercase"
      onClick={handleEditSubmit}
      type="submit"
      disabled={!props.allFieldsFilled ? true : false}
    >
      {props.isEditingRequest ? <CircularProgress color="inherit" size={25} /> :
        <React.Fragment>
          <Icon className="nabi-margin-right-xsmall">save</Icon>
          <span className="nabi-margin-left-xsmall">{RequestFormComponent.ButtonText.EditSubmit}</span>
        </React.Fragment>}
    </Button>
  );

  const addSubmitButton: JSX.Element = (
    <Button
      color="primary"
      variant="contained"
      className="nabi-margin-top-small nabi-text-uppercase"
      onClick={handleSubmit}
      type="submit"
      disabled={!props.allFieldsFilled ? true : false}
    >
      {props.isCreatingRequest ? <CircularProgress color="inherit" size={25} /> :
        <React.Fragment>
          <Icon className="nabi-margin-right-xsmall">add</Icon>
          <span className="nabi-margin-left-xsmall">{RequestFormComponent.ButtonText.AddSubmit}</span>
        </React.Fragment>}
    </Button>
  );

  return (
    <form
      className="nabi-general-form nabi-margin-top-medium"
      noValidate={true}
      autoComplete="off"
    >
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
          onBlur={props.handleBlur}
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
            onBlur={props.handleBlur}
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
            onBlur={props.handleBlur}
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
            onBlur={props.handleBlur}
          >
            <option value="" disabled={true}>{RequestFormComponent.Placeholders.LessonDuration}</option>
            {lessonDurationItems}
          </Select>
        </FormControl>
      </ListItem>

      <div className="nabi-margin-top-medium">
        {props.role === Role.parent && renderStudentSection}

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
          onBlur={props.handleBlur}
          value={props.requestMessage}
        />
      </div>

      {props.isEditing ? editSubmitButton : addSubmitButton}
      <Button
        color="default"
        variant="contained"
        className="nabi-margin-top-small nabi-text-uppercase nabi-margin-left-xsmall"
        onClick={props.handleCancel}
      >
        <Icon className="nabi-margin-right-xsmall">close</Icon>
        <span className="nabi-margin-left-xsmall">{RequestFormComponent.ButtonText.Cancel}</span>
      </Button>
    </form>
  );
};
export default RequestForm;
