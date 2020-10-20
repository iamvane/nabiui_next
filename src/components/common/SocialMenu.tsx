import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';

import { SocialLinks } from './constants/Routes';

const SocialMenu = () => {
  const FacebookIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/facebook.svg';
  const TwitterIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/twitter.svg';
  const InstagramIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/instagram.svg';
  const PinterestIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/pinterest.png';
  const LinkedInIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/linkedin.png';

  return (
    <div>
      <IconButton
        color="primary"
        href={SocialLinks.Facebook}
        target="_blank"
        rel="noreferrer"
      >
        <img
          data-src={FacebookIcon}
          className="nabi-custom-button-icon lazyload"
          alt="facebook-icon"
        />
      </IconButton>

      <IconButton
        color="primary"
        className="nabi-margin-left-xsmall"
        href={SocialLinks.Twitter}
        target="_blank"
        rel="noreferrer"
      >
        <img
          data-src={TwitterIcon}
          className="nabi-custom-button-icon lazyload"
          alt="twitter-icon"
        />
      </IconButton>

      <IconButton
        color="primary"
        className="nabi-margin-left-xsmall"
        href={SocialLinks.Instagram}
        target="_blank"
        rel="noreferrer"
      >
        <img
          data-src={InstagramIcon}
          className="nabi-custom-button-icon lazyload"
          alt="instagram-icon"
        />
      </IconButton>

      <IconButton
        color="primary"
        className="nabi-margin-left-xsmall"
        href={SocialLinks.Pinterest}
        target="_blank"
        rel="noreferrer"
      >
        <img
          data-src={PinterestIcon}
          className="nabi-custom-button-icon lazyload"
          alt="pinterest-icon"
        />
      </IconButton>
      <IconButton
        color="primary"
        className="nabi-margin-left-xsmall"
        href={SocialLinks.LinkedIn}
        target="_blank"
        rel="noreferrer"
      >
        <img
          data-src={LinkedInIcon}
          className="nabi-custom-button-icon lazyload"
          alt="pinterest-icon"
        />
      </IconButton>
    </div>
  );
};

export default SocialMenu;
