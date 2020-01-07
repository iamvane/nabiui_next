import * as React from 'react';

import {
  Button,
  FormControl,
  Grid,
  Input,
  Select,
  TextField
} from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';

import { YearsList } from '../../utils/YearsList';
import { EducationType } from './model';
import { EducationFormComponent, degreeOptions } from './constants';

interface Props extends EducationType {
  handleChange: (event: React.FormEvent<{}>) => void;
  handleOnBlur: (event: React.FormEvent<{}>) => void;
  handleSave: (event: React.FormEvent<{}>) => void;
  handleCancel: () => void;
  allFieldsFilled: boolean;
  isEditing: boolean;
}

const EducationForm: React.StatelessComponent<Props> = props => {
  const selectOptions: any = [];

  for (const [key, value] of Object.entries(degreeOptions)) {
    selectOptions.push(<option key={key} value={value.value}>{value.label}</option>);
  }

  let years = YearsList(EducationFormComponent.extraYears);

  const yearsItems = years.map((year) =>
    <option key={year.toString()} value={year}>{year}</option>
  );

  const editSubmitButton: JSX.Element = (
    <Button
      color="primary"
      variant="contained"
      className="nabi-margin-top-small nabi-text-uppercase"
      onClick={props.handleSave}
      type="submit"
      disabled={!props.allFieldsFilled ? true : false}
    >
      <Save className="nabi-margin-right-xsmall" />
      <span className="nabi-margin-left-xsmall">{EducationFormComponent.Text.SaveChangesButton}</span>
    </Button>
  );

  const addSubmitButton: JSX.Element = (
    <Button
      color="primary"
      variant="contained"
      className="nabi-margin-top-small nabi-text-uppercase"
      onClick={props.handleSave}
      type="submit"
      disabled={!props.allFieldsFilled ? true : false}
    >
      <Add className="nabi-margin-right-xsmall" />
      <span className="nabi-margin-left-xsmall">{EducationFormComponent.Text.AddButton}</span>
    </Button>
  );

  return (
    <Grid container={true}>
      <Grid item={true} md={8} xs={12} sm={10}>
        <form>
          <TextField
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
            fullWidth={true}
            id={EducationFormComponent.Ids.School}
            margin="normal"
            name={EducationFormComponent.FieldNames.School}
            placeholder={EducationFormComponent.Placeholders.School}
            required={true}
            value={props.school}
          />
          <FormControl
            fullWidth={true}
          >
            <Select
              native={true}
              input={
                <Input
                  id={EducationFormComponent.Ids.GraduationYear}
                  name={EducationFormComponent.FieldNames.GraduationYear}
                />
              }
              value={props.graduationYear}
              onChange={props.handleChange}
              onBlur={props.handleOnBlur}
              style={{
                border: '1px solid red'
              }}
            >
              <option value="" disabled={true}>
                {EducationFormComponent.DisabledPlaceholders.GraduationYear}
              </option>
              {yearsItems}
            </Select>
          </FormControl>
          <TextField
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
            fullWidth={true}
            id={EducationFormComponent.Ids.FieldOfStudy}
            margin="normal"
            name={EducationFormComponent.FieldNames.FieldOfStudy}
            placeholder={EducationFormComponent.Placeholders.FieldOfStudy}
            required={true}
            value={props.fieldOfStudy}
          />
          <FormControl
            fullWidth={true}
          >
            <Select
              native={true}
              input={
                <Input
                  id={EducationFormComponent.Ids.DegreeType}
                  name={EducationFormComponent.FieldNames.DegreeType}
                />
              }
              value={props.degreeType}
              onChange={props.handleChange}
              onBlur={props.handleOnBlur}
              variant="outlined"
            >
              <option value="" disabled={true}>{EducationFormComponent.DisabledPlaceholders.Degreetype}</option>
              {selectOptions}
            </Select>
          </FormControl>
          <TextField
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
            fullWidth={true}
            id={EducationFormComponent.Ids.SchoolLocation}
            margin="normal"
            name={EducationFormComponent.FieldNames.SchoolLocation}
            placeholder={EducationFormComponent.Placeholders.SchoolLocation}
            required={true}
            value={props.schoolLocation}
          />
          {props.isEditing ? editSubmitButton : addSubmitButton}
          <Button
            color="default"
            variant="contained"
            className="nabi-margin-top-small nabi-text-uppercase nabi-margin-left-xsmall"
            onClick={props.handleCancel}
          >
            <Close className="nabi-margin-right-xsmall" />
            <span className="nabi-margin-left-xsmall">{EducationFormComponent.Text.CancelButton}</span>
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default EducationForm;
