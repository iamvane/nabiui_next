import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  CircularProgress
} from '@material-ui/core';
import dynamic from "next/dynamic";
const Visibility = dynamic(() => import('@material-ui/icons/Visibility'), {
  ssr: false,
});
const Done = dynamic(() => import('@material-ui/icons/Done'), {
  ssr: false,
});

import {
  uploadVideoProfile,
  signFile
} from '../../../redux/actions/InstructorActions';
import { StoreState } from '../../../redux/reducers/store';
import SectionTitle from '../../common/SectionTitle';
import VideoProfile from '../../VideoProfile/VideoProfile';
import SnackBar from '../../common/SnackBar';
import { VideoProfileUploaderComponent } from '../constants';
interface DispatchProps {
  uploadVideoProfile: (value: string) => void;
  signFile: (userId: number, fileName: string, fileType: string, file: File) => void;
}

interface OwnProps {}

interface StateProps {
  isUploadingVideoProfile: boolean;
  uploadError: string;
  uploadMessage: string;
  video: string;
  userId: number;
  signedFile: string;
  isSigning: boolean;
  signingError: string;
  saveMessage: string;
}

interface Props extends
  OwnProps,
  DispatchProps,
  StateProps {}

const VideoProfileUploader = (props: Props) => {
  const videoProfileIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/video-profile.png';
  const [error, setError] = React.useState("");
  const [video, setVideo] = React.useState(undefined);
  const [displayVideo, setDisplayVideo] =  React.useState(false);
  const [snackbar, setSnackbar] =  React.useState(false);
  const [snackbarMessage, setSnackbarMessage] =  React.useState("");

  React.useEffect(() => {
    if (props.uploadMessage) {
      props.uploadVideoProfile(props.signedFile);
    }
  }, [props.uploadMessage]);

  React.useEffect(() => {
    if (props.saveMessage) {
      setSnackbar(true);
      setSnackbarMessage("Video saved successfully.");
    }
  }, [props.saveMessage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files[0];
    const videoEl = document.createElement("video");
    videoEl.src = window.URL.createObjectURL(file);
    const { name, type } = file;

    videoEl.onerror = () => {
      return setError(VideoProfileUploaderComponent.invalidFile);
    }

    videoEl.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoEl.src);

      if (videoEl.duration < 20 || videoEl.duration > 60) {
        setError(VideoProfileUploaderComponent.videoDurationError);
        return;
      }
      props.signFile(props.userId, name, type, file);
      setVideo(file)
    }
  };

  return (
    <>
      <SectionTitle text={VideoProfileUploaderComponent.sectionTitle} />
      <Typography className="nabi-margin-bottom-small">{VideoProfileUploaderComponent.description}</Typography>
      {props.video &&
        <div className="nabi-margin-bottom-small nabi-cursor-pointer" onClick={() => setDisplayVideo(true)}>
          <IconButton color="primary" disabled={true}>
            <Visibility />
          </IconButton>
          <Typography className="nabi-display-inline-block nabi-margin-left-xsmall" color="primary">Preview current video profile.</Typography>
        </div>
      }

      {(props.isUploadingVideoProfile || props.isSigning) ? <CircularProgress /> :
      <>
        <Input
          id="standard-adornment-weight"
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <img
                src={videoProfileIcon}
                className="nabi-custom-button-icon lazyload nabi-margin-left-small"
                alt="upload-video-profile"
              />
            </InputAdornment>
          }
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            'aria-label': 'weight',
          }}
          type="file"
        />

        <VideoProfile
          isDialogOpen={displayVideo}
          closeHandler={() => setDisplayVideo(false)}
          video={props.video}
        />

        {error && <Typography className="nabi-margin-top-xsmall" color="error">{error}</Typography> }
        {props.uploadError && <Typography className="nabi-margin-top-xsmall" color="error">{props.uploadError}</Typography> }
        {props.signingError && <Typography className="nabi-margin-top-xsmall" color="error">{props.signingError}</Typography> }
        <SnackBar
          isOpen={snackbar}
          message={snackbarMessage}
          handleClose={() => setSnackbar(false)}
          variant="success"
        />
      </>
      }
    </>
  );
};

function mapStateToProps(state: StoreState): StateProps {
  const {
    instructor: {
      video,
      signedFile
    },
    actions: {
      uploadVideoProfile: {
        isRequesting: isUploadingVideoProfile,
        error: uploadError,
        message: saveMessage
      },
      signFile: {
        isRequesting: isSigning,
        error: signingError,
        message: uploadMessage
      }
    },
  } = state.instructor;
  const {
    id: userId
  } = state.user.user;

  return {
    isUploadingVideoProfile,
    uploadError,
    uploadMessage,
    video,
    userId,
    signedFile,
    isSigning,
    signingError,
    saveMessage
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  uploadVideoProfile: (value: string) => dispatch(uploadVideoProfile(value)),
  signFile: (userId: number, fileName: string, fileType: string, file: File) => dispatch(signFile(userId, fileName, fileType, file))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoProfileUploader);
