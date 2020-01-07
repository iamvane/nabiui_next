import * as React from 'react';
import {
  Grid,
  IconButton
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

interface Props {
  deleteMusic: (MusicId: string | undefined) => void;
  addMusic: () => void;
  embedCode: any;
  id?: any;
  notEditable?: boolean;
}

const MusicAdded: React.StatelessComponent<Props> = props => {
  return (
    <Grid
      item={true}
      md={6}
      xs={12}
      className={`${props.notEditable ? '' : 'nabi-editable-item'} nabi-position-relative nabi-margin-bottom-xsmall`}
    >
      <Grid container={true}>
        <Grid item={true} xs={10} md={10}>
          <div>
            {props.embedCode}
          </div>
        </Grid>
        <Grid item={true} xs={2} md={2}>
          <div className="nabi-action-buttons nabi-position-absolute nabi-margin-left-xsmall">
            <IconButton
              color="primary"
              className="nabi-display-block nabi-margin-bottom-xsmall"
              aria-label="Delete"
              onClick={() => props.deleteMusic(props.id)}
            >
              <Delete />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="add"
              className="nabi-display-block"
              onClick={props.addMusic}
            >
              <Add />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MusicAdded;