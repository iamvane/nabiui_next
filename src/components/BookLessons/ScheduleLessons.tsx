import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import { checkErrors } from "../../utils/checkErrors";
import { ScheduleLessonsComponent } from './constants';
import { LessonType } from './model';

interface Props {
  scheduleLessons: (data: Partial<LessonType>) => void;
  bookingId: number;
}


export const ScheduleLessons = (props: Props) => {
  const [lessonDate, setLessonDate] = React.useState('');
  const [lessonTime, setLessonTime] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const [formErrors, setFormErrors] = React.useState({} as ScheduleLessonsComponent.FormErrors);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    let scheduleLessonsData: Partial<LessonType> = {
      date: lessonDate,
      time: lessonTime,
      timezone
    }
    validate();

    const isError = checkErrors(Object.values(formErrors));

    if (!isError) {
      scheduleLessonsData.bookingId = props.bookingId;

      await props.scheduleLessons(scheduleLessonsData);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    if (name === ScheduleLessonsComponent.FieldNames.LessonDate) {
      setLessonDate(value);
    } else if (name === ScheduleLessonsComponent.FieldNames.LessonTime) {
      setLessonTime(value)
    } else if (name === ScheduleLessonsComponent.FieldNames.UserTimezone) {
      setTimezone(value)
    }
  }

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
    return setFormErrors(formErrors);
  };

  return (
    <>
      <Typography className="nabi-margin-bottom-small">{ScheduleLessonsComponent.title}</Typography>
      <form
        className="nabi-general-form nabi-margin-top-medium"
        noValidate={true}
        onSubmit={handleSubmit}
        autoComplete="off"
        id="schedule-lessons"
      >
        <TextField
          fullWidth={true}
          id={ScheduleLessonsComponent.Ids.LessonDate}
          name={ScheduleLessonsComponent.FieldNames.LessonDate}
          onChange={handleChange}
          placeholder={ScheduleLessonsComponent.Placeholders.LessonDate}
          required={true}
          value={lessonTime}
          error={!!formErrors.date}
          helperText={formErrors.date}
        />

        <TextField
          fullWidth={true}
          id={ScheduleLessonsComponent.Ids.LessonTime}
          name={ScheduleLessonsComponent.FieldNames.LessonTime}
          onChange={handleChange}
          placeholder={ScheduleLessonsComponent.Placeholders.LessonTime}
          required={true}
          value={lessonTime}
          error={!!formErrors.time}
          helperText={formErrors.time}
        />

        <FormControl
          fullWidth={true}
          className="nabi-margin-top-small"
          error={!!formErrors.timezone}
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
            <option value="-12:00">(GMT-12:00) International Date Line West</option>
            <option value="-11:00">(GMT-11:00) Midway Island, Samoa</option>
            <option value="-10:00">(GMT-10:00) Hawaii</option>
            <option value="-09:00">(GMT-09:00) Alaska</option>
            <option value="-08:00">(GMT-08:00) Pacific Time (US & Canada)</option>
            <option value="-08:00">(GMT-08:00) Tijuana, Baja California</option>
            <option value="-07:00">(GMT-07:00) Arizona</option>
            <option value="-07:00">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
            <option value="-07:00">(GMT-07:00) Mountain Time (US & Canada)</option>
            <option value="-06:00">(GMT-06:00) Central America</option>
            <option value="-06:00">(GMT-06:00) Central Time (US & Canada)</option>
            <option value="-06:00">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
            <option value="-06:00">(GMT-06:00) Saskatchewan</option>
            <option value="-05:00">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
            <option value="-05:00">(GMT-05:00) Eastern Time (US & Canada)</option>
            <option value="-05:00">(GMT-05:00) Indiana (East)</option>
            <option value="-04:00">(GMT-04:00) Atlantic Time (Canada)</option>
            <option value="-04:00">(GMT-04:00) Caracas, La Paz</option>
            <option value="-04:00">(GMT-04:00) Manaus</option>
            <option value="-04:00">(GMT-04:00) Santiago</option>
            <option value="-03:30">(GMT-03:30) Newfoundland</option>
            <option value="-03:00">(GMT-03:00) Brasilia</option>
            <option value="-03:00">(GMT-03:00) Buenos Aires, Georgetown</option>
            <option value="-03:00">(GMT-03:00) Greenland</option>
            <option value="-03:00">(GMT-03:00) Montevideo</option>
            <option value="-02:00">(GMT-02:00) Mid-Atlantic</option>
            <option value="-01:00">(GMT-01:00) Cape Verde Is.</option>
            <option value="-01:00">(GMT-01:00) Azores</option>
            <option value="+00:00">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
            <option value="+00:00">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
            <option value="+01:00">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
            <option value="+01:00">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
            <option value="+01:00">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
            <option value="+01:00">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
            <option value="+01:00">(GMT+01:00) West Central Africa</option>
            <option value="+02:00">(GMT+02:00) Amman</option>
            <option value="+02:00">(GMT+02:00) Athens, Bucharest, Istanbul</option>
            <option value="+02:00">(GMT+02:00) Beirut</option>
            <option value="+02:00">(GMT+02:00) Cairo</option>
            <option value="+02:00">(GMT+02:00) Harare, Pretoria</option>
            <option value="+02:00">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
            <option value="+02:00">(GMT+02:00) Jerusalem</option>
            <option value="+02:00">(GMT+02:00) Minsk</option>
            <option value="+02:00">(GMT+02:00) Windhoek</option>
            <option value="+03:00">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
            <option value="+03:00">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
            <option value="+03:00">(GMT+03:00) Nairobi</option>
            <option value="+03:00">(GMT+03:00) Tbilisi</option>
            <option value="+03:30">(GMT+03:30) Tehran</option>
            <option value="+04:00">(GMT+04:00) Abu Dhabi, Muscat</option>
            <option value="+04:00">(GMT+04:00) Baku</option>
            <option value="+04:00">(GMT+04:00) Yerevan</option>
            <option value="+04:30">(GMT+04:30) Kabul</option>
            <option value="+05:00">(GMT+05:00) Yekaterinburg</option>
            <option value="+05:00">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
            <option value="+05:30">(GMT+05:30) Sri Jayawardenapura</option>
            <option value="+05:30">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
            <option value="+05:45">(GMT+05:45) Kathmandu</option>
            <option value="+06:00">(GMT+06:00) Almaty, Novosibirsk</option>
            <option value="+06:00">(GMT+06:00) Astana, Dhaka</option>
            <option value="+06:30">(GMT+06:30) Yangon (Rangoon)</option>
            <option value="+07:00">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
            <option value="+07:00">(GMT+07:00) Krasnoyarsk</option>
            <option value="+08:00">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
            <option value="+08:00">(GMT+08:00) Kuala Lumpur, Singapore</option>
            <option value="+08:00">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
            <option value="+08:00">(GMT+08:00) Perth</option>
            <option value="+08:00">(GMT+08:00) Taipei</option>
            <option value="+09:00">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
            <option value="+09:00">(GMT+09:00) Seoul</option>
            <option value="+09:00">(GMT+09:00) Yakutsk</option>
            <option value="+09:30">(GMT+09:30) Adelaide</option>
            <option value="+09:30">(GMT+09:30) Darwin</option>
            <option value="+10:00">(GMT+10:00) Brisbane</option>
            <option value="+10:00">(GMT+10:00) Canberra, Melbourne, Sydney</option>
            <option value="+10:00">(GMT+10:00) Hobart</option>
            <option value="+10:00">(GMT+10:00) Guam, Port Moresby</option>
            <option value="+10:00">(GMT+10:00) Vladivostok</option>
            <option value="+11:00">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
            <option value="+12:00">(GMT+12:00) Auckland, Wellington</option>
            <option value="+12:00">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
            <option value="+13:00">(GMT+13:00) Nuku'alofa</option>
          </Select>
          <FormHelperText>{formErrors.timezone}</FormHelperText>
        </FormControl>

        <Button variant="contained" color="primary">{ScheduleLessonsComponent.scheduleLessonButton}</Button>
      </form>
    </>
  );
}

export default ScheduleLessons;
