import React from "react";

import '../../../assets/scss/VettingProcess.scss';
export { title } from './constants';

export const VettingProcess = () => {
  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <p className="vetting-process-title nabi-color-nabi nabi-text-center nabi-text-extrabold nabi-margin-top-small nabi-margin-bottom-small">Child safety is serious for us.</p>
      <img className="nabi-background-white nabi-full-width" src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/vetting-process-nabi-music-lessons.png" />
    </div>
  )
}
