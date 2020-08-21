import moment from "moment";
import {
  Avatar,
  Grid,
  Typography
} from '@material-ui/core';

import { ContactItemComponent } from './constants';

interface Props {
  avatar: string;
  name: string;
  lastMessage: string;
  lastMessageDate: string;
}

const getMessageDate = (date: string): string => {
  const reviewDate = new Date(date);
  const today = new Date();

  const end = moment(today);
  return end.to(reviewDate);
};

export const ContactItem = (props: Props) => (
  <Grid container={true}>
    <Grid item={true} xs={2}>
      <Avatar src={props.avatar} />
    </Grid>
    <Grid item={true} xs={10}>
      <Grid container={true}>
        <Grid item={true} xs={9}>
          <Typography><span className="nabi-text-mediumbold">{props.name}</span></Typography>
        </Grid>
        <Grid item={true} xs={3}>
          <Typography className="nabi-text-right">
            <span className="nabi-font-xsmall">
              {getMessageDate(props.lastMessageDate)}
            </span>
          </Typography>
        </Grid>
      </Grid>
      <Grid item={true} xs={12}>
        <Typography>
          {`${props.lastMessage.slice(
            0,
            ContactItemComponent.previewLength
          )}...`}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);
