import * as React from 'react';

import {
  Action,
  Dispatch
} from 'redux';

import { connect } from 'react-redux';

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';

import SelectedEmail from './SelectedEmail';

import {
  requestReference,
  fetchReferences
} from '../../redux/actions/InstructorActions';
import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';
import { ProfileBuilderStepper } from '../ProfileBuilder/constants';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import SnackBar from '../common/SnackBar';
import { Routes } from '../common/constants/Routes';
import { RecommendationsModalComponent } from './constants';

const title = 'Get references, get hired more';
const message = `
Provide at least two professional references
This includes your past or current student(s),
professor(s), mentor(s), employer(s) and/or colleague(s).
`;
// const buttonText = 'Get recommendations';

interface OpenModalState {
  openModal: boolean;
  showSnackbar: boolean;
}

interface StateProps {
  user: UserType;
  isRequestingReference: boolean;
  isFetchingReference: boolean;
  message: string;
  references: string[];
  errorRequestReferences: string;
  errorFetchReferences: string;
}

interface DispatchProps {
  requestReference: (reference: string) => void;
  fetchReferences: () => void;
}

interface Props extends
  StateProps,
  DispatchProps { }

interface State extends
  OpenModalState {
  emails: string[];
  email: string;
}

// This feature will be implemented in the next version
export class Recommendations extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openModal: false,
      showSnackbar: false,
      emails: [],
      email: ''
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.props.fetchReferences();
  }

  public addEmail = async (): Promise<void> => {
    if (this.state.email) {
      await this.props.requestReference(this.state.email);
      this.resetState();
      await this.props.fetchReferences();
    }
  }

  public resetState(): void {
    this.setState({
      email: '',
    });
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  public sendRequestReference = () => {
    this.props.requestReference(this.state.email);
  }

  public closeSnackbar = () => this.setState({ showSnackbar: false });

  render(): JSX.Element {
    const nabiStarts = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-stars.png';
    const selectedEmail: any = this.props.references.map((email, i) => (
      <SelectedEmail
        key={i}
        email={email}
      />
    ));
    const error = this.props.errorFetchReferences || this.props.errorRequestReferences;
    return (
      <div>
        <Grid
          container={true}
          spacing={1}
          alignItems="flex-start"
          direction="row"
          justify="center"
          className="nabi-margin-center"
        >
          <Grid item={true} xs={12} md={2} className="nabi-text-center">
            <img
              className="recommendations-img"
              src={nabiStarts}
              alt="nabi stars"
            />
          </Grid>
          <Grid item={true} xs={12} md={10}>
            <p className="nabi-font-large">{title}</p>
            <p className="recommendations-message">{message}</p>
            {selectedEmail}
            <Grid
              container={true}
              spacing={1}
              alignItems="center"
              className="nabi-modal-email-field nabi-margin-right-xsmall"
            >
              <Grid item={true} xs={12} sm={8} md={8}>
                <TextField
                  fullWidth={true}
                  id={RecommendationsModalComponent.emailId}
                  name={RecommendationsModalComponent.emailName}
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder={RecommendationsModalComponent.reviewPlaceholder}
                  required={true}
                />
              </Grid>

              <Grid item={true} xs={12} sm={4} md={4}>
                {this.props.isFetchingReference || this.props.isRequestingReference ?
                  <CircularProgress /> :
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.addEmail}
                  >
                    {RecommendationsModalComponent.Text.AddButton}
                  </Button>
                }
              </Grid>
            </Grid>
            {error && <Typography color="error">{error}</Typography>}
          </Grid>
        </Grid>
        <StepperButtons
          nextPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Screening}
          backPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Employment}
          icon={<ArrowForward />}
        />
        <SnackBar
          isOpen={!!this.props.message}
          message={RecommendationsModalComponent.requestReferenceSuccess}
          handleClose={this.closeSnackbar}
          variant="success"
          hideIcon={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user: {
      user
    },
    instructor: {
      instructor: {
        references
      },
      actions: {
        requestReference: {
          isRequesting: isRequestingReference,
          message: requestedReferenceMessage,
          error: errorRequestReferences

        },
        fetchReferences: {
          isRequesting: isFetchingReference,
          error: errorFetchReferences
        }
      }
    }
  } = state;
  return {
    user,
    message: requestedReferenceMessage,
    isRequestingReference,
    references: references || [],
    isFetchingReference,
    errorRequestReferences,
    errorFetchReferences
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  requestReference: (reference: string) => dispatch(requestReference(reference)),
  fetchReferences: () => dispatch(fetchReferences())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
