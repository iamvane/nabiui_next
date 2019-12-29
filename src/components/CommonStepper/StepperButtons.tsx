import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  CircularProgress,
  Divider,
  Icon,
  MobileStepper,
  Typography
} from '@material-ui/core';

import { Routes } from '../common/constants/Routes';
import { CommonStepperButtons } from './constants';

interface Props {
  nextPath?: string;
  backPath?: string;
  buttonText?: string;
  divider?: boolean;
  icon?: any;
  isNextDisabled?: boolean;
  hideDesktopButton?: boolean;
  handleNext?: (e: any) => void;
  isRequesting?: boolean;
  errors?: string | string[];
}

export const StepperButtons: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
  const renderBackMobile = (): JSX.Element => {
    if (props.backPath) {
      return (
        <Link href={props.backPath}>
          <Button color="primary" size="small">
            <Icon>keyboard_arrow_left</Icon>
            {CommonStepperButtons.Back}
          </Button>
        </Link>
      );
    } else {
      return (
        <Button size="small" disabled={true}>
          <Icon>keyboard_arrow_left</Icon>
          {CommonStepperButtons.Back}
        </Button>
      );
    }
  };

  const renderNextMobile = (): JSX.Element => {
    if (props.nextPath) {
      return (
        <Link href={props.nextPath}>
          <a className={props.isNextDisabled ? 'nabi-disabled-link' : ''}>
            <Button
              size="small"
              disabled={props.isNextDisabled}
              color="primary"
              onClick={props.handleNext}
            >
              {CommonStepperButtons.Next}
              <Icon>keyboard_arrow_right</Icon>
            </Button>
          </a>
        </Link>
      );
    } else {
      if (props.isRequesting) {
        return (<CircularProgress />);
      }
      return (
        <Button
          size="small"
          color="primary"
          onClick={props.handleNext}
          disabled={props.isNextDisabled}
        >
          {CommonStepperButtons.Next}
          <Icon>keyboard_arrow_right</Icon>
        </Button>
      );
    }
  };

  return (
    <React.Fragment>
      {props.divider && <Divider className="nabi-margin-top-medium" />}
      {props.errors && <Typography className="nabi-text-right" color="error">{props.errors}</Typography>}
      <div className="hide-on-mobile nabi-margin-top-large">
        <div className="nabi-text-right">
          <Link href={Routes.Dashboard}>
            <a className="nabi-margin-right-xsmall-md">
              <Button
                variant="contained"
                className={`nabi-text-uppercase ${props.hideDesktopButton ? 'nabi-display-none' : ''} `}
              >
                {CommonStepperButtons.Exit}
              </Button>
            </a>
          </Link>
          {
            props.nextPath ? (
              props.isRequesting ?
                <CircularProgress /> :
                <Link href={props.nextPath}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`nabi-text-uppercase ${props.hideDesktopButton ? 'nabi-display-none' : ''} `}
                    onClick={props.handleNext}
                    disabled={props.isNextDisabled}
                  >
                    {props.buttonText}
                    <span className="nabi-margin-left-xsmall nabi-display-flex">{props.icon}</span>
                  </Button>
                </Link>
            ) : (
                props.isRequesting ?
                  <CircularProgress /> :
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={props.handleNext}
                    disabled={props.isNextDisabled}
                  >
                    {props.buttonText}
                    <span className="nabi-margin-left-xsmall nabi-display-flex">{props.icon}</span>
                  </Button>
              )
          }
        </div>
      </div>
      <div className="hide-on-desktop nabi-margin-top-medium">
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={0}
          nextButton={renderNextMobile()}
          backButton={renderBackMobile()}
        />
      </div>
    </React.Fragment>
  );
};

StepperButtons.defaultProps = {
  divider: true,
  buttonText: CommonStepperButtons.Continue,
  handleNext: () => undefined
};
