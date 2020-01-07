import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import {
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';

import { StoreState } from '../../redux/reducers/store';
import {
  requestBackgroundCheck,
  fetchBackgroundCheckStatus
} from "../../redux/actions/InstructorActions";
import SectionTitle from '../common/SectionTitle';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import { Routes } from '../common/constants/Routes';
import { ProfileBuilderStepper } from './constants';
import { BackgroundCheckParams } from "./models";
import StripePaymentForm from "./StripePaymentForm";
import "../../../assets/scss/StripePaymentForm.scss";

interface StateProps {
  isRequesting: boolean;
  error: string;
}

interface OwnProps { }

interface DispatchProps {
  requestBackgroundCheck: (params: BackgroundCheckParams) => void;
  fetchBackgroundCheckStatus: () => void;
}

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps { }

export const Screening = (props: Props) => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = React.useState(false);

  React.useEffect(() => {
    props.fetchBackgroundCheckStatus();
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
      {/* <StepperButtons
          nextPath={ProfileBuilderStepper.StepsPaths.JobPreferences}
          backPath={ProfileBuilderStepper.StepsPaths.AccountInfo}
          handleNext={this.handleNext}
          icon={<Icon>arrow_forward</Icon>}
        /> */}
      <StepperButtons
        isNextDisabled={!isPaymentSuccessful}
        nextPath={Routes.Dashboard}
        backPath={Routes.BuildProfile+ ProfileBuilderStepper.StepsPaths.References}
      />
      {/* {this.state.performRedirect && <Redirect to={Routes.Dashboard} />} */}
    </div>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    actions: {
      requestBackgroundCheck: {
        isRequesting,
        error
      },
    }
  } = state.instructor;

  return {
    isRequesting,
    error,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  requestBackgroundCheck: (params: BackgroundCheckParams) => dispatch(requestBackgroundCheck(params)),
  fetchBackgroundCheckStatus: () => dispatch(fetchBackgroundCheckStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Screening);

