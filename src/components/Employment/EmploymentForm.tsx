import * as React from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import { months } from '../../../assets/data/months';
import { EmploymentFormComponent } from './constants';
import { EmploymentType } from './model';
import { YearsList } from '../../utils/YearsList';

interface Props extends EmploymentType {
  handleChange: (event: React.FormEvent<{}>) => void;
  handleOnBlur: (event: React.FormEvent<{}>) => void;
  handleSave: (event: React.FormEvent<{}>) => void;
  handleCancel: () => void;
  isEditing: boolean;
  allFieldsFilled: boolean;
}

const EmploymentForm: React.StatelessComponent<Props> = props => {
  let years = YearsList();

  const yearsItems = years.map((year) =>
    <option key={year.toString()} value={year}>{year}</option>
  );

  const monthSelectItems = months.map(month => {
    const monthName = month.charAt(0).toUpperCase() + month.slice(1);
    return (
      <option key={month} value={month}>{monthName}</option>
    );
  });

  const editSubmitButton: JSX.Element = (
    <Button
      color="primary"
      variant="contained"
      className="nabi-margin-top-small nabi-text-uppercase"
      onClick={props.handleSave}
      type="submit"
      disabled={!props.allFieldsFilled ? true : false}
    >
      <Icon className="nabi-margin-right-xsmall">save</Icon>
      <span className="nabi-margin-left-xsmall">{EmploymentFormComponent.Text.SaveChangesButton}</span>
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
      <Icon className="nabi-margin-right-xsmall">add</Icon>
      <span className="nabi-margin-left-xsmall">{EmploymentFormComponent.Text.AddButton}</span>
    </Button>
  );

  const renderToFields = (): JSX.Element => (
    <Grid container={true} spacing={8}>
      <Grid item={true} md={4} xs={12} sm={6}>
        <FormControl fullWidth={true}>
          <Select
            native={true}
            input={
            <Input
              id={EmploymentFormComponent.Ids.ToMonth}
              name={EmploymentFormComponent.FieldNames.ToMonth}
            />
            }
            value={props.toMonth}
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
          >
            <option value="" disabled={true}>
              {EmploymentFormComponent.DisabledPlaceholders.SelectMonth}
            </option>
            {monthSelectItems}
          </Select>
        </FormControl>
      </Grid>
      <Grid item={true} md={3} xs={12} sm={4}>
        <FormControl fullWidth={true}>
          <Select
            native={true}
            input={
            <Input
              id={EmploymentFormComponent.Ids.ToYear}
              name={EmploymentFormComponent.FieldNames.ToYear}
            />
            }
            value={props.toYear}
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
          >
            <option value="" disabled={true}>
              {EmploymentFormComponent.DisabledPlaceholders.SelectYear}
            </option>
            {yearsItems}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  const renderPresent = (): JSX.Element => (
    <Typography className="nabi-margin-top-xsmall" variant="body2">
      {EmploymentFormComponent.Text.Present}
    </Typography>
  );

  return (
    <form>
      <Grid container={true}>
        <Grid item={true} md={8} xs={12} sm={10}>
          <TextField
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
            fullWidth={true}
            id={EmploymentFormComponent.Ids.Employer}
            margin="normal"
            name={EmploymentFormComponent.FieldNames.Employer}
            placeholder={EmploymentFormComponent.Placeholders.Employer}
            required={true}
            value={props.employer}
          />
          <TextField
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
            className=""
            fullWidth={true}
            id={EmploymentFormComponent.Ids.JobTitle}
            margin="normal"
            name={EmploymentFormComponent.FieldNames.JobTitle}
            placeholder={EmploymentFormComponent.Placeholders.JobTitle}
            required={true}
            value={props.jobTitle}
          />
          <TextField
            onChange={props.handleChange}
            onBlur={props.handleOnBlur}
            className=""
            fullWidth={true}
            id={EmploymentFormComponent.Ids.JobLocation}
            margin="normal"
            name={EmploymentFormComponent.FieldNames.JobLocation}
            placeholder={EmploymentFormComponent.Placeholders.JobLocation}
            required={true}
            value={props.jobLocation}
          />
          <Typography className="nabi-margin-top-xsmall">
            {EmploymentFormComponent.Text.From}
          </Typography>
        </Grid>
      </Grid>
      <Grid container={true} spacing={8}>
        <Grid item={true} md={4} xs={12} sm={6}>
          <FormControl fullWidth={true}>
            <Select
              native={true}
              input={
                <Input
                  id={EmploymentFormComponent.Ids.FromMonth}
                  name={EmploymentFormComponent.FieldNames.FromMonth}
                />
              }
              value={props.fromMonth}
              onChange={props.handleChange}
              onBlur={props.handleOnBlur}
            >
              <option value="" disabled={true}>
                {EmploymentFormComponent.DisabledPlaceholders.SelectMonth}
              </option>
              {monthSelectItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} md={3} xs={12} sm={4}>
          <FormControl fullWidth={true}>
            <Select
              native={true}
              input={
                <Input
                  id={EmploymentFormComponent.Ids.FromYear}
                  name={EmploymentFormComponent.FieldNames.FromYear}
                />
              }
              value={props.fromYear}
              onChange={props.handleChange}
              onBlur={props.handleOnBlur}
            >
              <option value="" disabled={true}>
                {EmploymentFormComponent.DisabledPlaceholders.SelectYear}
              </option>
              {yearsItems}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Typography className="nabi-margin-top-xsmall">
        {EmploymentFormComponent.Text.To}
      </Typography>
      {!props.stillWorkHere ? renderToFields() : renderPresent()}
      <div className="nabi-margin-bottom-small">
        <FormControlLabel
          className="nabi-margin-left-zero nabi-margin-top-xsmall nabi-instruments-select"
          control={
            <Checkbox
              onChange={props.handleChange}
              checked={props.stillWorkHere}
              name={EmploymentFormComponent.FieldNames.StillWorkHere}
            />
          }
          label={EmploymentFormComponent.Labels.ICurrentlyWorkHere}
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
        <span className="nabi-margin-left-xsmall">{EmploymentFormComponent.Text.CancelButton}</span>
      </Button>
    </form>
  );
};

export default EmploymentForm;
