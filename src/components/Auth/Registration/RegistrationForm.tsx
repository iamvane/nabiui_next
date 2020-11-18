import * as React from 'react';
import Link from 'next/link';
import moment from 'moment';
const reactStringReplace = require('react-string-replace');

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from '@material-ui/core';

import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Grid
} from 'nabi_web_components';

import '../../../../assets/scss/PhoneValidationForm.scss';

import { selectOptions } from '../../../utils/formUtils';
import {
  Role,
  RegistrationFormComponent
} from './constants';
import { Routes } from '../../common/constants/Routes';
import { LocationField } from "../../Instructors/LocationField";

interface Props {
  handleChange: (event: React.FormEvent<{}>) => void;
  handleSubmit: (event: React.FormEvent<{}>) => void;
  handleBirthdayChange: (date: moment.Moment) => void;
  birthday?: string;
  selectedRole: string;
  formErrors: any;
  apiError: string;
  isRequesting: boolean;
  email: string;
  agreeWithTerms: boolean;
  firstName: string;
  lastName: string;
  otherText?: string;
  phoneNumber: string;
  handleNumberChange: (value: string) => void;
  getLatLng: (lat: string, lng: string) => void;
  handleLocationChange: (location: string) => void;
  location: string;
  getLocationError: (error: string) => void;
}

/**
 * Contains the registration form fields
 */
const RegistrationForm: React.StatelessComponent<Props> = props => {
  const { handleChange, isRequesting, formErrors } = props;

  const termsText = reactStringReplace(
    RegistrationFormComponent.agreeWithTerms,
    RegistrationFormComponent.termsOfServicePlaceholder,
    (i: number) => (
      <Link href={Routes.TermsOfUse} key={i}><a>{RegistrationFormComponent.termsText}</a></Link>
    )
  );

  return (
    <form
      className="nabi-general-form nabi-margin-top-medium"
      noValidate={true}
      onSubmit={props.handleSubmit}
      autoComplete="off"
      id="registration-form"
    >
      <Grid container={true} spacing={1}>
        <Grid item={true} xs={12} md={6}>
          <TextField
            fullWidth={true}
            id={RegistrationFormComponent.Ids.FirstName}
            name={RegistrationFormComponent.FieldNames.FirstName}
            onChange={handleChange}
            placeholder={RegistrationFormComponent.Placeholders.FirstName}
            required={true}
            value={props.firstName}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
          />
        </Grid>
        <Grid item={true} xs={12} md={6}>
          <TextField
            fullWidth={true}
            id={RegistrationFormComponent.Ids.LastName}
            name={RegistrationFormComponent.FieldNames.LastName}
            onChange={handleChange}
            placeholder={RegistrationFormComponent.Placeholders.LastName}
            required={true}
            value={props.lastName}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />
        </Grid>
      </Grid>
      <TextField
        fullWidth={true}
        margin="normal"
        id={RegistrationFormComponent.Ids.Email}
        name={RegistrationFormComponent.FieldNames.Email}
        onChange={handleChange}
        placeholder={RegistrationFormComponent.Placeholders.Email}
        required={true}
        value={props.email}
        error={!!formErrors.email}
        helperText={formErrors.email}
      />

      <TextField
        fullWidth={true}
        margin="normal"
        id={RegistrationFormComponent.Ids.Password}
        name={RegistrationFormComponent.FieldNames.Password}
        onChange={handleChange}
        placeholder={RegistrationFormComponent.Placeholders.Password}
        required={true}
        type={RegistrationFormComponent.FieldNames.Password}
        error={!!formErrors.password}
        helperText={formErrors.password}
      />

      <p>
        {RegistrationFormComponent.birthday}
      </p>

      <FormControl fullWidth={false} required={true}>
        <DatePicker
          selected={props.birthday ? moment(new Date(props.birthday)) : moment(Date.now())}
          onChange={props.handleBirthdayChange}
          peekNextMonth={true}
          showMonthDropdown={true}
          showYearDropdown={true}
          dropdownMode="select"
        />
      </FormControl>

      {props.selectedRole !== Role.instructor &&
        <>
          <Grid item={true} xs={12} md={8}>
            <FormControl fullWidth={false}>
              <PhoneInput
                id="country-code-select"
                className="international-phone-input nabi-margin-top-xsmall"
                name={RegistrationFormComponent.FieldNames.PhoneNumber}
                placeholder={RegistrationFormComponent.Placeholders.PhoneNumber}
                value={props.phoneNumber}
                onChange={props.handleNumberChange}
                required={true}
                defaultCountry="US"
              />
            </FormControl>
            {props.formErrors.phoneNumber && <FormHelperText error={true}>{props.formErrors.phoneNumber}</FormHelperText>}
          </Grid>
          <Grid item={true} xs={12} md={5}>
            <LocationField
              getLatLng={props.getLatLng}
              address={props.location}
              getLocation={props.handleLocationChange}
              getLocationError={props.getLocationError}
              error={props.formErrors.location}
            />
          </Grid>
        </>
      }

      <div className="nabi-margin-top-small nabi-margin-left-xsmall">
        <FormControlLabel
          className="nabi-margin-bottom-medium"
          control={
            <Checkbox
              onChange={handleChange}
              inputProps={{
                name: RegistrationFormComponent.FieldNames.AgreeWithTerms
              }}
            />
          }
          label={termsText}
        />
      </div>

      <div className="nabi-text-center">
        <div className="nabi-margin-top-small">
          {isRequesting && <CircularProgress />}
        </div>

        <p className="nabi-margin-top-small nabi-margin-bottom-small nabi-text-color-red">
          {props.apiError}
        </p>

        <Button
          color="primary"
          className="nabi-text-uppercase"
          variant="contained"
          type="submit"
        >
          {RegistrationFormComponent.SubmitText}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
