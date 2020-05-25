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
const Done = dynamic(() => import('@material-ui/icons/Done'), {
  ssr: false,
});

import { uploadVideoProfile } from '../../../redux/actions/InstructorActions';
import { StoreState } from '../../../redux/reducers/store';
import SectionTitle from '../../common/SectionTitle';
import { VideoProfileUploaderComponent } from '../constants';

interface DispatchProps {
  uploadVideoProfile: (value: string) => void;
}

interface OwnProps {}

interface StateProps {
  isUploadingVideoProfile: boolean;
  uploadError: string;
  message: string;
  video: string;
}

interface Props extends
  OwnProps,
  DispatchProps,
  StateProps {}

const VideoProfileUploader = (props: Props) => {
  const videoProfileIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/video-profile.png';
  const [error, setError] = React.useState("");
  const [video, setVideo] = React.useState(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files[0];
    const videoEl = document.createElement("video");
    videoEl.src = window.URL.createObjectURL(file);

    videoEl.onerror = () => {
      return setError(VideoProfileUploaderComponent.invalidFile);
    }

    videoEl.onloadedmetadata = event => {
      window.URL.revokeObjectURL(videoEl.src);

      if (videoEl.duration < 20 || videoEl.duration > 60) {
        setError(VideoProfileUploaderComponent.videoDurationError);
        return;
      }

      setVideo(file)
    }
  };

  const uploadVideoProfile = (e) => {
    e.preventDefault();
    props.uploadVideoProfile(video);
  }

  return (
    <>
      <SectionTitle text={VideoProfileUploaderComponent.sectionTitle} />
      <Typography className="nabi-margin-bottom-small">{VideoProfileUploaderComponent.description}</Typography>
      {props.video || !props.message &&
        <>
          <IconButton color="primary" disabled={true}>
          <Done />
          </IconButton>
          <Typography className="nabi-display-inline-block nabi-margin-left-xsmall" color="primary">You currently have a video profile.</Typography>
        </>
      }
      {props.isUploadingVideoProfile ? <CircularProgress /> :
        props.message ?
        <>
          <IconButton color="primary" disabled={true}>
            <Done />
          </IconButton>
          <Typography className="nabi-display-inline-block nabi-margin-left-xsmall" color="primary">Video added successfully.</Typography>
        </>
       :
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
        <Button
          color="primary"
          variant="contained"
          onClick={uploadVideoProfile}
          className="nabi-text-uppercase nabi-display-block nabi-margin-top-xsmall"
          disabled={!!error || !video || !!props.uploadError}
        >
          {VideoProfileUploaderComponent.buttonText}
        </Button>
        {error && <Typography className="nabi-margin-top-xsmall" color="error">{error}</Typography> }
        {props.uploadError && <Typography className="nabi-margin-top-xsmall" color="error">{props.uploadError}</Typography> }
      </>
      }
    </>
  );
};

function mapStateToProps(state: StoreState): StateProps {
  const {
    instructor: {
      video
    },
    actions: {
      uploadVideoProfile: {
        isRequesting: isUploadingVideoProfile,
        error: uploadError,
        message
      }
    },
  } = state.instructor;

  return {
    isUploadingVideoProfile,
    uploadError,
    message,
    video
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  uploadVideoProfile: (value: string) => dispatch(uploadVideoProfile(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoProfileUploader);
