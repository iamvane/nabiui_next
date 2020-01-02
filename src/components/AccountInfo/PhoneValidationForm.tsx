import * as React from 'react';

import {
  CircularProgress,
  Grid,
  TextField,
  Button,
  Icon,
  Input,
  Select,
  Typography,
  FormControl
} from '@material-ui/core';

import NumberFormat from 'react-number-format';
import 'react-datepicker/dist/react-datepicker.css';

import SectionTitle from '../common/SectionTitle';
import PhoneNumberAdded from '../AccountInfo/PhoneNumberAdded';
import { UserType } from '../../redux/models/UserModel';
import {
    PhoneValidationFormComponent,
    AccountInfoComponent
  } from '../AccountInfo/constants';

const phoneNumberFormat = (props: any) => {
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
      format="+1 (###) ### ####"
      mask="_"
    />
  );
};

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
  user: UserType;
  phoneNumber: string;
  handleChange: (event: React.FormEvent<{}>) => void;
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
}

interface Props extends OwnProps {}

const PhoneValidationForm: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
  const renderEnterPhoneNumber = (): JSX.Element => (
    <div>
      <Grid container={true}>
        <Grid item={true} xs={12} md={!props.isEditing ? 4 : 6} className="nabi-margin-right-xsmall-md">
          <TextField
            fullWidth={true}
            margin="normal"
            className="nabi-margin-top-xsmall"
            name={PhoneValidationFormComponent.FieldNames.PhoneNumber}
            onChange={props.handleChange}
            value={props.phoneNumber || props.user.phone.phoneNumber}
            placeholder={PhoneValidationFormComponent.Placeholders.PhoneNumber}
            required={true}
            InputProps={{
              inputComponent: phoneNumberFormat
            }}
            error={!!props.errors.phoneNumber || !!props.phoneError}
            helperText={props.errors.phoneNumber || (props.phoneError && props.phoneError)}
          />
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
            variant="contained"
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
              <Icon className="nabi-margin-right-xsmall">close</Icon>
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
        <Grid item={true} xs={7} md={!props.isEditing ? 4 : 5} className="nabi-margin-right-xsmall-md">
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
            variant="contained"
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
    <PhoneNumberAdded phoneNumber={props.user.phone.phoneNumber} />
  );

  return (
    <Grid item={true}>
      <SectionTitle text={PhoneValidationFormComponent.sectionTitle} />
      {
        props.user.phoneNumber &&
        (props.isPhoneVerified || props.user.isPhoneVerified) ? renderVerificationSucessful() :
        (props.isPhoneSet ? renderEnterToken() :
          renderEnterPhoneNumber())
      }
      {props.isRequesting && <CircularProgress className="nabi-margin-top-small" />}
    </Grid>
  );
};

export default PhoneValidationForm;