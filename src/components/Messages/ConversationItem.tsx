import moment from "moment";
import {
  Grid,
  Typography
} from '@material-ui/core';
import '../../../assets/scss/ConversationItem.scss';

interface Props {
  message: string;
  messageTime: string;
  sender: string;
}

export const ConversationItem = (props: Props) => (
  <li className={`convo-item nabi-margin-bottom-small nabi-border-radius nabi-padding-xsmall ${props.sender === "self" ? "convo-item-self" : "convo-item-other"}`}>
    <Typography className="nabi-color-white">
      {props.message}
    </Typography>
    <Typography className="nabi-text-right nabi-color-white">
      {moment(props.messageTime, "h:mm").format("h:mmA")}
    </Typography>
  </li>
);
