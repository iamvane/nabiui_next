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
  <div>
    <div className="nabi-background-nabi nabi-border-radius nabi-margin-top-small">
      <Typography className="nabi-text-center">
        <span className="nabi-color-white">{moment(props.date).format('LLLL')}</span>
      </Typography>
    </div>
    <ol></ol>
    {
      props.messages.length < 1 ? "There are no messages":
      <ol>
        {props.messages.map((item, i) => 
          <ConversationItem message={item.message} messageTime={props.date} sender={item.sender} />
        )}
      </ol>
    }
  </div>
);
