import * as React from 'react';

import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import dynamic from "next/dynamic";
const Close = dynamic(() => import('@material-ui/icons/Close'), {
  ssr: false,
});

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import NumberFormat from 'react-number-format';
import 'react-datepicker/dist/react-datepicker.css';

import SectionTitle from '../common/SectionTitle';
import PhoneNumberAdded from '../AccountInfo/PhoneNumberAdded';

import {
    PhoneValidationFormComponent,
    AccountInfoComponent
  } from '../AccountInfo/constants';


const tokenFormat = (props: any) => {
  const { inputRef, onChange, name,  ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          currentTarget: {
            value: values.value,
            name: name
          },
        });
      }}
      format="####"
      mask="_"
    />
  );
};

interface OwnProps {
  phoneNumber: string;
  handleChange: (event: React.FormEvent<{}>) => void;
  handleNumberChange: (value:string) => void;
  isPhoneSet: boolean;
  token: string;
  sendVerificationToken: () => void;
  verifyToken: () => void;
  verificationChannel: string;
  resendCode: () => void;
  toggleChangePhoneNumber?: () => void;
  errors: AccountInfoComponent.Errors;
  isEditing?: boolean;
  isRequesting: boolean;
  phoneError?: string;
  isPhoneVerified?: boolean;
  hideLabel?: boolean;
}

interface Props extends OwnProps {}

const PhoneValidationForm = (props: Props) => {
  const renderEnterPhoneNumber = (): JSX.Element => (
    <div>
      <Grid container={true}>
        <Grid item={true} xs={12} md={!props.isEditing ? 4 : 6} className="nabi-margin-right-xsmall-md">
          <PhoneInput
            id="country-code-select"
            className="international-phone-input nabi-margin-top-xsmall"
            name={PhoneValidationFormComponent.FieldNames.PhoneNumber}
            placeholder={PhoneValidationFormComponent.Placeholders.PhoneNumber}
            value={props.phoneNumber}
            onChange={props.handleNumberChange}
            required={true}
            defaultCountry="US"
          />
          {props.errors.phoneNumber && <FormHelperText error={true}>{props.errors.phoneNumber}</FormHelperText>}
        </Grid>
        <Grid item={true} xs={6} md={!props.isEditing ? 2 : 4}>
          <FormControl
            fullWidth={true}
            className="nabi-text-uppercase nabi-margin-top-xsmall"
          >
            <Select
              native={true}
              value={props.verificationChannel}
              onChange={props.handleChange}
              input={<Input name={PhoneValidationFormComponent.FieldNames.VefificationChannel} />}
            >
              <option value={PhoneValidationFormComponent.verificationMethod.Text.value}>
                {PhoneValidationFormComponent.verificationMethod.Text.label}
              </option>
              <option value={PhoneValidationFormComponent.verificationMethod.Call.value}>
                {PhoneValidationFormComponent.verificationMethod.Call.label}
              </option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container={true} className="nabi-margin-top-small">
        <Grid item={true}>
          <Button
            color="primary"
            variant="outlined"
            onClick={props.sendVerificationToken}
          >
            {PhoneValidationFormComponent.Buttons.Verify}
          </Button>
        </Grid>
        {props.isEditing &&
          <Grid item={true}>
            <Button
              color="default"
              variant="contained"
              onClick={props.toggleChangePhoneNumber}
            >
              <Close className="nabi-margin-right-xsmall" />
              {PhoneValidationFormComponent.Buttons.Cancel}
            </Button>
          </Grid>
        }
      </Grid>
    </div>
  );

  const resendCodeText = (): JSX.Element => (
    <span className="nabi-color-nabi nabi-cursor-pointer" onClick={props.resendCode}>
     {PhoneValidationFormComponent.resendCode}
    </span>
  );

  const renderEnterToken = (): JSX.Element => (
    <div>
      <Grid container={true} spacing={0}>
        <Grid item={true} xs={12} md={!props.isEditing ? 4 : 5} className="nabi-margin-right-xsmall-md">
          <TextField
            fullWidth={true}
            margin="normal"
            className="nabi-margin-top-xsmall"
            name={PhoneValidationFormComponent.FieldNames.PhoneToken}
            onChange={props.handleChange}
            value={props.token}
            placeholder={PhoneValidationFormComponent.Placeholders.PhoneToken}
            required={true}
            InputProps={{
              inputComponent: tokenFormat
            }}
            error={!!props.errors.token}
            helperText={props.errors.token}
          />
        </Grid>
        <Grid item={true} xs={12} md={!props.isEditing ? 4 : 6}>
          <Button
            color="primary"
            className="nabi-text-uppercase nabi-margin-top-xsmall"
            variant="outlined"
            onClick={props.verifyToken}
          >
            {PhoneValidationFormComponent.Buttons.Validate}
          </Button>
        </Grid>
      </Grid>
      <Grid item={true} xs={12} md={6} className="nabi-padding-top-xsmall">
        <Typography>{resendCodeText()}</Typography>
      </Grid>
    </div>
  );

  const renderVerificationSucessful = (): JSX.Element => (
    <PhoneNumberAdded phoneNumber={props.phoneNumber} />
  );

  return (
    <Grid item={true}>
      {props.hideLabel ? '' : <SectionTitle text={PhoneValidationFormComponent.sectionTitle} />}
      {
        (props.phoneNumber) &&
        (props.isPhoneVerified) ? renderVerificationSucessful() :
        (props.isPhoneSet ? renderEnterToken() :
          renderEnterPhoneNumber())
      }
      {props.isRequesting && <CircularProgress className="nabi-margin-top-small" />}
    </Grid>
  );
};

export default PhoneValidationForm;
