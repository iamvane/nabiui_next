import * as React from 'react';
import {
  FormControl,
  Input,
  Select,
} from '@material-ui/core';
import dynamic from "next/dynamic";
const Done = dynamic(() => import('@material-ui/icons/Done'), {
  ssr: false,
});

import { ScheduleLessonsComponent } from './constants';
// {name: "America/Denver", offset: "-0600"}

interface Timezone {
  name: string;
  offset: string;
  [x: string]: string;
}
interface OwnProps {
  handleChange: (event: React.FormEvent<{}>) => void;
  errors?: ScheduleLessonsComponent.FormErrors;
  timezone: string;
  timezones?: Timezone[];
}

const TimeZone = (props: OwnProps) => {
  const {
    errors,
    timezone,
    handleChange,
    timezones
  } = props;
  const renderTimezones = timezones.map((timezone, index) => {
    return (
      <option
        value={timezone.name}
        key={`${index}-${timezone.name}`}
      >{`(GMT${timezone.offset})${timezone.name}`}</option>
    )
  })
  return (
    <>
      <FormControl
        className="nabi-instruments-select"
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
      </FormControl>
    </>
  )
}

export default TimeZone;