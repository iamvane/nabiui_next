import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '../../../assets/images/facebook.svg';
import TwitterIcon from '../../../assets/images/twitter.svg';
import InstagramIcon from '../../../assets/images/instagram.svg';
import PinterestIcon from '../../../assets/images/pinterest.png';

import { SocialLinks } from './constants/Routes';
const SocialMenu = () => {
  return (
    <div>
      <IconButton
        color="primary"
        href={SocialLinks.Facebook}
        target="_blank"
      >
        <img
         src={FacebookIcon}
         className="nabi-custom-button-icon"
         alt="facebook-icon"
        />
      </IconButton>

      <IconButton
        color="primary"
        className="nabi-margin-left-xsmall"
        href={SocialLinks.Twitter}
        target="_blank"
      >
        <img
         src={TwitterIcon}
         className="nabi-custom-button-icon"
         alt="twitter-icon"
        />
      </IconButton>

      <IconButton
        color="primary"
        className="nabi-margin-left-xsmall"
        href={SocialLinks.Instagram}
        target="_blank"
      >
        <img
         src={InstagramIcon}
         className="nabi-custom-button-icon"
         alt="instagram-icon"
        />
      </IconButton>

      <IconButton
        color="primary"
        className="nabi-margin-left-xsmall"
        href={SocialLinks.Pinterest}
        target="_blank"
      >
        <img
         src={PinterestIcon}
         className="nabi-custom-button-icon"
         alt="pinterest-icon"
        />
      </IconButton>
    </div>
  );
};

export default SocialMenu;
