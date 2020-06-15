import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';

import { Routes } from '../../common/constants/Routes';

import SectionTitle from '../../common/SectionTitle';
import { ParentStudentDashboardComponent as constants } from '../constants';
import { ParentStudentDashboardType } from '../models';
import MyRequestCard from './MyRequestCard';

interface Props {
  role: string;
  dashboard: ParentStudentDashboardType;
}

export const ParentStudentDashboard = (props: Props) => {
  console.log('student dashboard');
  return (
    <React.Fragment>
      {props.dashboard &&
       props.dashboard.bookings && props.dashboard.bookings.length > 0  &&
          <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
            <SectionTitle text={constants.studentSectionTitle} />
            {props.dashboard.bookings.map((booking, i) => (
              <React.Fragment key={i}>
                <Grid container={true} spacing={2} className="nabi-margin-bottom-small nabi-margin-top-xsmall">
                  <Grid item={true} xs={12} md={4} className="nabi-text-center">
                    <p className="nabi-font-large nabi-color-nabi nabi-margin-top-xsmall nabi-margin-bottom-zero nabi-text-semibold">{booking.lessonsRemaining}</p>
                    <Typography color="primary">{constants.lessonsRemaining}</Typography>
                      <Link href={`${Routes.BookLessons}/${booking.applicationId}`}>
                        <a>
                          <Button
                            variant="contained"
                            color="primary"
                            className="nabi-responsive-button"
                          >
                            {constants.buyLessonButton}
                          </Button>
                        </a>
                      </Link>
                  </Grid>
                  <Grid item={true} xs={12} md={8}>
                    <Grid container={true}>
                      <Grid item={true} xs={6}>
                        <Typography className="nabi-text-mediumbold">{constants.studentDetailLabels.students}</Typography>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography>
                          {booking.students && booking.students.map((student) => <span>
                            {`${student.name} ${student.age} ${booking.students[booking.students.length - 1] ? '' : ', '}`}</span>
                          )}
                        </Typography>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography className="nabi-text-mediumbold">{constants.studentDetailLabels.instrument}</Typography>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography>{booking.instrument}</Typography>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography className="nabi-text-mediumbold">{constants.studentDetailLabels.skillLevel}</Typography>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography>{booking.skillLevel}</Typography>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography className="nabi-text-mediumbold">{constants.studentDetailLabels.instructor}</Typography>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography>{booking.instructor}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {props.dashboard.bookings && (i !== props.dashboard.bookings.length - 1 && <Divider className="nabi-margin-bottom-xsmall" />)}
              </React.Fragment>
            ))}
          </div>
          }
    {props.dashboard &&
      props.dashboard.requests && props.dashboard.requests.length > 0 &&
        <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
          <SectionTitle text={constants.requestsSectionTitle} />
          {props.dashboard.requests.map((request, i)=> (
            <React.Fragment key={i}>
              <MyRequestCard request={request} />
              {i !== props.dashboard.requests.length - 1 && <Divider className="nabi-margin-bottom-xsmall" />}
            </React.Fragment>
          ))}
        </div>
      }

    {props.dashboard &&
      <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
        <SectionTitle text={constants.addRequestSectionTitle} />
        <Typography>
          {props.dashboard.bookings && props.dashboard.bookings.length > 0 || props.dashboard.requests.length > 0 ?
            constants.addRequestText.withBookingDescription :
            constants.addRequestText.withoutBookingDescription}
          </Typography>
        <Link href={Routes.BuildRequest + '/request'}>
          <a>
            <Button color="primary" variant="contained" className="nabi-responsive-button nabi-margin-top-small">
              {constants.addRequestText.button}
            </Button>
          </a>
        </Link>
      </div>
    }
    </React.Fragment>
  );
}
export default ParentStudentDashboard;
