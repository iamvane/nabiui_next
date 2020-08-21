import moment from "moment";
import {
  Grid,
  Typography
} from '@material-ui/core';

import { ContactItemComponent } from './constants';

interface Props {
  message: string;
  messageTime: string;
}

export const ConversationItem = (props: Props) => (
  <Grid item={true} xs={8}>
    <Typography >
      {props.message}
    </Typography>
    <Typography>
      {moment(props.message, "h:mm").format("h:mmA")}
    </Typography>
  </Grid>
);
