import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

import PageTitle from '../common/PageTitle';


import { ScheduleLessonsComponent } from './constants';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface CalendarProps {
  closeCalendar: () => void;
  handleCalendarDate: (date: string) => void;
}
export const Calendar = (props: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const dayOfTheMonth = new Date().getDate();
  const date = new Date(currentYear, currentMonth + 1, 0);
  const totalDaysInCurrentMonth = date.getDate();
  const startDayOfTheWeekForCurrentMonth = new Date(date.getFullYear(), date.getMonth()).getDay();

  const calendarMonth = () => {
    const calendar = [];
    let daysOftheMonth = 1;
    for (let week = 0; week <= 5; week += 1) {
      calendar.push([]);
      for (let day = 0; day <= 6; day += 1) {
        if (week === 0 && day < startDayOfTheWeekForCurrentMonth) {
          calendar[week].push('');
        } else if (week === 0 && day === startDayOfTheWeekForCurrentMonth) {
          calendar[week].push(String(daysOftheMonth));
          daysOftheMonth += 1;
        } else {
          if (daysOftheMonth > totalDaysInCurrentMonth) {
            calendar[week].push('');
          } else {
            calendar[week].push(String(daysOftheMonth))
          }
          daysOftheMonth += 1;
        }
      }
    }

    const isValidDate = (day) => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      if (!day) return false;
      if (currentYear < year) return false;
      if (currentYear > year) return true;
      if (currentMonth < month) return false;
      if (currentMonth > month) return true;
      if (currentMonth === month && Number(day) < dayOfTheMonth) return false;
      return true;
    }
    return calendar.map((week, index) => {
      return (<TableRow key={`week-${index}`} className="nabi-calendar-table-row">
        {
          week.map((day, index) => {
            return (
              <TableCell
                className={`
                  nabi-padding-left-zero nabi-padding-right-zero
                  nabi-padding-top-small nabi-padding-bottom-small
                  ${isValidDate(day) ? 'nabi-calendar-table-cell cursor-pointer selectable-date' : 'nabi-calendar-table-cell'}
                  ${new Date().getMonth() === currentMonth && Number(day) === dayOfTheMonth ? 'selected-date' : ''}
                `}
                align="center"
                size="small" key={`day-${index}`}
                onClick={() => {
                  let selectedDay;
                  let selectedMonth;
                  if (day.length === 1) {
                    selectedDay = `0${day}`
                  } else {
                    selectedDay = day;
                  }

                  if (String(currentMonth + 1).length === 1) {
                    selectedMonth = `0${currentMonth + 1}`
                  } else {
                    selectedMonth = currentMonth + 1;
                  }

                  const lessonDate = `${currentYear}-${selectedMonth}-${selectedDay}`;

                  if (isValidDate(day)) {
                    props.handleCalendarDate(lessonDate)
                    props.closeCalendar();
                  }
                }}
              >
                {day}
              </TableCell>
            );
          })
        }
      </TableRow>)
    })
  }

  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md nabi-margin-bottom-large">
      <PageTitle pageTitle={ScheduleLessonsComponent.Calendar.PageTitle} />
      <Grid className="nabi-background-white nabi-margin-center nabi-padding-medium" item={true} md={6} xs={10} sm={10}>
        <Typography className="nabi-display-flex nabi-flex-justify-center">{ScheduleLessonsComponent.Calendar.ThirtyMinLesson}</Typography>
        <Typography color="primary" className="nabi-text-mediumbold nabi-margin-left-xsmall-md nabi-text-uppercase nabi-margin-top-large nabi-margin-bottom-xsmall">
          {ScheduleLessonsComponent.Calendar.SelectADay}
        </Typography>
        <Divider className="nabi-margin-bottom-xsmall" />
        <div className="nabi-display-flex nabi-flex-align-center">
          <Typography className="nabi-margin-top-small nabi-margin-bottom-small nabi-margin-left-xsmall-md nabi-text-mediumbold">
            {`${months[currentMonth]} - ${currentYear}`}
          </Typography>
          <ArrowLeft className="nabi-cursor-pointer" onClick={() => {
            if (currentMonth === 0) {
              setCurrentYear(currentYear - 1);
              setCurrentMonth(11);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }} /> <ArrowRight className="nabi-cursor-pointer" onClick={() => {
            if (currentMonth === 11) {
              setCurrentYear(currentYear + 1);
              setCurrentMonth(0);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }} />
        </div>
        <Table size="small" aria-label="lesson table">
          <TableHead>
            <TableRow className="nabi-calendar-table-row">
              {weekDays.map((day) => (
                <TableCell
                  key={day}
                  className="nabi-padding-left-zero nabi-padding-right-zero nabi-padding-top-small nabi-padding-bottom-small nabi-cursor-pointer nabi-calendar-header-cell"
                  align="center"
                  size="small"
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {calendarMonth()}
          </TableBody>
        </Table>
        <Typography className="nabi-margin-top-xsmall">{ScheduleLessonsComponent.Calendar.EasternStandardTime}</Typography>
      </Grid>
    </div>
  )
}
