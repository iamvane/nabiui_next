import * as React from 'react';
import {
  Input,
  InputAdornment,
  Typography
} from '@material-ui/core';

import { VideoProfileUploaderComponent } from '../constants';
interface Props {
  // originalImage?: string;
  // imageChanged( avatar: string ): void;
}

const VideoProfileUploader = (props: Props) => {
  const videoProfileIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/video-profile.png';
  const [error, setError] = React.useState("");
  const [video, setVideo] = React.useState(undefined);

  // const fileUpload = document.getElementById("video-upload");

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

      const { name, type } = file;
      const { videoWidth, videoHeight, duration } = videoEl;

      if (videoEl.duration < 20 || videoEl.duration > 60) {
        setError(VideoProfileUploaderComponent.videoDurationError);
        return;
      }
    }
    console.log(videoEl);
    setVideo(window.URL.revokeObjectURL(videoEl.src));
    
    // If there's an error, most likely because the file
    // is not a video, display an error.

  };

  return (
    <>
      <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-margin-top-small">Upload Video Profile</p>
      <p>Introduce yourself to parents and students with a 30-60 seconds video</p>
      {/* <div id="auto_select_vid" className="button">Detect Video Info</div> */}
      {/* <img
        src={videoProfileIcon}
        className="nabi-custom-button-icon lazyload"
        alt="upload-video-profile"
      /> */}
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
      {/* <input type="file" id="select_video" /> */}
      {video ? video : ''}
      <video id="test_video_player">
        <source src="mov_bbb.mp4" type="video/mp4" />
      </video>
    </>
  );
};

export default VideoProfileUploader;
