
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  FormControl,
  FormHelperText,
  Typography,
  ListItem,
  FormLabel
} from '@material-ui/core';

import { ScheduleLessonsComponent } from './constants';

interface OwnProps {
  handleBirthdayChange: (date: moment.Moment) => void;
  errors?: string;
  lessonDate: string;
}

const LessonDate = (props: OwnProps) => {
  const {
    errors,
    handleBirthdayChange,
    lessonDate
  } = props;
  return (
    <>
      <FormControl className="nabi-instruments-select">
        <FormLabel className="nabi-margin-bottom-xsmall">
          {ScheduleLessonsComponent.Placeholders.LessonDate}
        </FormLabel>
        <DatePicker
          selected={lessonDate ? moment(new Date(lessonDate)) : moment(Date.now())}
          onChange={handleBirthdayChange}
          peekNextMonth={true}
          showMonthDropdown={true}
          showYearDropdown={true}
          dropdownMode="select"
        />
        <FormHelperText>{errors ? errors : ''}</FormHelperText>
      </FormControl>
    </>
  )
}

export default LessonDate;