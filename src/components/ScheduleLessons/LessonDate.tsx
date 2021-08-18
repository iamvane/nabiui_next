
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FormControl,
  FormHelperText,
  Typography,
  ListItem,
  FormLabel
} from '@material-ui/core';

import { ScheduleLessonsComponent } from './constants';

interface OwnProps {
  handleDateChange: (date: Date) => void;
  error?: string;
  lessonDate: Date;
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
          selected={lessonDate ? new Date(lessonDate) : new Date()}
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