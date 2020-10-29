import * as React from 'react';
import moment from 'moment';
import {
} from 'redux';
import * as _ from "lodash";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
import ArrowdownIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import '../../../assets/scss/ChildForm.scss';
import { specialNeeds } from '../../../assets/data/specialNeeds';

import { setCookie } from "../../utils/cookies";
import { instruments } from '../../../assets/data/instruments';
import { checkErrors } from "../../utils/checkErrors";
import { Role } from '../../constants/Roles';
import { ChildFormComponent, LessonDetailsComponent, } from './constants';
import { StudentDetailsType } from '../Dashboard/ParentStudentDashboard/model';

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
  const [specialNeed, selectSpecialNeed] = React.useState('');
  const [notes, setNotes] = React.useState('');

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

      let childToAdd: StudentDetailsType = {
        instrument: instrument || instrumentSelect,
        skillLevel: level,
        ...(specialNeed && { specialNeeds: [specialNeed] }),
        ...(notes && { notes })
      };

      if (props.role === Role.parent) {
        childToAdd = {
          ...childToAdd,
          name,
          age
        };
      }

      setCookie('studentName', name);
      setCookie('instrumentName', instrument || instrumentSelect);
      props.addChild(childToAdd);
    }
  }, [addChild, JSON.stringify(formErrors)]);


  // React.useEffect(() => {
  //   Router.push(Routes.ScheduleTrial + Routes.ScheduleTrial)
  // }, [props.]);

  const handleChange = (event): void => {
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
    if (name === 'specialNeed') {
      selectSpecialNeed(value);
    }

    if (name === 'notes') {
      setNotes(value);
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
    setAddChild(true);
  };

  const handleSetInstrument = (value: string) => {
    if (instrumentSelect) {
      setInstrumentSelect('');
    }
    setInstrument(value)
  }

  const renderedSpecialNeeds = specialNeeds.map(specialNeed => {
    return (
      <option key={specialNeed.value} value={specialNeed.value}>{specialNeed.name}</option>
    );
  });

  const renderSpecialNeeds = () => {
    return (
      <FormControl>
        <Select
          classes={{
            select: "lesson-details__special-needs--select"
          }}
          native={true}
          onChange={handleChange}
          IconComponent={() => (<ArrowdownIcon color="action" />)}
          value={specialNeed}
          inputProps={{
            id: `${ChildFormComponent.Ids.SpecialNeed}`,
            name: `${ChildFormComponent.Ids.SpecialNeed}`,
          }}
        >
          <option value="" disabled={true}>
            {ChildFormComponent.selectSpecialNeeds}
          </option>
          {renderedSpecialNeeds}
        </Select>
        {formErrors.specialNeeds && <FormHelperText error={true}>{formErrors.specialNeeds}</FormHelperText>}
      </FormControl>
    )
  }

  return (
    <>
      <div className="nabi-display-flex nabi-flex-column">
        {props.role === Role.parent &&
          <>
            <Typography color={formErrors.name ? 'error' : undefined} className="nabi-margin-top-small">
              {ChildFormComponent.Labels.Name}
            </Typography>
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

            <Typography color={formErrors.dob ? 'error' : undefined} className="nabi-margin-top-small">
              {ChildFormComponent.Labels.Dob}
            </Typography>

            <FormControl required={true}>
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
          </>
        }

        <Typography color={formErrors.instrument ? 'error' : undefined} className="nabi-margin-top-small">Instrument</Typography>
        <div className="nabi-display-flex nabi-flex-wrap">
          {ChildFormComponent.instrumentChips.map((item) => {
            return (<Chip
              className="student__instrument"
              onClick={() => handleSetInstrument(item.value)
              }
              color={item.value === instrument ? "primary" : 'default'}
              label={item.label}
            />)
          })}
          <FormControl classes={{
            root: "nabi-margin-remove student__instrument"
          }}>
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
        </div>

        {formErrors.instrument && <FormHelperText error={true}>{formErrors.instrument}</FormHelperText>}
        <Typography color={formErrors.level ? 'error' : undefined} className="nabi-margin-top-small">Level</Typography>

        <div className="nabi-display-flex nabi-flex-wrap">
          {ChildFormComponent.levelChips.map((item) => (
            <Chip
              className="level-chips student__level"
              onClick={() => setLevel(item.value)}
              color={item.value === level ? "primary" : 'default'}
              label={item.label}
            />
          ))}
        </div>
        {formErrors.level && <FormHelperText error={true}>{formErrors.level}</FormHelperText>}

        <Typography color={formErrors.specialNeeds ? 'error' : undefined} className="nabi-margin-top-small">
          {ChildFormComponent.Labels.SpecialNeeds}
        </Typography>

        <div className="nabi-display-flex">
          {renderSpecialNeeds()}
        </div>

        <Typography className="nabi-margin-top-small">
          {ChildFormComponent.Labels.Notes}
        </Typography>

        <TextField
          fullWidth={true}
          id={ChildFormComponent.Ids.Notes}
          name={ChildFormComponent.Ids.Notes}
          value={notes}
          onChange={handleChange}
          placeholder={ChildFormComponent.Placeholders.Notes}
          required={true}
        />

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
      </div>

    </>
  )
}

export default StudentForm;
