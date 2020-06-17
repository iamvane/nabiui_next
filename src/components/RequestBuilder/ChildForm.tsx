import * as React from 'react';
import Router from "next/router";
import Link from 'next/link';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Action,
  Dispatch
} from 'redux';
import * as _ from "lodash";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Button,
  Chip,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Icon,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import '../../../assets/scss/ChildForm.scss';

import {
  fetchUser,
  requestToken
} from '../../redux/actions/UserActions';
import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import PhoneValidation from '../AccountInfo/PhoneValidation';
import PageTitle from '../common/PageTitle';
import { VerificationChannel } from '../AccountInfo/models';
import { Routes } from '../common/constants/Routes';
import { LessonDetailsComponent, ChildFormComponent } from './constants';
import { RequestFormComponent } from '../Request/constants';

interface DispatchProps {
  fetchUser: () => void;
  requestToken: (phoneNumber: string, channel: VerificationChannel) => void;
}

interface OwnProps {
  closeForm: () => void;
}

interface StateProps {
  user: UserType;
  isRequestingFetch: boolean;
  isRequestingUpdate: boolean;
  errorUpdate: string;
  updateAvatarMessage: string;
}

interface Props extends
  DispatchProps,
  StateProps {}


export const ChildForm = (props: Props) => {
  const [name, setName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [instrument, setInstrument] = React.useState('');
  const [level, setLevel] = React.useState('');

  React.useEffect(() => {
    //get user
    const fetchData = async () => {
      await props.fetchUser();
    };
    fetchData();
  },[]);

  React.useEffect(() => {
    if (props.user.phoneNumber && !props.user.isPhoneVerified) {
      const requestToken = async () => {
        await props.requestToken(props.user.phoneNumber, VerificationChannel.Text);
      };
      requestToken();
    }
  },[props.user.phoneNumber, props.user.isPhoneVerified]);

  const handleChange = (event) : void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    setName(value);
  }

  const handleBirthdayChange = (date: moment.Moment): void => {
    setDob(String(date));
  };

  return (
    <form>
    <Grid spacing={1} container={true}>
      <Grid item={true} md={6} xs={12}>
        <Grid spacing={1} container={true}>
          <Grid item={true} xs={12}>
            <TextField
              id={ChildFormComponent.Ids.Name}
              name={ChildFormComponent.FieldNames.Name}
              placeholder={ChildFormComponent.Placeholders.Name}
              required={true}
              fullWidth={true}
              onChange={handleChange}
              value={name}
            />
          </Grid>

          <Grid item={true} xs={12}>
            <Typography color="primary" className="nabi-margin-top-small">
              {ChildFormComponent.Labels.Dob}
            </Typography>

            <FormControl fullWidth={false} required={true}>
              <DatePicker
                selected={dob ? moment(new Date(dob)) : moment(Date.now())}
                onChange={handleBirthdayChange}
                peekNextMonth={true}
                showMonthDropdown={true}
                showYearDropdown={true}
                dropdownMode="select"
              />
            </FormControl>
          </Grid>
          <Typography color="primary" className="nabi-margin-top-small">Instrument</Typography>
          <Grid item={true} xs={12}>
            <Grid container={true} spacing={1}>
              {ChildFormComponent.instrumentChips.map((item) => {
                return <Grid item={true} xs={6} md={4} key={item.value}>
                  <Chip
                    className="nabi-full-width"
                    onClick={() => setInstrument(item.value)}
                    color={item.value === instrument ? "primary" : 'default'}
                    // icon={icon}
                    label={item.label}
                    // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                    // className={classes.chip}
                  />
                </Grid>
              })}
            </Grid>
          </Grid>
          <Typography color="primary" className="nabi-margin-top-small">Level</Typography>
          <Grid container={true} spacing={1}>
              {ChildFormComponent.levelChips.map((item) => {
                return <Grid item={true} xs={4} key={item.value}>
                  <Chip
                    className="nabi-full-width level-chips"
                    onClick={() => setLevel(item.value)}
                    color={item.value === level ? "primary" : 'default'}
                    // icon={icon}
                    label={item.label}
                    // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                    // className={classes.chip}
                  />
                </Grid>
              })}
            </Grid>
        </Grid>
          <Button
            color="primary"
            className="nabi-text-uppercase nabi-margin-top-small nabi-margin-bottom-medium"
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    user,
    actions: {
      fetchUser: {
        isRequesting: isRequestingFetch,
      },
      updateUser: {
        isRequesting: isRequestingUpdate,
        error: errorUpdate
      },
      uploadAvatar: {
        message: updateAvatarMessage
      }
    },
  } = state.user;

  return {
    user,
    isRequestingFetch,
    isRequestingUpdate,
    errorUpdate,
    updateAvatarMessage
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
  requestToken: (phoneNumber: string, channel: VerificationChannel) =>
    dispatch(requestToken(phoneNumber, channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildForm);
