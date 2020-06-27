import { ListItem } from '@material-ui/core';
import { ScheduleTrialFormComponent } from './constants';
import LessonTime from '../ScheduleLessons/LessonTime';
import LessonDate from '../ScheduleLessons/LessonDate';
import Timezone from '../ScheduleLessons/TimeZone';

interface Props {
  lessonDate: string;
  lessonTime: string;
  timezone: string;
  timezones: [];
  handleChange: () => void;
  handleDateChange: () => void;
  errors: ScheduleTrialFormComponent.ScheduleTrialErrors;
}

export const ScheduleLessonForm = (props: Props) => {
  return (
    <div>
      <ListItem>
        <LessonDate
          lessonDate={props.lessonDate}
          handleDateChange={props.handleDateChange}
          error={props.errors.lessonDate}
        />
      </ListItem>

      <ListItem>
        <LessonTime
          lessonTime={props.lessonTime}
          handleChange={props.handleChange}
          error={props.errors.lessonTime}
        />
      </ListItem>

      <ListItem>
        <Timezone
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
