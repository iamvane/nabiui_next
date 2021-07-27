import React from "react";
import Head from 'next/head';

//import '../../../assets/scss/VettingProcess.scss';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
export { title } from './constants';

export const VettingProcess = () => {
  return (
    <div className="nabi-container nabi-margin-bottom-medium">
       <Head>
        <title>{pageTitlesAndDescriptions.vettingProcess.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.vettingProcess.description}></meta>
      </Head>
      <p className="vetting-process-title nabi-color-nabi nabi-text-center nabi-text-extrabold nabi-margin-top-small nabi-margin-bottom-small">Child safety is serious for us.</p>
      <img
        className="nabi-background-white nabi-full-width"
        alt="nabi-music-vetting-process"
        src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/vetting-process-nabi-music-lessons.jpg" 
      />
    </div>
  )
}
