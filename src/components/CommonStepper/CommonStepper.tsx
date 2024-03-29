import * as React from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';

import {
  Step,
  Stepper,
  StepButton
} from '@material-ui/core';

import PageTitle from '../common/PageTitle';

interface StepsType {
  [key: string]: StepType;
}

interface StepType {
  label: string;
  url: string;
}

export interface Props {
  stepsPaths: Object;
  steps: StepsType;
  content: JSX.Element[];
  pageTitle: string;
  baseRoute: string;
  stepQueries: string[];
}

export const CommonStepper = (props: Props) => {
  const getIndex = () => {
    const router = useRouter();
    const index = props.stepQueries.indexOf(router.query.step as string);
    return index;
  }

  const getStepContent = () => {
    return props.content[getIndex()];
  }

  const renderStepperLabels = (): JSX.Element => {
    const steps: any = [];

    for (const [key, value] of Object.entries(props.steps)) {
      steps.push(
        <Step key={key}>
          <StepButton onClick={() => Router.push(`${props.baseRoute}${value.url}`)}>
            {value.label}
          </StepButton>
        </Step>
      );
    }

    return (
      <div className="hide-on-mobile">
        <Stepper alternativeLabel={true} nonLinear={true} activeStep={getIndex()}>
          {steps}
        </Stepper>
      </div>
    );
  }

  return (
    <div className="nabi-container">
      <PageTitle pageTitle={props.pageTitle} />

      <div className="nabi-background-white nabi-section nabi-margin-bottom-medium">
        {renderStepperLabels()}
        {getStepContent()}
      </div>
    </div>
  );
}

export default CommonStepper;
