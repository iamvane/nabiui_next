import * as React from 'react';
import moment from 'moment';
import {
} from 'redux';
import * as _ from "lodash";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Router from "next/router";

import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import '../../../assets/scss/ChildForm.scss';
import { instruments } from '../../../assets/data/instruments';
import { checkErrors } from "../../utils/checkErrors";
import { Role } from '../../constants/Roles';
import { ChildFormComponent } from './constants';
import { StudentDetailsType } from '../Dashboard/ParentStudentDashboard/model';
import { Routes } from '../common/constants/Routes';

interface Props {
  addChild: (student: StudentDetailsType) => void;
  role: string;
}

export const StudentForm = (props: Props) => {
  const [name, setName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [instrument, setInstrument] = React.useState('');
  const [instrumentSelect, setInstrumentSelect] = React.useState('');
  const [level, setLevel] = React.useState('');
  const [formErrors, setFormErrors] = React.useState(ChildFormComponent.defaultErrors);
  const [addChild, setAddChild] = React.useState(false);

  const instrumentSelectItems = instruments.map(instrument => {
    return (
      <option key={instrument.value} value={instrument.value}>{instrument.name}</option>
    );
  });

  React.useEffect(() => {
    const isError = checkErrors(Object.values(formErrors));
    if (addChild && !isError) {
      // pass dob when api is ready and remove this
      const age = moment().diff(dob, 'years', false);

      const childToAdd = {
        name,
        instrument: instrument || instrumentSelect,
        skillLevel: level,
        age: age,
        lessonPlace: 'online',
        lessonDuration: '30 mins'
      }
      props.addChild(childToAdd);
    }
  }, [addChild]);

  const handleChange = (event) : void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    if (name === 'name') {
      return setName(value);
    }
    if (name === 'instrument') {
      setInstrument('');
      setInstrumentSelect(value);
    }
  }

  const handleBirthdayChange = (date: moment.Moment): void => {
    setDob(String(date));
  };

  const validate = () => {
    const { FieldKey } = ChildFormComponent;
    const formErrorsObject: ChildFormComponent.ChildFormErrors = {};

    if (props.role == Role.parent) {
      // validate name
      if (!name) {
        formErrorsObject[FieldKey.Name] = ChildFormComponent.childFormErrorMessages.name
      }

      // validate dob
      if (!dob) {
        formErrorsObject[FieldKey.Dob] = ChildFormComponent.childFormErrorMessages.dob
      }
    }

    // validate instrument
    if (!instrument && !instrumentSelect) {
      formErrorsObject[FieldKey.Instrument] = ChildFormComponent.childFormErrorMessages.instrument
    }

    // validate level
    if (!level) {
      formErrorsObject[FieldKey.Level] = ChildFormComponent.childFormErrorMessages.level
    }

    return setFormErrors(formErrorsObject);
  }

  const handleSubmit = (event): void => {
    if (event) {
      event.preventDefault();
    }

    validate();
    Router.push(Routes.ScheduleTrial + Routes.ChooseInstructor)
    // setAddChild(true);
  };

  const handleSetInstrument = (value: string) => {
    if (instrumentSelect) {
      setInstrumentSelect('');
    }
    setInstrument(value)
  }

  return (
    <form>
    {/* <Grid spacing={1} container={true}> */}
        <Grid spacing={1} container={true}>
          {props.role === Role.parent &&
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
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>

              <Grid item={true} xs={12}>
                <Typography color={formErrors.dob ? 'error' : 'primary'} className="nabi-margin-top-small">
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
                  {formErrors.dob && <FormHelperText error={true}>{formErrors.dob}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          }
          <Typography color={formErrors.instrument ? 'error' : 'primary'} className="nabi-margin-top-small">Instrument</Typography>
          <Grid item={true} xs={12}>
            <Grid container={true} spacing={1}>
              {ChildFormComponent.instrumentChips.map((item) => {
                return <Grid item={true} xs={6} md={12} key={item.value}>
                  <Chip
                    className="nabi-full-width"
                    onClick={() => handleSetInstrument(item.value)
                    }
                    color={item.value === instrument ? "primary" : 'default'}
                    label={item.label}
                  />
                </Grid>
              })}
              <Grid item={true} xs={6} md={4}>
                <FormControl fullWidth={true} className="nabi-margin-remove">
                  <Select
                    native={true}
                    input={<Input id={ChildFormComponent.Ids.Instrument} name={ChildFormComponent.FieldNames.Instrument} />}
                    value={instrumentSelect}
                    onChange={handleChange}
                    className={`instrument-select ${instrumentSelect && 'instrument-select-true'}`}
                  >
                    <option value="" disabled={true}>{ChildFormComponent.Placeholders.Instrument}</option>
                    {instrumentSelectItems}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {formErrors.instrument && <FormHelperText error={true}>{formErrors.instrument}</FormHelperText>}
          </Grid>
          <Typography color={formErrors.level ? 'error' : 'primary'} className="nabi-margin-top-small">Level</Typography>
          <Grid container={true} spacing={1}>
              {ChildFormComponent.levelChips.map((item) => {
                return <Grid item={true} xs={4} key={item.value}>
                  <Chip
                    className="nabi-full-width level-chips"
                    onClick={() => setLevel(item.value)}
                    color={item.value === level ? "primary" : 'default'}
                    label={item.label}
                  />
                </Grid>
              })}
            </Grid>
          {formErrors.level && <FormHelperText error={true}>{formErrors.level}</FormHelperText>}
        </Grid>
          <div className="nabi-text-right">
            <Button
              color="primary"
              className="nabi-text-uppercase nabi-margin-top-medium nabi-margin-bottom-small"
              variant="contained"
              onClick={handleSubmit}
            >
              Next
            </Button>
          </div>
      {/* </Grid> */}
    </form>
  )
}

export default StudentForm;
