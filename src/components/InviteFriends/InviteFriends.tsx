import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');

import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';
import { sendReferralInvite } from '../../redux/actions/UserActions';
import { track } from '../../utils/analytics';
import { ValidatorState as InviteFriendsValidatorState } from '../../utils/Validator';
import { Routes } from '../common/constants/Routes';
import SectionTitle from '../common/SectionTitle';
import { InviteFriendsComponent } from '../InviteFriends/constants';
import {
  fields,
  validateField
} from '../InviteFriends/InviteFriendsValidator';

import { Role } from '../Auth/Registration/constants';
import SnackBar from '../common/SnackBar';

interface DispatchProps {
  sendReferralInvite: (email: string) => void;
}

interface OwnProps {
}

interface StateProps {
  user: UserType;
  isRequestingInvite: boolean;
  inviteError: string;
  inviteMessage: string;
}

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps { }

interface State extends InviteFriendsValidatorState {
  showSnackbar: boolean;
  emailIsFilled: boolean;
  showInviteSnackbar: boolean;
  isSendingInvite: boolean;
  email: string;
  fields: any;
  [x: string]: any;
}
export class InviteFriends extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSnackbar: false,
      isSendingInvite: false,
      showInviteSnackbar: false,
      emailIsFilled: false,
      email: '',
      fields: fields
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.showSnackbar) {
      setTimeout(() => { this.setState(() => ({showSnackbar: false})); }, 2000);
    }
    if (prevProps.inviteError !== this.props.inviteError) {
      this.setState({
        showInviteSnackbar: this.props.inviteError ? true : false
      });
    }
    if (prevProps.inviteMessage !== this.props.inviteMessage) {
      this.setState({
        showInviteSnackbar: this.props.inviteMessage ? true : false
      });
    }
  }

  public handleSubmit = async(event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    const {
      email
    } = this.state;
    await this.props.sendReferralInvite(email.trim().toLocaleLowerCase());
    if (!this.props.inviteError) {
      const analiticsProps = {
        userId: this.props.user.email,
        properties: {
          referrer: document.referrer
        }
      };
      track('Invited friend', analiticsProps);
    }
    this.setState({email: ''});
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const target = event.currentTarget;
    const name = target.name;
    const value = target.value;

    this.setState({ ...this.state, [name]: value }, () => {
      validateField(this.state, name);
      this.setState({
        ...this.state,
        emailIsFilled: this.confirmEmailFieldIsFilled(this.state)
      });
    });
  }

  public handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    this.setState({ ...this.state, [name]: value }, () => {
      validateField(this.state, name);
      this.setState({
        ...this.state,
        emailIsFilled: this.confirmEmailFieldIsFilled(this.state)
      });
    });
  }

  public confirmEmailFieldIsFilled = (educationState: State) => {
    return educationState.fields.email.error.length === 0;
  }

  public copyInviteLink = () => {
    let inviteLink = document.getElementById(InviteFriendsComponent.ids.copyLink);
    if (inviteLink) {
      (inviteLink as HTMLInputElement).select();
      (inviteLink as HTMLInputElement).setSelectionRange(0, 99999);
      document.execCommand('copy');
      this.setState({ showSnackbar: true});
    }
  }

  public closeSnackbar = () => this.setState({ showSnackbar: false});
  public closeInviteSnackBar = () => this.setState({ showInviteSnackbar: false });

  public render (): JSX.Element {
    const {
      FieldKey,
      fieldNames
    } = InviteFriendsComponent;
    const instructorDescription = reactStringReplace(
      InviteFriendsComponent.ctaDescriptionInstructor,
      InviteFriendsComponent.termsPlaceholder,
      (i: number) => (
        <Link href={Routes.TermsOfUse} key={i}><a>{InviteFriendsComponent.termsText}</a></Link>
      )
    );

    const studentDescription = reactStringReplace(
      InviteFriendsComponent.ctaDescriptionStudent,
      InviteFriendsComponent.termsPlaceholder,
      (i: number) => (
        <Link href={Routes.TermsOfUse} key={i}><a>{InviteFriendsComponent.termsText}</a></Link>
      )
    );

    return (
      <div className="nabi-margin-top-large">
        <SectionTitle text={InviteFriendsComponent.sectionTitle} />

        <Typography className="nabi-margin-top-small nabi-margin-bottom-small nabi-text-semibold">
          {InviteFriendsComponent.ctaTitle}
        </Typography>

        <Grid item={true} md={10}>
          <Typography className="nabi-margin-top-xsmall">
            {this.props.user.role === Role.instructor ?
              instructorDescription :
              studentDescription
            }
          </Typography>
        </Grid>

        <Grid container={true} spacing={2}>
          <Grid item={true} md={7} container={true}>
            <TextField
              id={InviteFriendsComponent.ids[FieldKey.Email]}
              name={fieldNames[FieldKey.Email]}
              placeholder={InviteFriendsComponent.placeholder}
              required={true}
              fullWidth={true}
              onChange={this.handleChange}
              onBlur={this.handleOnBlur}
              helperText={this.state.fields.email.error}
              error={!!this.state.fields.email.error}
              value={this.state.email}
            />
          </Grid>
          <Grid item={true} md={3} container={true}>
            <Button
              color="primary"
              variant="contained"
              className="nabi-text-uppercase nabi-margin-top-xsmall"
              onClick={this.handleSubmit}
              disabled={!this.state.emailIsFilled ? true : false}
            >
              {
                this.props.isRequestingInvite ? <CircularProgress color="inherit" size={25} /> :
                InviteFriendsComponent.inviteButton}
            </Button>
          </Grid>
          <Grid item={true} md={12}>
            <Typography className="nabi-margin-top-large nabi-margin-bottom-xsmall nabi-text-mediumbold">
              {InviteFriendsComponent.fieldLabel}
            </Typography>
          </Grid>
          <Grid item={true} md={7} container={true}>
            <TextField
              id={InviteFriendsComponent.ids[FieldKey.CopyLink]}
              name={InviteFriendsComponent.fieldNames[FieldKey.CopyLink]}
              placeholder={InviteFriendsComponent.placeholder}
              required={true}
              fullWidth={true}
              value={`http://www.nabimusic.com/registration?token=${this.props.user.referralToken}`}
              autoFocus={true}
            />
          </Grid>
          <Grid item={true} md={3} container={true}>
            <Button onClick={this.copyInviteLink} color="primary">{InviteFriendsComponent.copyLink}</Button>
          </Grid>
        </Grid>
        <SnackBar
          isOpen={this.state.showSnackbar}
          message={InviteFriendsComponent.copiedMessage}
          handleClose={this.closeSnackbar}
          variant="success"
        />
        <SnackBar
          isOpen={this.state.showInviteSnackbar}
          message={
            this.props.inviteError ?
            this.props.inviteError :
            this.props.inviteMessage as string
          }
          handleClose={this.closeInviteSnackBar}
          variant={this.props.inviteError ? 'error' : 'success'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    user,
    actions: {
      referralInvite: {
        isRequesting: isRequestingInvite,
        error: inviteError,
        message: inviteMessage
      }
    },
  } = state.user;

  return {
    user,
    isRequestingInvite,
    inviteError,
    inviteMessage,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  sendReferralInvite: (email: string) => dispatch(sendReferralInvite(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriends);