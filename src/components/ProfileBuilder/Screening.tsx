import * as React from 'react';
import { Redirect } from 'react-router-dom';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import { Routes } from '../common/constants/Routes';
import {
  ProfileBuilderStepper,
  ScreeningComponent
} from './constants';

interface State {
  isCompliant: boolean;
  performRedirect: boolean;
}

export class Screening extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isCompliant: false,
      performRedirect: false
    };
  }

  public handleContinue= () => {
    if (this.state.isCompliant) {
      this.setState({performRedirect: true});
    }
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.checked;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  public render(): JSX.Element {
    return(
      <div>
        <SectionTitle text="Screening" />
          <Grid item={true} xs={12} md={9}>
            <Typography>{ScreeningComponent.screening}</Typography>
          </Grid>
        <div className="nabi-margin-top-small nabi-margin-bottom-small">
          <SectionTitle text="Member Disclosure" />
          <Typography>{ScreeningComponent.disclosure}</Typography>
        </div>
        <SectionTitle text="Authorization" />
        <FormControlLabel
          className="nabi-margin-bottom-medium nabi-text-uppercase"
          control={
            <Checkbox
              onChange={this.handleChange}
              name={ScreeningComponent.fieldName}
            />
          }
          label={ScreeningComponent.backgroundCheckLabel}
        />
        <Grid container={true}>
          <Grid item={true} className="hide-on-mobile">
            <Button
              disabled={!this.state.isCompliant}
              color="primary"
              variant="contained"
              className="nabi-margin-right-medium"
              onClick={this.handleContinue}
            >
              {ScreeningComponent.continueButton}
            </Button>
          </Grid>
          <Grid item={true}>
            <Button className="nabi-text-decoration-underline-hover nabi-padding-top-small">
              {ScreeningComponent.exitEnrollmentButton}
            </Button>
          </Grid>
        </Grid>
        <StepperButtons
          isNextDisabled={!this.state.isCompliant}
          nextPath={Routes.Dashboard}
          divider={false}
          hideDesktopButton={true}
          backPath={ProfileBuilderStepper.StepsPaths.Employment}
        />
        {this.state.performRedirect && <Redirect to={Routes.Dashboard} />}
      </div>
    );
  }
}

export default Screening;
