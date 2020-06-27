import * as React from 'react';
import Router from "next/router";
import Link from  "next/link";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  Select,
  Typography,
} from '@material-ui/core';
import dynamic from "next/dynamic";
const Done = dynamic(() => import('@material-ui/icons/Done'), {
  ssr: false,
});

import { timeSelect } from '../../../assets/data/time';
import { selectOptions } from '../../utils/formUtils';
import { checkErrors } from "../../utils/checkErrors";
import { StoreState } from '../../redux/reducers/store';
import { scheduleLessons } from "../../redux/actions/RequestActions";
import { Routes } from '../common/constants/Routes';
import SnackBar from '../common/SnackBar';
import { ScheduleLessonsComponent } from './constants';
import { LessonType } from './model';

interface Timezone {
  name: string;
  offset: string;
  [x: string]: string;
}

interface OwnProps {
  scheduleLessons: (data: Partial<LessonType>) => void;
  bookingId: number;
  timezones?: Object[];
}

interface StateProps {
  scheduleLessonsRequesting: boolean;
  scheduleLessonsError: string;
  scheduleLessonsMessage: string;
}

interface DispatchProps {
  scheduleLessons: (data: Partial<LessonType>) => void;
}

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps { }

export const ScheduleLessons = (props: Props) => {
  const [lessonDate, setLessonDate] = React.useState('');
  const [lessonTime, setLessonTime] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const [errors, setErrors] = React.useState({} as ScheduleLessonsComponent.FormErrors);
  const [scheduleLessons, setScheduleLessons] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  // sets snackbar on success and error
  React.useEffect(() => {
    if (props.scheduleLessonsMessage && scheduleLessons) {
      setShowSnackbar(true);
      setSnackbarMessage(props.scheduleLessonsMessage)
    }
    if (props.scheduleLessonsError && scheduleLessons) {
      setShowSnackbar(true);
      setSnackbarMessage(props.scheduleLessonsError)
    }
  }, [
    scheduleLessons,
    props.scheduleLessonsError,
    props.scheduleLessonsMessage
  ]);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    let scheduleLessonsData: Partial<LessonType> = {
      date: moment(lessonDate).format("YYYY-MM-DD"),
      time: lessonTime,
      timezone
    }
    const formErrors = validate();
    const isError = checkErrors(Object.values(formErrors));

    if (isError) {
      return setErrors(formErrors);
    }

    scheduleLessonsData.bookingId = props.bookingId;
    await props.scheduleLessons(scheduleLessonsData);
    setScheduleLessons(true);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    if (name === ScheduleLessonsComponent.FieldNames.LessonTime) {
      setLessonTime(value);
      setErrors({
        ...errors,
        time: ''
      });
    } else if (name === ScheduleLessonsComponent.FieldNames.UserTimezone) {
      setTimezone(value);
      setErrors({
        ...errors,
        timezone: ''
      });
    }
  }

  const handleBirthdayChange = (date: moment.Moment): void => {
    setLessonDate(String(date));
    setErrors({
      ...errors,
      date: ''
    });
  };

  const validate = () => {
    const { FieldKey } = ScheduleLessonsComponent

    const formErrors: ScheduleLessonsComponent.FormErrors = {
      date: "",
      time: "",
      timezone: ""
    };

    // Validate date
    if (!lessonDate) {
      formErrors[FieldKey.LessonDate] = ScheduleLessonsComponent.ErrorMessages.LessonDate;
    }

    // Validate time
    if (!lessonTime) {
      formErrors[FieldKey.LessonTime] = ScheduleLessonsComponent.ErrorMessages.LessonTime;
    }

    // Validate timezone
    if (!timezone) {
      formErrors[FieldKey.UserTimezone] =
      ScheduleLessonsComponent.ErrorMessages.UserTimezone;
    }
    return formErrors;
  };

  const renderTimezones = props.timezones.map((timezone: Timezone, index) => {
    return (
      <option
        value={timezone.name}
        key={`${index}-${timezone.name}`}
      >{`(GMT${timezone.offset})${timezone.name}`}</option>
    )
  })

  return (
    <>
      <h1 className="nabi-jennasue-title nabi-color-nabi nabi-text-normalbold nabi-margin-bottom-small">{ScheduleLessonsComponent.title}</h1>
      <Typography className="nabi-margin-bottom-small">{ScheduleLessonsComponent.description}</Typography>
      {props.scheduleLessonsRequesting ? <CircularProgress /> :
      props.scheduleLessonsMessage ?
      <div>
        <IconButton color="primary" disabled={true}>
          <Done />
        </IconButton>
        <Typography className="nabi-margin-left-xsmall nabi-display-inline">{props.scheduleLessonsMessage}</Typography>
        <Link href={Routes.Dashboard}>
          <Button className="nabi-margin-top-small nabi-display-block" variant="contained" color="primary">
            {ScheduleLessonsComponent.goToDashboardButton}
          </Button>
        </Link>
      </div>
      :
        <Grid item={true} xs={12} md={6}>
          <form
            className="nabi-general-form nabi-margin-top-medium"
            noValidate={true}
            onSubmit={handleSubmit}
            autoComplete="off"
            id="schedule-lessons"
          >
            <Typography variant="body2">
              {ScheduleLessonsComponent.Placeholders.LessonDate}
            </Typography>
            <FormControl fullWidth={false} required={true} error={!!errors.date}>
              <DatePicker
                selected={lessonDate ? moment(new Date(lessonDate)) : moment(Date.now())}
                onChange={handleBirthdayChange}
                peekNextMonth={true}
                showMonthDropdown={true}
                showYearDropdown={true}
                dropdownMode="select"
              />
              <FormHelperText>{errors.date}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth={true}
              className="nabi-margin-top-small"
              error={!!errors.time}
            >
              <Select
                native={true}
                value={lessonTime}
                onChange={handleChange}
                input={<Input name={ScheduleLessonsComponent.FieldNames.LessonTime} />}
              >
                <option value="" disabled={true}>
                  {ScheduleLessonsComponent.Placeholders.LessonTime}
                </option>
                {selectOptions(timeSelect)}
                </Select>
              <FormHelperText>{errors.time}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth={true}
              className="nabi-margin-top-small"
              error={!!errors.timezone}
            >
              <Select
                native={true}
                value={timezone}
                onChange={handleChange}
                input={<Input name={ScheduleLessonsComponent.FieldNames.UserTimezone} />}
              >
                <option value="" disabled={true}>
                  {ScheduleLessonsComponent.Placeholders.UserTimezone}
                </option>
                {renderTimezones}
              </Select>
              <FormHelperText>{errors.timezone}</FormHelperText>
            </FormControl>
            <Button
              className="nabi-margin-top-small"
              variant="contained"
              color="primary"
              type="submit"
            >
              {ScheduleLessonsComponent.scheduleLessonButton}
            </Button>
            {props.scheduleLessonsError && <Typography className="nabi-margin-top-xsmall" color="error">{props.scheduleLessonsError}</Typography>}
          </form>
        </Grid>
      }
      <SnackBar
        isOpen={showSnackbar}
        message={snackbarMessage}
        handleClose={() => setShowSnackbar(false)}
        variant={props.scheduleLessonsMessage ? "success" : "error"}
      />
    </>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    actions: {
      scheduleLessons: {
        isRequesting: scheduleLessonsRequesting,
        error: scheduleLessonsError,
        message: scheduleLessonsMessage
      }
    }
  } = state.requests;

  return {
    scheduleLessonsRequesting,
    scheduleLessonsError,
    scheduleLessonsMessage
  }
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  scheduleLessons: (data: Partial<LessonType>) => dispatch(scheduleLessons(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleLessons);
