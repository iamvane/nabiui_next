import * as React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import {
  Button,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';

import { StoreState } from '../../../redux/reducers/store';
import { fetchDashboard } from '../../../redux/actions/UserActions';
import { Routes } from '../../common/constants/Routes';

import SectionTitle from '../../common/SectionTitle';
import { Role } from '../../Auth/Registration/constants';
import { ParentStudentDashboardComponent as constants } from '../constants';
import { ParentStudentDashboardType } from '../models';
import MyRequestCard from './MyRequestCard';

interface OwnProps {
  role: string;
}

interface StateProps {
  isRequesting: boolean;
  error: string;
  dashboard: ParentStudentDashboardType;
}

interface DispatchProps {
  fetchDashboard: (role: Role) => void;
}

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps {}

export const ParentStudentDashboard = (props: Props) => {
  React.useEffect(() => {
    const fetchData = async () => {
      await props.fetchDashboard(props.role as Role);
    }

    fetchData();

  }, []);

  const {
    bookings,
    requests
  } = props.dashboard;
  return (
    <React.Fragment>
       {bookings && bookings.length > 0  &&
          <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
            <SectionTitle text={constants.studentSectionTitle} />
            {bookings.map((booking, i) => (
              <React.Fragment key={i}>
                <Grid container={true} spacing={2} className="nabi-margin-bottom-small nabi-margin-top-xsmall">
                  <Grid item={true} xs={12} md={4} className="nabi-text-center">
                    <p className="nabi-font-large nabi-color-nabi nabi-margin-top-xsmall nabi-margin-bottom-zero nabi-text-semibold">{booking.lessonsRemaining}</p>
                    <Typography color="primary">{constants.lessonsRemaining}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className="nabi-responsive-button"
                    >
                      {constants.buyLessonButton}
                    </Button>
                  </Grid>
                  <Grid item={true} xs={12} md={8}>
                    <Grid container={true}>
                      {props.role === Role.parent &&
                        <React.Fragment>
                          <Grid item={true} xs={6}>
                            <Typography className="nabi-text-mediumbold">{constants.studentDetailLabels.students}</Typography>
                          </Grid>
                          <Grid item={true} xs={6}>
                            <Typography>
                              {booking.students.map((student) => <span>
                                {`${student.name} ${student.age} ${booking.students[booking.students.length - 1] ? '' : ', '}`}</span>
                              )}
                            </Typography>
                          </Grid>
                        </React.Fragment>
                      }
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
                        <Typography className="nabi-text-mediumbold">{constants.studentDetailLabels.instrument}</Typography>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <Typography>{booking.instrument}</Typography>
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
                {i !== bookings.length - 1 && <Divider className="nabi-margin-bottom-xsmall" />}
              </React.Fragment>
            ))}
          </div>
        }

      {requests && requests.length > 0 &&
        <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
          <SectionTitle text={constants.requestsSectionTitle} />
          {requests.map((request, i)=> (
            <React.Fragment key={i}>
              <MyRequestCard request={request} />
              {i !== requests.length - 1 && <Divider className="nabi-margin-bottom-xsmall" />}
            </React.Fragment>
          ))}
        </div>
      }

      <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
        <SectionTitle text={constants.addRequestSectionTitle} />
        <Typography>
          {bookings.length > 0 || requests.length > 0 ?
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
    </React.Fragment>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    user: {
      dashboard
    },
    actions: {
      fetchDashboard: {
        isRequesting,
        error
      }
    }
  } = state.user;
  
  return {
    isRequesting,
    error,
    dashboard: dashboard as ParentStudentDashboardType
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchDashboard: (role: Role) => dispatch(fetchDashboard(role))
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentStudentDashboard);
