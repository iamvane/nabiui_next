import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
const reactStringReplace = require('react-string-replace');

import {
  Typography,
  Grid,
  Button,
  TextField,
  Divider,
  Box,
  CircularProgress
} from "@material-ui/core";
import {
  ZoomMissingLinkSetup,
  textReplace,
  firstBoldText,
  secondBoldText,
  number
} from "./constants";

import {
  buildProfile,
} from '../../redux/actions/InstructorActions';
import { StoreState } from '../../redux/reducers/store';

import SnackBar from '../common/SnackBar';
import PageTitle from '../common/PageTitle';

export interface Props {
  handleCancel?: () => void;
}

export function ZoomSetup(props: Props) {
  const [zoomLink, setZoomLink] = React.useState('');
  const [snackbarIsOpen, setSnackbarOpen] = React.useState({
    status: false,
    type: "",
    message: ""
  });

  const renderZoomSignupText = () => {
    let zoomSignupText = reactStringReplace(
      ZoomMissingLinkSetup.SignupZoom,
      number,
      (i: number) => {
        return <Typography key={i} className="nabi-margin-right-small" color="primary">1.</Typography>
      }
    );
    zoomSignupText = reactStringReplace(
      zoomSignupText,
      textReplace,
      (i: number) => {
        return <a className="nabi-margin-right-xsmall" key={i} href={ZoomMissingLinkSetup.SignupUrl}>Sign up</a>
      }
    );
    return (
      <div className="nabi-display-flex">
        {zoomSignupText}
      </div>
    );
  }

  const renderGotoProfileText = () => {
    let gotoProfile = reactStringReplace(
      ZoomMissingLinkSetup.GoToZoomProfile,
      number,
      (i: number) => {
        return <Typography key={i} className="nabi-margin-right-small" color="primary">2.</Typography>
      }
    );
    gotoProfile = reactStringReplace(
      gotoProfile,
      firstBoldText,
      (i: number) => {
        return <span key={i} className="nabi-margin-left-xsmall nabi-margin-right-xsmall nabi-text-extrabold">Profile</span>
      }
    );
    gotoProfile = reactStringReplace(
      gotoProfile,
      secondBoldText,
      (i: number) => {
        return <span key={i} className="nabi-margin-left-xsmall nabi-margin-right-xsmall nabi-text-extrabold">Personal Meeting Id</span>
      }
    );

    return (
      <div className="nabi-display-flex">
        {gotoProfile}
      </div>
    );
  }

  const renderPersonIdText = () => {
    let personalIdText = reactStringReplace(
      ZoomMissingLinkSetup.PastePersonalId,
      number,
      (i: number) => {
        return <Typography key={i} className="nabi-margin-right-small" color="primary">3.</Typography>
      }
    );

    personalIdText = reactStringReplace(
      personalIdText,
      textReplace,
      (i: number) => {
        return <span key={i} className="nabi-margin-left-xsmall nabi-margin-right-xsmall nabi-text-extrabold">Personal Meeting Id</span>
      }
    );

    return (
      <div className="nabi-display-flex nabi-flex-wrap nabi-margin-top-small">
        {personalIdText}
      </div>
    );
  }

  const handleChange = React.useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const target = event.currentTarget;
    let value = target.value as any;
    let name = target.name;
    if (name === 'zoomLink') {
      setZoomLink(value);
    }
  }, [zoomLink]);

  const dispatch = useDispatch();
  const buildProfileAction = bindActionCreators(buildProfile, dispatch);

  let {
    instructor,
    user,
    errorBuildProfile,
    isRequestingBuildProfile
  } = useSelector((state: StoreState) => {
    const {
      instructor,
      actions: {
        buildProfile: {
          isRequesting: isRequestingBuildProfile,
          error: errorBuildProfile
        }
      }
    } = state.instructor;

    return {
      instructor,
      user: state.user.user,
      isRequestingBuildProfile,
      errorBuildProfile,
    };
  });

  React.useEffect(() => {
    if (instructor.zoomLink) {
      setSnackbarOpen({
        status: true,
        message: "Zoom link updated successfully",
        type: "success"
      })
    }
  }, [instructor.zoomLink]);

  React.useEffect(() => {
    if (errorBuildProfile) {
      setSnackbarOpen({
        status: true,
        type: "error",
        message: errorBuildProfile
      })
    }
  }, [errorBuildProfile])

  const handleClick = () => {
    buildProfileAction({
      zoomLink
    });
  }

  const closeSnackbar = React.useCallback(() => {
    setSnackbarOpen({
      status: false,
      message: "",
      type: ""
    });
  }, [snackbarIsOpen])

  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md nabi-margin-bottom-large">
      <PageTitle pageTitle={ZoomMissingLinkSetup.Title} />
      <div className="nabi-display-flex nabi-flex-justify-center">
        <Grid
          container={true}
          className="nabi-background-white nabi-border-radius nabi-padding-small nabi-display-flex nabi-flex-justify-center"
        >
          <Grid item={true} md={10} xs={12} sm={10}>
            <Typography className="nabi-margin-top-xsmall" variant="body2">
              {ZoomMissingLinkSetup.ZoomId}
            </Typography>
          </Grid>
          <Grid item={true} md={10} xs={12} sm={10} className="nabi-display-flex nabi-flex-justify-center">
            <TextField
              onChange={handleChange}
              fullWidth={true}
              name={ZoomMissingLinkSetup.zoomLinkInputName}
            />
          </Grid>
          <Grid item={true} md={10} xs={12} sm={10} className="nabi-display-flex nabi-flex-justify-end">
            <Button
              variant="contained"
              color="primary"
              className="nabi-margin-top-small nabi-text-uppercase nabi-margin-left-small"
              onClick={handleClick}
            >
              {isRequestingBuildProfile ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                  <span className="nabi-margin-left-xsmall">{ZoomMissingLinkSetup.Save}</span>
                )}

            </Button>
          </Grid>

          <Grid item={true} md={10} xs={12} sm={10}>
            <Typography color="primary" className="nabi-text-mediumbold nabi-text-uppercase nabi-margin-top-large nabi-margin-bottom-xsmall">
              {ZoomMissingLinkSetup.HowToGetZoomLink}
            </Typography>
            <Divider className="nabi-margin-bottom-xsmall" />
          </Grid>
          <Grid item={true} md={10} xs={12} sm={10}>
            {renderZoomSignupText()}
            {renderGotoProfileText()}
            <img alt="Zoom Account" className="nabi-responsive-image" src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/setup-zoom-link.png" />
            {renderPersonIdText()}
            <Typography className="nabi-margin-left-small nabi-margin-top-small nabi-display-flex">
              {ZoomMissingLinkSetup.AlreadyHaveZoomAccount}
            </Typography>
          </Grid>
        </Grid>
        <SnackBar
          isOpen={snackbarIsOpen.status}
          message={snackbarIsOpen.message}
          handleClose={closeSnackbar}
          variant={snackbarIsOpen.type}
        />
      </div>
    </div>
  );
}
