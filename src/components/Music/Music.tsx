import * as React from 'react';

import {
  Button,
  Grid,
  Icon,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import SnackBar from '../common/SnackBar';
import MusicAdded from './MusicAdded';
import MusicForm from './MusicForm';
import { MusicComponent } from './constants';

interface Props {
  deleteMusic: (MusicId: string | undefined) => void;
  handleChange: (event: React.FormEvent<{}>) => void;
  addMusic: (event: React.FormEvent<{}>) => void;
  toggleMusicForm: () => void;
  clearError: () => void;
  handleCancel: () => void;
  embedCode: string;
  typeOfEmbedCode: string;
  music: string[];
  errorMessage: string;
  showMusicForm: boolean;
}

/**
 * Music
 */
const Music: React.StatelessComponent<Props> = props => {
  const renderMusicForm = (): JSX.Element => (
    <div>
      <SectionTitle text={MusicComponent.Text.AddMusic} />
      <MusicForm
        handleChange={props.handleChange}
        handleCancel={props.handleCancel}
        addMusic={props.addMusic}
        embedCode={props.embedCode}
        typeOfEmbedCode={props.typeOfEmbedCode}
      />
    </div>
  );

  const musicAdded = props.music.map((music, i) => (
    <MusicAdded
      key={i}
      deleteMusic={(id: string) => props.deleteMusic(id)}
      addMusic={props.toggleMusicForm}
      // tslint:disable-next-line
      embedCode={<iframe width="100%" height="200" src={music} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>}
    />
  ));

  return (
    <div>
      {!props.showMusicForm ?
        <div>
          <SectionTitle text={MusicComponent.Text.YourMusic} />
          <Typography className="nabi-margin-top-xsmall">
            {MusicComponent.Text.ShareYourMusic}
          </Typography>
          <Grid className="nabi-margin-top-small" container={true}>
            {musicAdded}
          </Grid>
          <div className="nabi-margin-top-medium">
            <Button color="primary" variant="contained" onClick={props.toggleMusicForm}>
              <Icon className="nabi-margin-right-xsmall">add</Icon>
              {MusicComponent.Text.AddMusic}
            </Button>
          </div>
        </div>
      : renderMusicForm()}
      <SnackBar
        isOpen={!!props.errorMessage}
        message={props.errorMessage}
        handleClose={props.clearError}
        variant="error"
      />
    </div>
  );
};

export default Music;