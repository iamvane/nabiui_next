import * as React from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import {
  FormLabel,
} from '@material-ui/core';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from 'nabi_web_components';

import { LocationField } from "../Instructors/LocationField";
import SectionTitle from '../common/SectionTitle';
import { UserType } from '../../redux/models/UserModel';
import AvatarUploader from '../AvatarUploader/AvatarUploader';
import PhoneValidation from './PhoneValidation';
import { AccountInfoComponent } from './constants';
import {
  AccountInfoType,
  Gender,
} from './models';

interface Props {
  user: UserType;
  accountInfo: AccountInfoType;
  errors: AccountInfoComponent.Errors;
  redirectUrl: string;
  handleChange: (event: React.FormEvent<{}>) => void;
  getLatLng: (lat: string, lng: string) => void;
  handleLocationChange: (location: string) => void;
  location: string;
  showSections: string[];
  getLocationError: (error: string) => void;
}

const AccountInfoForm: React.StatelessComponent <Props> = props => {
    const {
      FieldNames,
      FieldKey
    } = AccountInfoComponent;

    const {
      gender,
    } = props.accountInfo;

    return(
      <div>
          <div className="nabi-margin-bottom-large">
            <div className="nabi-margin-bottom-small">
              <SectionTitle text={AccountInfoComponent.SectionTitles.Avatar} />
            </div>
            <AvatarUploader />
          </div>

        <div className={(props.showSections.includes('gender') || props.showSections.includes('showAll')) ? 'nabi-display-block' : 'nabi-display-none'}>
          <SectionTitle text={AccountInfoComponent.SectionTitles.Gender} />
          <div className="nabi-padding-left-small">
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
                  control={
                  <Radio
                    inputProps={{
                      name: Gender.female
                    }}
                  />}
                  label={AccountInfoComponent.Labels.Female}
                  value={Gender.female}
                />

                <FormControlLabel
                  control={
                    <Radio
                      inputProps={{
                        name: Gender.male
                      }}
                    />}
                  label={AccountInfoComponent.Labels.Male}
                  value={Gender.male}
                />
              </RadioGroup>

              <FormHelperText>{props.errors.gender}</FormHelperText>
            </FormControl>
          </div>
      </div>

      <div className={`nabi-margin-top-large ${(props.showSections.includes('phone') || props.showSections.includes('showAll')) ? 'nabi-display-block' : 'nabi-display-none'}`}>
        <PhoneValidation error={props.errors.phoneNumber} />
      </div>

      <div className={`nabi-margin-top-large ${(props.showSections.includes('location') || props.showSections.includes('showAll')) ? 'nabi-display-block' : 'nabi-display-none'}`}>
        <SectionTitle text={AccountInfoComponent.SectionTitles.Location} />
        <LocationField
          getLatLng={props.getLatLng}
          address={props.location}
          getLocation={props.handleLocationChange}
          getLocationError={props.getLocationError}
        />
      </div>
    </div>
  );
};

export default AccountInfoForm;
