import moment from 'moment';
import { ListItem } from '@material-ui/core';
import { Timezone } from '../../redux/models/TimeZonesModel';
import LessonTime from '../ScheduleLessons/LessonTime';
import LessonDate from '../ScheduleLessons/LessonDate';
import TimezoneSelect from '../ScheduleLessons/TimeZone';
import { ScheduleTrialFormComponent } from './constants';

interface Props {
  lessonDate: string;
  lessonTime: string;
  timezone: string;
  timezones: Timezone[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: moment.Moment) => void;
  errors: ScheduleTrialFormComponent.FormErrors;
}

export const ScheduleLessonForm = (props: Props) => {
  return (
    <div>
      <ListItem>
        <LessonDate
          lessonDate={props.lessonDate}
          handleDateChange={props.handleDateChange}
          error={props.errors.date}
        />
      </ListItem>

      <ListItem>
        <LessonTime
          lessonTime={props.lessonTime}
          handleChange={props.handleChange}
          error={props.errors.time}
        />
      </ListItem>

      <ListItem>
        <TimezoneSelect
          timezone={props.timezone}
          handleChange={props.handleChange}
          timezones={props.timezones}
          error={props.errors.timezone}
        />
      </ListItem>
    </div>
  )
}

export default ScheduleLessonForm;
