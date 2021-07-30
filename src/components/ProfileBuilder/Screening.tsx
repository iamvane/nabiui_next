import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import {
  Button,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';

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
import { ProfileBuilderStepper } from './constants';
import { BackgroundCheckParams } from "./models";


interface StateProps {
  backgroundCheckStatus: string;
  status:string;
  result: string;
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
  // ADD BACK WHEN BACKGROUND CHECK STATUS RETURNS BG STATUS
  // React.useEffect(() => {

  //   const fetchData = async () => {
  //     await props.fetchBackgroundCheckStatus();
  //     await props.fetchUser();
  //   };
  //   fetchData();
  //   /* tslint:disable */
  // }, [props.email]);

  return(
    <div>
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
              <span className="nabi-text-mediumbold">Results:</span>
              <span className="nabi-text-uppercase nabi-margin-left-xsmall">{props.backgroundCheckStatus}</span>
            </Typography>
          </React.Fragment>
          :
          <React.Fragment>
            <div className="nabi-text-center nabi-margin-bottom-medium">
              <h2 className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-text-normalbold">Establish trust with your students.</h2>
              <Typography color="primary" className="nabi-margin-bottom-small">Add a background check to your profile and show you’re serious about safety.</Typography>
              <Grid item={true} xs={12} md={8} className="nabi-background-nabi nabi-color-white nabi-border-radius nabi-padding-small nabi-margin-center">
                <p className="nabi-color-white nabi-font-medium nabi-margin-bottom-xsmall">CRIMINAL RECORDS CHECK</p>
                <p className="nabi-text-extrabold nabi-margin-top-xsmall">Establish trust and earn more</p>
                <Typography className="nabi-color-white">- County Criminal Court Search (Statewide in Select States) 7 Years. All Associated Jurisdictions</Typography>
                <Typography className="nabi-color-white">- Social Security Number Trace</Typography>
                <Typography className="nabi-color-white">- Nationwide Criminal Databases Search</Typography>
                <Typography className="nabi-color-white">- Sex Offender Registry Search</Typography>
                <p className="nabi-margin-top-medium">Starts at</p>
                <p className="nabi-font-large nabi-margin-bottom-xsmall">$28</p>
                <Typography className="nabi-color-white">1 - 3 Business Days</Typography>
                <a href="https://trueme.goodhire.com/custom-link/2b6b98ae-91d3-4841-ae12-4222ae252ebe" target="_blank">
                  <Button
                    color="secondary"
                    className="nabi-text-uppercase nabi-margin-top-small"
                    variant="contained"
                    type="submit"
                  >
                    Get Background Check
                  </Button>
                </a>
              </Grid>
            </div>
            <Typography><strong>IMPORTANT NOTICE:</strong> WE USE GOOD HIRE AS A THIRD PARTY COMPANY TO PROVIDE BACKGROUND CHECKS. THE PRICE FOR BACKGROUND CHECKS MAY VARY DEPENDING ON THE STATE(S) WHERE YOU HAVE LIVED. IF YOU HAVE A BACKGROUND CHECK FROM ANOTHER COMPANY THAT IS LESS THAN A YEAR OLD, YOU CAN EMAIL IT TO INFO@NABIMUSIC.COM AND WE WILL UPDATE YOUR RECORDS.</Typography>
          </React.Fragment>
        }
      <StepperButtons
        nextPath={Routes.InstructorStudio}
        backPath={Routes.BuildProfile+ ProfileBuilderStepper.StepsPaths.References}
      />
    </div>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    instructor: {
      backgroundCheckResults: {
        status,
        result,
      },
    },
    actions: {
      fetchBackgroundCheckStatus: {
        isRequesting: isStatusRequesting,
        error: errorStatus,
      }
    }
  } = state.instructor;

  const profile = state.user.user.profile as InstructorType;
  return {
    backgroundCheckStatus: profile && profile.backgroundCheckStatus,
    status,
    result,
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

