import {
  Typography
} from "@material-ui/core";

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Warning from '@material-ui/icons/WarningRounded';

import '../../../assets/scss/LessonStatus.module.scss';

import { LessonStatusLabels } from './constants';

interface Props {
  lessonStatus: string;
}

export const LessonStatus = (props: Props) => {
  const statusIcons = {
    scheduled: <CalendarTodayIcon className="text-aligned-icon scheduled-status" />,
    missed: <CancelIcon className="text-aligned-icon missed-status" />,
    complete: <CheckCircleIcon className="text-aligned-icon complete-status" />,
    pending: <Warning className="text-aligned-icon pending-status" />
  }

  const statusStyles = {
    scheduled: 'scheduled-status',
    missed: 'missed-status',
    complete: 'complete-status',
    pending: 'pending-status'
  }

  return (
    <>
    {statusIcons[props.lessonStatus]}
    <Typography className="nabi-display-inline nabi-margin-left-xsmall nabi-text-mediumbold">
      <span className={`${statusStyles[props.lessonStatus]}`}>{LessonStatusLabels[props.lessonStatus]}</span>
    </Typography>
    </>
  )

}
