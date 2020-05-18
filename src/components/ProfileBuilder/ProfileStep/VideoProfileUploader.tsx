import * as React from 'react';
import {
  Input,
  InputAdornment,
  Typography
} from '@material-ui/core';

import { VideoProfileUploaderComponent } from '../constants';

interface Props {}

const VideoProfileUploader = (props: Props) => {
  const videoProfileIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/video-profile.png';
  const [error, setError] = React.useState("");
  const [video, setVideo] = React.useState(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const resultEl = document.getElementById("meta");
    const file = event.target.files[0];
    const videoEl = document.createElement("video");
    videoEl.src = window.URL.createObjectURL(file);

    videoEl.onerror = () => {
      return setError(VideoProfileUploaderComponent.invalidFile);
    }

    videoEl.onloadedmetadata = event => {
      window.URL.revokeObjectURL(videoEl.src);
      console.log(window.URL.revokeObjectURL(videoEl.src))

      const { name, type } = file;
      const { videoWidth, videoHeight, duration } = videoEl;

      if (videoEl.duration < 20 || videoEl.duration > 60) {
        setError(VideoProfileUploaderComponent.videoDurationError);
        return;
      }

      setVideo(videoEl.src)
      console.log(videoEl.src);
      console.log(file)
    }
  };

  return (
    <>
      <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-margin-top-small">Upload Video Profile</p>
      <p>Introduce yourself to parents and students with a 30-60 seconds video</p>
      <Input
        id="standard-adornment-weight"
        value={""}
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
      { error && <Typography className="nabi-margin-top-xsmall" color="error">{error}</Typography> }
      {video &&
        <video id="test_video_player">
          <source src={video} type="video/mp4" />
        </video>
      }
    </>
  );
};

export default VideoProfileUploader;
