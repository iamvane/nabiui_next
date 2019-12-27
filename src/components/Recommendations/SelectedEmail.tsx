import * as React from 'react';
import {
  ListItem,
  Typography
} from '@material-ui/core';

interface Props {
  email: string;
}

const SelectedEmail: React.StatelessComponent<Props> = props => {
  return (
    <div>
      <ListItem>
        <Typography>
          - {props.email}
        </Typography>
      </ListItem>
    </div>
  );
};

export default SelectedEmail;
