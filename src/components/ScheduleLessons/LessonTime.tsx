import {
  FormControl,
  Input,
  Select,
} from '@material-ui/core';

import { timeSelect } from '../../../assets/data/time';
import { selectOptions } from '../../utils/formUtils';
import { ScheduleLessonsComponent } from './constants';

interface OwnProps {
  handleChange: (event: React.FormEvent<{}>) => void;
  errors?: ScheduleLessonsComponent.FormErrors;
  lessonTime: string;
}

const LessonTime = (props: OwnProps) => {
  const {
    handleChange,
    errors,
    lessonTime
  } = props;
  return (
    <FormControl
      className="nabi-instruments-select"
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
    </FormControl>
  )
}

export default LessonTime;