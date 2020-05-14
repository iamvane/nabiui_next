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

import { LocationField } from "../Instructors/LocationField";
import SectionTitle from '../common/SectionTitle';
import { UserType } from '../../redux/models/UserModel';
import AvatarUploader from '../AvatarUploader/AvatarUploader';
import PhoneValidation from './PhoneValidation';
import Location from './Location';
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
  changeAvatar: (id: string, avatar: string) => void;
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
            <AvatarUploader
              originalImage={props.user.avatar ? props.user.avatar : undefined}
              imageChanged={(avatar: string) => {
                props.changeAvatar(props.user.id || '', avatar);
              }}
            />
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
