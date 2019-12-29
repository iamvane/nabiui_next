import * as React from 'react';

import {
  Button,
  FormControl,
  Icon,
  Input,
  ListItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import { instruments } from '../../../../assets/data/instruments';
import { Role } from '../../Auth/Registration/constants';
import { skillLevelOptions } from '../../Instruments/constants';
import { placeForLessonsOptions } from '../../PlaceForLessons/constants';
import { lessonDurationOptions } from '../../Rates/constants';
import { StudentCardFormComponent } from '../constants';
import { StudentDetailsType } from './model';

interface Props extends StudentDetailsType {
  handleChange?: (event: React.FormEvent<{}>) => void;
  handleSubmit?: (event: React.FormEvent<{}>) => void;
  handleOnBlur?: (event: React.FormEvent<{}>) => void;
  handleCancel?: () => void;
  role: string;
  isEditing?: boolean;
  isRequesting?: boolean;
  apiError?: string;
  allFieldsFilled?: boolean;
}

const StudentCardForm: React.StatelessComponent<Props> = props => {
  const { FieldKey } = StudentCardFormComponent;
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

  const editSubmitButton: JSX.Element = (
    <Button
      color="primary"
      variant="contained"
      className="nabi-margin-top-small nabi-text-uppercase"
      onClick={props.handleSubmit}
      type="submit"
      disabled={!props.allFieldsFilled ? true : false}
    >
      <Icon className="nabi-margin-right-xsmall">save</Icon>
      <span className="nabi-margin-left-xsmall">{StudentCardFormComponent.ButtonText.EditSubmit}</span>
    </Button>
  );

  const addSubmitButton: JSX.Element = (
    <Button
      color="primary"
      variant="contained"
      className="nabi-margin-top-small nabi-text-uppercase"
      onClick={props.handleSubmit}
      type="submit"
      disabled={!props.allFieldsFilled ? true : false}
    >
      <Icon className="nabi-margin-right-xsmall">add</Icon>
      <span className="nabi-margin-left-xsmall">{StudentCardFormComponent.ButtonText.AddSubmit}</span>
    </Button>
  );

  return (
    <form className="nabi-general-form" noValidate={true} autoComplete="off">
      {props.role === Role.parent &&
        <React.Fragment>
          <ListItem>
            <Typography className="list-text">
              {StudentCardFormComponent.Labels.Name}
            </Typography>

            <TextField
              name={StudentCardFormComponent.FieldNames[FieldKey.StudentName]}
              placeholder={StudentCardFormComponent.Placeholders.StudentName}
              id={StudentCardFormComponent.Ids.StudentName}
              onChange={props.handleChange}
              onBlur={props.handleOnBlur}
              value={props.name}
            />
          </ListItem>
          <ListItem>
            <Typography className="list-text">
              {StudentCardFormComponent.Labels.Age}
            </Typography>

            <FormControl className="nabi-instruments-select">
              <TextField
                name={StudentCardFormComponent.FieldNames[FieldKey.StudentAge]}
                placeholder={StudentCardFormComponent.Placeholders.StudentAge}
                id={StudentCardFormComponent.Ids.StudentAge}
                onChange={props.handleChange}
                onBlur={props.handleOnBlur}
                value={props.age}
              />
            </FormControl>
          </ListItem>
        </React.Fragment>
      }
      <ListItem>
        <Typography className="list-text">
          {StudentCardFormComponent.Labels.Instrument}
        </Typography>

        <FormControl className="nabi-instruments-select">
          <Select
            native={true}
            input={
              <Input
                id={StudentCardFormComponent.Ids.Instrument}
                name={StudentCardFormComponent.FieldNames[FieldKey.Instrument]}
              />
            }
            value={
              props.instrument ?
                props.instrument :
                StudentCardFormComponent.Placeholders.Instrument
            }
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
          >
            <option value="">{StudentCardFormComponent.Placeholders.Instrument}</option>
            {instrumentSelectItems}
          </Select>
        </FormControl>
      </ListItem>

      <ListItem>
        <Typography className="list-text">
          {StudentCardFormComponent.Labels.SkillLevel}
        </Typography>

        <FormControl className="nabi-instruments-select">
          <Select
            native={true}
            input={
              <Input
                id={StudentCardFormComponent.Ids.SkillLevel}
                name={StudentCardFormComponent.FieldNames[FieldKey.SkillLevel]}
              />}
            value={
              props.skillLevel ?
              props.skillLevel :
              StudentCardFormComponent.Placeholders.SkillLevel
            }
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
          >
            <option value="">{StudentCardFormComponent.Placeholders.SkillLevel}</option>
            {skillLevelItems}
          </Select>
        </FormControl>
      </ListItem>

      <ListItem>
        <Typography className="list-text">
          {StudentCardFormComponent.Labels.LessonPlace}
        </Typography>

        <FormControl className="nabi-instruments-select">
          <Select
            native={true}
            input={
              <Input
                id={StudentCardFormComponent.Ids.LessonPlace}
                name={StudentCardFormComponent.FieldNames[FieldKey.LessonPlace]}
              />
            }
            value={
              props.lessonPlace ?
              props.lessonPlace :
              StudentCardFormComponent.Placeholders.LessonPlace
            }
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
          >
            <option value="">{StudentCardFormComponent.Placeholders.LessonPlace}</option>
            {placeForLessonItems}
          </Select>
        </FormControl>
      </ListItem>

      {/* {props.placeForLessons === placeForLessonsOptions.Studio.name &&
        <ListItem>
          <Grid item={true} xs={12} md={6}>
            <DistanceSelect
              // handleChange={handleChange}
              // distance={props.distance}
            />
          </Grid>
        </ListItem>
      } */}

      <ListItem>
        <Typography className="list-text">
          {StudentCardFormComponent.Labels.LessonDuration}
        </Typography>

        <FormControl className="nabi-instruments-select">
          <Select
            native={true}
            input={
              <Input
                id={StudentCardFormComponent.Ids.LessonDuration}
                name={StudentCardFormComponent.FieldNames[FieldKey.LessonDuration]}
              />
            }
            value={
              props.lessonDuration ?
              props.lessonDuration :
              StudentCardFormComponent.Placeholders.LessonDuration
            }
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
          >
            <option value="">{StudentCardFormComponent.Placeholders.LessonDuration}</option>
            {lessonDurationItems}
          </Select>
        </FormControl>
      </ListItem>

      <div className="nabi-text-center nabi-padding-top-xsmall nabi-padding-bottom-xsmall">
        <Typography className="nabi-margin-top-small nabi-margin-bottom-small" color="error">
          {props.apiError}
        </Typography>
      </div>
      {props.handleCancel &&
        <React.Fragment>
          {props.isEditing ? editSubmitButton : addSubmitButton}
          <Button
            color="default"
            variant="contained"
            className="nabi-margin-top-small nabi-text-uppercase nabi-margin-left-xsmall"
            onClick={props.handleCancel}
          >
            <Icon className="nabi-margin-right-xsmall">close</Icon>
            <span className="nabi-margin-left-xsmall">{StudentCardFormComponent.ButtonText.Cancel}</span>
          </Button>
        </React.Fragment>
      }
    </form>
  );
};
export default StudentCardForm;
