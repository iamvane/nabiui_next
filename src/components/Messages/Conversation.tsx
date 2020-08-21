import * as React from 'react';
import moment from "moment";
import {
  Grid,
  Typography
} from '@material-ui/core';

import { ConversationItem } from './ConversationItem';

interface ConversationType {
  date: string;
  messages: {
    sender: number;
    message: string;
  }[];
}

export const Conversation = (props: ConversationType) => (
  <Grid container={true}>
    <Typography>{props.date}</Typography>
    {
      props.messages.map((item, i) => 
        <ConversationItem message={item.message} messageTime={props.date} />
      )
    }
  </Grid>
);
