import * as React from 'react';
import Head from 'next/head';
import { RouteComponentProps } from 'react-router';
const reactStringReplace = require('react-string-replace');

import SnackBar from '../common/SnackBar';
import { AnnouncementConstants } from '../common/constants/Announcement';
import CommonStepper from '../CommonStepper/CommonStepper';
import AccountInfo from '../AccountInfo/AccountInfo';
import RequestStep from '../Request/RequestStep';
import { Routes } from '../common/constants/Routes';
import PrivateRoute from '../Auth/PrivateRoutes';
import {
  RequestBuilderStepper,
  RequestBuilderComponent
} from './constants';

interface State {
  showSnackbar: boolean;
}

interface Props extends RouteComponentProps<{}> { }

export class RequestBuilder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSnackbar: false
    };
  }

  // componentDidMount() {
  //   if (this.props.location.state && this.props.location.state.redirectedFrom === Routes.Registration) {
  //     this.setState({
  //       showSnackbar: true
  //     });
  //   }
  // }

  public closeSnackbar = () => this.setState({ showSnackbar: false });

  public render() {
    const snackBarMessage = reactStringReplace(
      AnnouncementConstants.welcomeStudent,
      AnnouncementConstants.welcomePlaceholder,
      (i: number) => (
        <span key={i} className="nabi-text-mediumbold">{AnnouncementConstants.welcomeText}</span>
      )
    );
    const components = [
      (
        <AccountInfo
          key={0}
          redirectUrl={Routes.BuildRequest + RequestBuilderStepper.StepsPaths.BuildRequest}
          nextPath={Routes.BuildRequest + RequestBuilderStepper.StepsPaths.BuildRequest}
          hasImageUploader={true}
        />
      ),
      <RequestStep key={1} />
    ];

    return (
      <React.Fragment>
        <Head>
          <script async={true} defer={true} src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA1CE5k-YS94ZnyFiOIjwlr99jz7JjOA&libraries=places"></script>
        </Head>
        <CommonStepper
          steps={RequestBuilderStepper.steps}
          pageTitle={RequestBuilderComponent.pageTitle}
          stepsPaths={RequestBuilderStepper.StepsPaths}
          content={components}
          baseRoute={Routes.BuildRequest}
          stepQueries={RequestBuilderStepper.stepsQueries}
        />
        <SnackBar
          isOpen={this.state.showSnackbar}
          message={snackBarMessage}
          handleClose={this.closeSnackbar}
          variant="success"
          hideIcon={true}
        />
      </React.Fragment>
    );
  }
}

export default PrivateRoute(RequestBuilder, 'Private', ['Student', 'Parent']);
