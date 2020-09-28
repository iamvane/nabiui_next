import * as React from 'react';
import moment from "moment";
import {
  Grid,
  Typography
} from '@material-ui/core';

import { ConversationItem } from './ConversationItem';

interface ConversationType {
  currentUser: string;
  chats: {
    content: string;
    timestamp: string;
    uid: string;
  }[];
}

export const Conversation = (props: ConversationType) => {
  return(
    <div>
      <div className="nabi-border-radius nabi-margin-top-small">
        {/* <Typography className="nabi-text-center">
          <span>{moment(props.date).format('LLLL')}</span>
        </Typography> */}
      </div>
      <ol></ol>
      {
        props.chats && (
          props.chats.length < 1 ? "There are no messages":
            <ol className="nabi-padding-remove">
              {props.chats.map((item, i) => 
                <ConversationItem message={item.content} messageTime={moment(item.timestamp).format("LT")} sender={props.currentUser === item.uid ? "self" : "other"} />
              )}
            </ol>
        )}
    </div>
  )
}
