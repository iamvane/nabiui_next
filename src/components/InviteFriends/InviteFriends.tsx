import * as React from "react";
import { connect } from "react-redux";
import { Action, 
//  Dispatch 
} from "redux";
import {
  Dispatch,
  ThunkAction
} from 'redux-fixed';

import Link from "next/link";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton
} from "react-share";
import { FacebookProvider } from "react-facebook";

const reactStringReplace = require("react-string-replace");

import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress
} from "@material-ui/core";

import { StoreState } from "../../redux/reducers/store";
import { UserType } from "../../redux/models/UserModel";
import { sendReferralInvite } from "../../redux/actions/UserActions";
import { track } from "../../utils/analytics";
import { ValidatorState as InviteFriendsValidatorState } from "../../utils/Validator";
import { Routes } from "../common/constants/Routes";
import SectionTitle from "../common/SectionTitle";
import { InviteFriendsComponent } from "../InviteFriends/constants";
import { fields, validateField } from "../InviteFriends/InviteFriendsValidator";

import { Role } from "../Auth/Registration/constants";
import SnackBar from "../common/SnackBar";

interface DispatchProps {
  sendReferralInvite: (email: string) => void;
}

interface OwnProps {}

interface StateProps {
  user: UserType;
  isRequestingInvite: boolean;
  inviteError: string;
  inviteMessage: string;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

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
      email: "",
      fields: fields
    };
  }

  public delayedAction = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    const { email } = this.state;
    await this.props.sendReferralInvite(email.trim().toLocaleLowerCase());
    if (!this.props.inviteError) {
      const analiticsProps = {
        userId: this.props.user.email,
        properties: {
          referrer: document.referrer
        }
      };
      track("Invited friend", analiticsProps);
      this.setState({
        showInviteSnackbar: true
      });
    } else {
      this.setState({
        showInviteSnackbar: true
      });
    }
    this.delayedAction(2000).then(() => this.setState(() => ({ showInviteSnackbar: false })));
    this.setState({ email: "" });
  };

  public handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
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
  };

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
  };

  public confirmEmailFieldIsFilled = (educationState: State) => {
    return educationState.fields.email.error.length === 0;
  };

  public copyInviteLink = () => {
    let inviteLink = document.getElementById(
      InviteFriendsComponent.ids.copyLink
    );
    if (inviteLink) {
      (inviteLink as HTMLInputElement).select();
      (inviteLink as HTMLInputElement).setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.setState({ showSnackbar: true });
      this.delayedAction(2000).then(() => this.setState(() => ({ showSnackbar: false })));
    }
  };

  public closeSnackbar = () => this.setState({ showSnackbar: false });
  public closeInviteSnackBar = () =>
    this.setState({ showInviteSnackbar: false });

  public render(): JSX.Element {
    const { FieldKey, fieldNames } = InviteFriendsComponent;
    const instructorDescription = reactStringReplace(
      InviteFriendsComponent.ctaDescriptionInstructor,
      InviteFriendsComponent.termsPlaceholder,
      (i: number) => (
        <Link href={Routes.TermsOfUse} key={i}>
          <a>{InviteFriendsComponent.termsText}</a>
        </Link>
      )
    );

    const studentDescription = reactStringReplace(
      InviteFriendsComponent.ctaDescriptionStudent,
      InviteFriendsComponent.termsPlaceholder,
      (i: number) => (
        <Link href={Routes.TermsOfUse} key={i}>
          <a>{InviteFriendsComponent.termsText}</a>
        </Link>
      )
    );

    const uri = `${InviteFriendsComponent.referralUrl}${this.props.user.referralToken}`;

    const encodeUrl = encodeURI(uri);

    const shareLinkDesktop =
      "http://www.facebook.com/dialog/send?app_id=148582506595325&link=" +
      InviteFriendsComponent.referralUrl +
      this.props.user.referralToken +
      "&redirect_uri=https://www.nabimusic.com/";
    const shareLinkMobile =
      "fb-messenger://share/?link=" + encodeUrl + "&&app_id=148582506595325";

    return (
      <React.Fragment>
        <SectionTitle text={InviteFriendsComponent.sectionTitle} />

        <div>
          <img
            className="nabi-full-width"
            src="https://nabimusic.s3.us-east-2.amazonaws.com/referral-design-nabi-music.jpg"
            alt="Refer a friend and earn five dollars"
          />
        </div>
        <Typography
          color="secondary"
          className="nabi-margin-top-small nabi-text-uppercase nabi-margin-bottom-small nabi-text-semibold nabi-text-center"
        >
          {InviteFriendsComponent.referAndEarn}
        </Typography>
        <Grid item={true}>
          <Typography className="nabi-margin-top-xsmall">
            {this.props.user.role === Role.instructor
              ? instructorDescription
              : studentDescription}
          </Typography>
        </Grid>
        <Typography
          color="secondary"
          className="nabi-margin-top-small nabi-text-uppercase nabi-margin-bottom-xsmall nabi-text-mediumbold nabi-text-center"
        >
          {InviteFriendsComponent.shareNow}
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          className="nabi-margin-bottom-small nabi-text-center"
        >
          <Grid xs={2}>
            <EmailShareButton
              subject={InviteFriendsComponent.referralEmailSubjectLine}
              separator=" "
              body={InviteFriendsComponent.referralEmailMessage}
              children={
                <img
                  className="nabi-img-icon-size"
                  src="https://nabimusic.s3.us-east-2.amazonaws.com/mail.png"
                  alt="Refer by email"
                />
              }
              url={`${InviteFriendsComponent.referralUrl}${this.props.user.referralToken}`}
            />
          </Grid>
          <Grid xs={2}>
            <TwitterShareButton
              title={InviteFriendsComponent.referralMessage}
              children={
                <img
                  className="nabi-img-icon-size"
                  src="https://nabimusic.s3.us-east-2.amazonaws.com/twitter.png"
                  alt="Refer using Twitter"
                />
              }
              url={`${InviteFriendsComponent.referralUrl}${this.props.user.referralToken}`}
            />
          </Grid>
          <Grid xs={2}>
            <FacebookShareButton
              quote={`${InviteFriendsComponent.referralMessage}${" "}${
                InviteFriendsComponent.referralUrl
              }${this.props.user.referralToken}`}
              children={
                <img
                  className="nabi-img-icon-size"
                  src="https://nabimusic.s3.us-east-2.amazonaws.com/facebook.png"
                  alt="Refer using Facebook"
                />
              }
              url={`${InviteFriendsComponent.referralUrl}`}
            />
          </Grid>
          <Grid xs={2}>
            <WhatsappShareButton
              title={InviteFriendsComponent.referralMessage}
              separator=" "
              children={
                <img
                  className="nabi-img-icon-size"
                  src="https://nabimusic.s3.us-east-2.amazonaws.com/whatsapp.png"
                  alt="Refer through Whatsapp"
                />
              }
              url={`${InviteFriendsComponent.referralUrl}${this.props.user.referralToken}`}
            />
          </Grid>
          <Grid xs={2}>
            <FacebookProvider appId="148582506595325">
              <a
                target="_blank"
                href={shareLinkDesktop}
                className="hide-on-mobile"
              >
                <img
                  className="nabi-img-icon-size"
                  src="https://nabimusic.s3.us-east-2.amazonaws.com/messenger.png"
                  alt="Refer through Messenger"
                />
              </a>
              <a
                target="_blank"
                href={shareLinkMobile}
                className="hide-on-desktop"
              >
                <img
                  className="nabi-img-icon-size"
                  src="https://nabimusic.s3.us-east-2.amazonaws.com/messenger.png"
                  alt="Refer through Messenger"
                />
              </a>
            </FacebookProvider>
          </Grid>
        </Grid>

        <Typography
          className="nabi-margin-top-medium nabi-margin-bottom-xsmall nabi-text-mediumbold nabi-text-center"
        >
          {InviteFriendsComponent.copyLinkText}
        </Typography>
        <Typography className="nabi-margin-top-xsmall nabi-text-center referral-token">
          {InviteFriendsComponent.referralUrl}{this.props.user.referralToken}
        </Typography>

        <Grid container={true}>
          <Grid className="nabi-display-flex nabi-margin-center" xs={4}>
            <Button onClick={this.copyInviteLink} color="primary">
              {InviteFriendsComponent.copyLinkButton}
            </Button>
            <Grid item xs={2}>
              <div onClick={this.copyInviteLink}>
                <img
                  className="nabi-img-icon-size"
                  src="https://nabimusic.s3.us-east-2.amazonaws.com/copy.png"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Typography
          className="nabi-margin-bottom-xsmall nabi-margin-top-medium nabi-text-mediumbold nabi-text-center"
        >
          {InviteFriendsComponent.emailInviteText}
        </Typography>
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
        <Button
          color="primary"
          variant="contained"
          className="nabi-text-uppercase nabi-margin-top-xsmall nabi-full-width"
          onClick={this.handleSubmit}
        >
          {this.props.isRequestingInvite ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            InviteFriendsComponent.inviteButton
          )}
        </Button>
        <TextField
          id={InviteFriendsComponent.ids[FieldKey.CopyLink]}
          className="nabi-display-none"
          name={InviteFriendsComponent.fieldNames[FieldKey.CopyLink]}
          placeholder={InviteFriendsComponent.placeholder}
          required={true}
          fullWidth={true}
          value={`http://www.nabimusic.com/registration?token=${this.props.user.referralToken}`}
          autoFocus={true}
        />
        <SnackBar
          isOpen={this.state.showSnackbar}
          message={InviteFriendsComponent.copiedMessage}
          handleClose={this.closeSnackbar}
          variant="success"
        />
        <SnackBar
          isOpen={this.state.showInviteSnackbar}
          message={
            this.props.inviteError
              ? this.props.inviteError
              : (this.props.inviteMessage as string)
          }
          handleClose={this.closeInviteSnackBar}
          variant={this.props.inviteError ? "error" : "success"}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (
  state: StoreState,
  _ownProps: OwnProps
): StateProps => {
  const {
    user,
    actions: {
      referralInvite: {
        isRequesting: isRequestingInvite,
        error: inviteError,
        message: inviteMessage
      }
    }
  } = state.user;

  return {
    user,
    isRequestingInvite,
    inviteError,
    inviteMessage
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  sendReferralInvite: (email: string) => dispatch(sendReferralInvite(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriends);
