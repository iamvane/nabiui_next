
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
  handleDateChange: (date: moment.Moment) => void;
  error?: string;
  lessonDate: string;
}

const LessonDate = (props: OwnProps) => {
  const {
    error,
    handleDateChange,
    lessonDate
  } = props;
  return (
    <>
      <FormControl className="nabi-instruments-select" error={!!error}>
        <FormLabel className="nabi-margin-bottom-xsmall">
          {ScheduleLessonsComponent.Placeholders.LessonDate}
        </FormLabel>
        <DatePicker
          selected={lessonDate ? moment(new Date(lessonDate)) : moment(Date.now())}
          onChange={handleDateChange}
          peekNextMonth={true}
          showMonthDropdown={true}
          showYearDropdown={true}
          dropdownMode="select"
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </>
  )
}

export default LessonDate;