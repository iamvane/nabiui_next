import * as React from 'react';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Grid,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import { UserType } from '../../redux/models/UserModel';
import AvatarUploader from '../AvatarUploader/AvatarUploader';
import PhoneValidation from './PhoneValidation';
import Location from './Location';
import { AccountInfoComponent } from './constants';
import {
  AccountInfoType,
  Gender,
  VerificationChannel
} from './models';

interface Props {
  user: UserType;
  accountInfo: AccountInfoType;
  verificationChannel: VerificationChannel;
  errors: AccountInfoComponent.Errors;
  hasImageUploader?: boolean;
  redirectUrl: string;
  handleChange: (event: React.FormEvent<{}>) => void;
  handleLocationChange: (location: string) => void;
  handleLocationSelect: (location: string) => void;
  location: string;
  phoneError?: string;
}

const AccountInfoForm: React.StatelessComponent <Props> = props => {
    const {
      FieldNames,
      FieldKey
    } = AccountInfoComponent;

    const {
      firstName,
      lastName,
      gender,
    } = props.accountInfo;

    const { birthday } = props.user;

    return(
      <div>
        {props.hasImageUploader &&
          <div className="nabi-text-center nabi-margin-bottom-small">
            <AvatarUploader originalImage={props.user.avatar} imageChanged={(avatar: String) => null} />
          </div>
        }

        <SectionTitle text={AccountInfoComponent.SectionTitles.TellUs} />

        <Grid container={true} spacing={1}>
          <Grid item={true} md={6} xs={12}>
            <TextField
              fullWidth={true}
              name={FieldNames[FieldKey.FirstName]}
              onChange={props.handleChange}
              placeholder={AccountInfoComponent.Placeholders.FirstName}
              required={true}
              value={firstName}
              error={!!props.errors.firstName}
              helperText={props.errors.firstName}
            />
          </Grid>

          <Grid item={true} md={6} xs={12}>
            <TextField
              fullWidth={true}
              name={FieldNames[FieldKey.LastName]}
              placeholder={AccountInfoComponent.Placeholders.LastName}
              onChange={props.handleChange}
              required={true}
              value={lastName}
              error={!!props.errors.lastName}
              helperText={props.errors.lastName}
            />
          </Grid>

          <Grid item={true} xs={12} className="nabi-padding-left-small">
            <FormControl required={true} error={!!props.errors.gender}>
              <FormLabel className="nabi-margin-bottom-xsmall nabi-text-uppercase">
                {AccountInfoComponent.Labels.Gender}
              </FormLabel>

              <RadioGroup
                row={true}
                name={FieldNames[FieldKey.Gender]}
                onChange={props.handleChange}
                value={(gender && gender)}
              >
                <FormControlLabel
                  control={<Radio />}
                  label={AccountInfoComponent.Labels.Female}
                  value={Gender.female}
                />

                <FormControlLabel
                  control={<Radio />}
                  label={AccountInfoComponent.Labels.Male}
                  value={Gender.male}
                />
              </RadioGroup>

              <FormHelperText>{props.errors.gender}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item={true} md={6} xs={12}>
          <Typography variant="body2">
            {AccountInfoComponent.Labels.Birthday}
          </Typography>

          <FormControl>
            <DatePicker
              selected={birthday ? moment(birthday) : null}
              onChange={() => {/**/}}
              peekNextMonth={true}
              showMonthDropdown={true}
              showYearDropdown={true}
              dropdownMode="select"
              disabled={true}
            />
          </FormControl>
        </Grid>
      </Grid>

      <div className="nabi-margin-top-large">
        <PhoneValidation error={props.phoneError} />
      </div>
      <Location
        handleLocationChange={props.handleLocationChange}
        handleLocationSelect={props.handleLocationSelect}
        location={props.location || ''}
      />
    </div>
  );
};

export default AccountInfoForm;
