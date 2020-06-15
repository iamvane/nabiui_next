import * as React from 'react';
import Link from 'next/link';
import moment from 'moment';
const reactStringReplace = require('react-string-replace');

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import '../../../../assets/scss/PhoneValidationForm.scss';

import { selectOptions } from '../../../utils/formUtils';
import SectionTitle from '../../common/SectionTitle';
import {
  Role,
  RegistrationFormComponent
} from './constants';
import { Routes } from '../../common/constants/Routes';

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
  reference: string;
  otherText?: string;
  phoneNumber: string;
  handleNumberChange: (value: string) => void;
}

/**
 * Contains the registration form fields
 */
const RegistrationForm: React.StatelessComponent<Props> = props => {
  const { handleChange, selectedRole, isRequesting, formErrors } = props;
  const registerAsText: string = (
    (selectedRole === Role.student) ? RegistrationFormComponent.RegisterText.Student :
    (selectedRole === Role.parent) ? RegistrationFormComponent.RegisterText.Parent :
    RegistrationFormComponent.RegisterText.Instructor
  );

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
      <div className="nabi-margin-top-small">
       <SectionTitle text={registerAsText} />
      </div>
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

      <Typography variant="body2">
        {RegistrationFormComponent.birthday}
      </Typography>

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
      </>
      }
      <FormControl
        fullWidth={true}
        className="nabi-margin-top-small"
        error={!!formErrors.reference}
      >
        <Select
          native={true}
          value={props.reference}
          onChange={props.handleChange}
          input={<Input name={RegistrationFormComponent.FieldNames.Reference} />}
        >
          <option value="" disabled={true}>
            {RegistrationFormComponent.Placeholders.Reference}
          </option>
          {selectOptions(RegistrationFormComponent.referenceOptions)}
        </Select>
        <FormHelperText>{formErrors.reference}</FormHelperText>
      </FormControl>
      {props.reference === 'other' &&
        <TextField
            fullWidth={true}
            id={RegistrationFormComponent.Ids.OtherText}
            name={RegistrationFormComponent.FieldNames.OtherText}
            onChange={handleChange}
            placeholder={RegistrationFormComponent.Placeholders.Reference}
            required={true}
            value={props.otherText}
            error={!!formErrors.otherText}
            helperText={formErrors.otherText}
          />
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

        <Typography className="nabi-margin-top-small nabi-margin-bottom-small" color="error">
          {props.apiError}
        </Typography>

        <Button
          disabled={!props.agreeWithTerms}
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
