import moment from "moment";
import {
  Grid,
  Typography
} from '@material-ui/core';

interface Props {
  message: string;
  messageTime: string;
  sender: number;
}

export const ConversationItem = (props: Props) => (
  <li className={`convo-item ${props.sender === 1 ? "convo-item-selft" : "convo-item-other"}`}>
    <Typography >
      {props.message}
    </Typography>
    <Typography>
      {moment(props.messageTime, "h:mm").format("h:mmA")}
    </Typography>
  </li>
);
