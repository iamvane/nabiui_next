import * as React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
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
import SnackBar from '../common/SnackBar';
import StripePaymentForm from "../PaymentForm/StripePaymentForm";
import { ProfileBuilderStepper } from './constants';
import { BackgroundCheckParams } from "./models";


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
  message: string;
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
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = React.useState(false);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (!props.error && isPaymentSubmitted) {
      setIsPaymentSuccessful(true);
    }

    const fetchData = async () => {
      await props.fetchBackgroundCheckStatus();
      await props.fetchUser();
    };
    fetchData();

    if (props.message) {
      setShowSnackbar(true);
      setSnackbarMessage('Background check requested successfully.')
    }
    if (props.error) {
      setShowSnackbar(true);
      setSnackbarMessage(props.error)
    }
    /* tslint:disable */
  }, [isPaymentSubmitted, props.error, props.message]);

  const submitPayment = async (stripeToken: string) => {
    const params: BackgroundCheckParams = {
      stripeToken,
      amount: 44.25
    }
    await props.requestBackgroundCheck(params);
    setIsPaymentSubmitted(true);
  }

  return(
    <div>
      <Head>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <SectionTitle text="Screening" />
      {props.isStatusRequesting ?
        <div className="nabi-text-center"><CircularProgress /></div> :
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
                  <p className="nabi-margin-top-medium nabi-font-large nabi-margin-bottom-xsmall">$39.99</p>
                </Grid>
              </div>
              <Typography color="error"><strong>IMPORTANT NOTICE:</strong> THE BACKGROUND CHECK FEATURE IS TEMPORARILY UNAVAILABLE PLEASE COME BACK TO THIS PAGE AGAIN LATER. IF YOU HAVE A BACKGROUND CHECK FROM ANOTHER COMPANY THAT IS LESS THAN A YEAR OLD, YOU CAN EMAIL IT TO INFO@NABIMUSIC.COM AND WE WILL UPDATE YOUR RECORDS.</Typography>
              <SectionTitle text="Payment Info" />
              <Grid item={true} xs={12} md={5} className="nabi-margin-top-small nabi-margin-bottom-medium">
                {props.isRequesting ?
                  <CircularProgress /> :
                  <StripePaymentForm disabled={true} submitPayment={submitPayment} />
                }
              </Grid>
              <SectionTitle text="Order Summary" />
              <Grid container={true}>
                <Grid item={true} xs={12} md={4}>
                  <Typography>Background Check</Typography>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                  <Typography>$39.99</Typography>
                </Grid>
                <Grid item={true} xs={12} md={4}>
                  <Typography>Processing Fee</Typography>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                  <Typography>$1.46</Typography>
                </Grid>
                <Grid item={true} xs={12} md={4}>
                  <Typography>Sales Tax (7%)</Typography>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                  <Typography>$2.80</Typography>
                </Grid>
                <Grid item={true} xs={12} md={4}>
                  <Typography color="primary" className="nabi-text-mediumbold">Total</Typography>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                  <Typography color="primary" className="nabi-text-mediumbold">$44.25</Typography>
                </Grid>
              </Grid>
            </React.Fragment>
        }
      <SnackBar
        isOpen={showSnackbar}
        message={snackbarMessage}
        handleClose={() => setShowSnackbar(false)}
        variant={props.message ? "success" : "error"}
      />
      <StepperButtons
        isNextDisabled={(!isPaymentSuccessful && !props.result) || !!props.status}
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
        error,
        message
      },
      fetchBackgroundCheckStatus: {
        isRequesting: isStatusRequesting,
        error: errorStatus,
      }
    }
  } = state.instructor;

  const profile = state.user.user.profile as InstructorType;
  return {
    isRequesting,
    error,
    message,
    backgroundCheckStatus: profile && profile.backgroundCheckStatus,
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

