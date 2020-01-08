import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import moment from 'moment';

import {
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';

import "../../../assets/scss/StripePaymentForm.scss";
import { StoreState } from '../../redux/reducers/store';
import {
  requestBackgroundCheck,
  fetchBackgroundCheckStatus
} from "../../redux/actions/InstructorActions";
import { fetchUser } from '../../redux/actions/UserActions';
import { InstructorType } from '../../redux/models/InstructorModel';
import SectionTitle from '../common/SectionTitle';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import { Routes } from '../common/constants/Routes';
import { BackgroundCheckStatus } from '../ProfileBuilder/constants'
import { ProfileBuilderStepper } from './constants';
import { BackgroundCheckParams } from "./models";
import StripePaymentForm from "./StripePaymentForm";


interface StateProps {
  isRequesting: boolean;
  error: string;
  backgroundCheckStatus: string;
  requestorEmail: string;
  status:string;
  result: string;
  createdAt: string;
  email: string;
  isStatusRequesting: boolean;
  errorStatus: string;
}

interface OwnProps { }

interface DispatchProps {
  requestBackgroundCheck: (params: BackgroundCheckParams) => void;
  fetchBackgroundCheckStatus: () => void;
  fetchUser: () => void;
}

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps { }

export const Screening = (props: Props) => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      await props.fetchBackgroundCheckStatus();
      await props.fetchUser();
    };
    fetchData();
    /* tslint:disable */
  }, []);

  const setPaymentSuccess= (success: boolean) => {
    setIsPaymentSuccessful(success);
  };

  const submitPayment = async (params: BackgroundCheckParams) => {
    await props.requestBackgroundCheck(params);
  }

  return(
    <div>
      <SectionTitle text="Screening" />
      {props.isStatusRequesting ?
        <CircularProgress /> :

          props.status ?
            <React.Fragment>
              <Typography>
                <span className="nabi-text-mediumbold">Background check status:</span>
                <span className="nabi-text-uppercase nabi-margin-left-xsmall">{props.status}</span>
              </Typography>
              <Typography>
                <span className="nabi-text-mediumbold">Processed on:</span>
                <span className="nabi-margin-left-xsmall">{moment(props.createdAt).format("MMM Do YYYY")}</span>
              </Typography>
              <Typography>
                <span className="nabi-text-mediumbold">Results:</span>
                <span className="nabi-text-uppercase nabi-margin-left-xsmall">{props.backgroundCheckStatus}</span>
              </Typography>
            </React.Fragment>
          :
            <React.Fragment>
              <div className="nabi-text-center nabi-margin-bottom-medium">
                <h2 className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-text-normalbold">Establish trust with your students.</h2>
                <Typography color="primary" className="nabi-margin-bottom-small">Add a background check to your profile and show you’re serious about safety.</Typography>
                <Grid item={true} xs={12} md={5} className="nabi-background-nabi nabi-color-white nabi-border-radius nabi-padding-small nabi-margin-center">
                  <p className="nabi-color-white nabi-font-medium nabi-margin-bottom-xsmall">CRIMINAL RECORDS CHECK</p>
                  <p className="nabi-text-extrabold nabi-margin-top-xsmall">Establish trust and earn more</p>
                  <Typography className="nabi-color-white">- National criminal history</Typography>
                  <Typography className="nabi-color-white">- County criminal history</Typography>
                  <Typography className="nabi-color-white">- Global terror watchlist</Typography>
                  <p className="nabi-margin-top-medium nabi-font-large nabi-margin-bottom-xsmall">$29.99</p>
                </Grid>
              </div>
              <SectionTitle text="Payment Info" />
              <Grid item={true} xs={12} md={5} className="nabi-margin-top-small nabi-margin-bottom-medium">
                {props.isRequesting ?
                  <CircularProgress /> :
                  <StripePaymentForm submitPayment={submitPayment} />
                }
              </Grid>
              <SectionTitle text="Order Summary" />
              <Grid container={true}>
                <Grid item={true} xs={12} md={4}>
                  <Typography>Background Check</Typography>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                  <Typography>$29.99</Typography>
                </Grid>
                <Grid item={true} xs={12} md={4}>
                  <Typography>Processing Fee</Typography>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                  <Typography>$1.17</Typography>
                </Grid>
                <Grid item={true} xs={12} md={4}>
                  <Typography>Sales Tax (7%)</Typography>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                  <Typography>$2.10</Typography>
                </Grid>
                <Grid item={true} xs={12} md={4}>
                  <Typography color="primary" className="nabi-text-mediumbold">Total</Typography>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                  <Typography color="primary" className="nabi-text-mediumbold">$33.26</Typography>
                </Grid>
              </Grid>
            </React.Fragment>
        }
      <StepperButtons
        isNextDisabled={!isPaymentSuccessful && !props.result}
        nextPath={Routes.Dashboard}
        backPath={Routes.BuildProfile+ ProfileBuilderStepper.StepsPaths.References}
      />
    </div>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    instructor: {
      backgroundCheckResults: {
        requestorEmail,
        status,
        result,
        createdAt,
      }
    },
    actions: {
      requestBackgroundCheck: {
        isRequesting,
        error
      },
      fetchBackgroundCheckStatus: {
        isRequesting: isStatusRequesting,
        error: errorStatus
      }
    }
  } = state.instructor;

  const profile = state.user.user.profile as InstructorType;
  return {
    isRequesting,
    error,
    backgroundCheckStatus: profile.backgroundCheckStatus,
    requestorEmail: requestorEmail,
    status,
    result,
    createdAt,
    email: state.user.user.email,
    isStatusRequesting,
    errorStatus
  }
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  requestBackgroundCheck: (params: BackgroundCheckParams) => dispatch(requestBackgroundCheck(params)),
  fetchBackgroundCheckStatus: () => dispatch(fetchBackgroundCheckStatus()),
  fetchUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Screening);

