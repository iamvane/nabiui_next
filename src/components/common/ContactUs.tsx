import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import PageTitle from './PageTitle';
import * as constants from './constants/ContactUs';

interface Props {}

export const ContacUs: React.StatelessComponent<Props> = (props: Props) =>  {
  return (
    <div className="nabi-container">
      <PageTitle pageTitle={constants.pageTitle} />
      <div className="nabi-background-white nabi-section nabi-text-center">
        <Typography>Chat with us using the chat widget at the bottom right corner of the page</Typography>
        <Typography>or email us at:</Typography>
        <Typography><a href="mailto:info@nabimusic.com">info@nabimusic.com</a></Typography>
      </div>
    </div>
  );
};

export default ContacUs;