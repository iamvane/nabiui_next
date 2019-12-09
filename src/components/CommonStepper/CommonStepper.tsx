import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import {
  Step,
  Stepper,
  StepButton
} from '@material-ui/core';

import PageTitle from '../common/PageTitle';

export interface OwnProps extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  step: string;
}

interface StepsType {
  [key: string]: StepType;
}

interface StepType {
  label: string;
  url: string;
}

export interface Props extends OwnProps {
  stepsPaths: Object;
  steps: StepsType;
  content: JSX.Element[];
  pageTitle: string;
  baseRoute: string;
}

interface State {
  activeStep: number;
  completed: any;
}

export class CommonStepper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeStep: 0,
      completed: {},
    };
  }

  public componentDidMount(): void {
    const { match } = this.props;

    if (match.params.step) {
      // set activeStep state based on route step prop
      const steps = Object.values(this.props.stepsPaths);
      const stepIndex = steps.indexOf(match.params.step);

      this.setState({ activeStep: stepIndex });

      // navigate to /policies/:id if resource is invalid
      const stepRouteMatch = steps.includes(match.params.step);

      if (!stepRouteMatch) {
        this.props.history.replace(`${this.props.baseRoute}/${steps[0]}`);
      }
    }
  }

  getStepContent(stepIndex: any) {
    return this.props.content[stepIndex];
  }

  // TODO: handle complete
  // handleComplete = () => {
  //   const { completed } = this.state;
  //   completed[this.state.activeStep] = true;
  // }

  public renderStepperLabels(): JSX.Element {
    const { activeStep } = this.state;
    const steps: any = [];

    for (const [key, value] of Object.entries(this.props.steps)) {
      steps.push(
        <Step key={key}>
          <StepButton
            // completed={this.state.completed[index]} TODO
            onClick={() => this.props.history.push(`${value.url}`)}
          >
            {value.label}
          </StepButton>
        </Step>
      );
    }

    return (
      <div className="hide-on-mobile">
        <Stepper alternativeLabel={true} nonLinear={true} activeStep={activeStep}>
          {steps}
        </Stepper>
      </div>
    );
  }

  public render(): JSX.Element {
    const { activeStep } = this.state;
    return (
      <div className="nabi-container">
        <PageTitle pageTitle={this.props.pageTitle} />

        <div className="nabi-background-white nabi-section">
          {this.renderStepperLabels()}
          {this.getStepContent(activeStep)}
        </div>
      </div>
    );
  }
}

export default withRouter(CommonStepper);
