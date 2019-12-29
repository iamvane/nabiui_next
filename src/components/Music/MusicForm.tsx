import * as React from 'react';

import {
  Button,
  FormControl,
  Grid,
  Icon,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import AddMusicSteps from './AddMusicSteps';
import {
  musicOptions,
  MusicTypes,
  MusicFormComponent
} from './constants';

interface Props {
  handleChange: (event: React.FormEvent<{}>) => void;
  addMusic: (event: React.FormEvent<{}>) => void;
  handleCancel: () => void;
  embedCode: string;
  typeOfEmbedCode: string;
}

const MusicForm: React.StatelessComponent<Props> = props => {
  const SoundCloud1 = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/soundcloud-embed-1.png';
  const SoundCloud2 = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/soundcloud-embed-2.png';
  const SoundCloud3 = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/soundcloud-embed-3.png';
  const selectOptions: any = [];
  for (const [key, value] of Object.entries(musicOptions)) {
    selectOptions.push(<option key={key} value={value.value}>{value.label}</option>);
  }

  const findSoundCloudEmbedCodeSteps: JSX.Element = (
    <AddMusicSteps
      stepImages={[SoundCloud1, SoundCloud2, SoundCloud3]}
    />
  );

  const pasteText = props.typeOfEmbedCode === MusicTypes.soundCloud ?
  MusicFormComponent.Text.Paste : MusicFormComponent.Text.PasteYoutube;

  return (
    <form>
      <Grid container={true}>
        <Grid item={true} md={4} className="nabi-margin-bottom-small">
          <FormControl
            fullWidth={true}
          >
            <Select
              native={true}
              input={
                <Input
                  id={MusicFormComponent.Ids.TypeOfEmbedCode}
                  name={MusicFormComponent.FieldNames.TypeOfEmbedCode}
                />
              }
              onChange={props.handleChange}
              value={props.typeOfEmbedCode}
            >
              {selectOptions}
            </Select>
          </FormControl>
        </Grid>
        {props.typeOfEmbedCode === musicOptions.SoundCloud.value && findSoundCloudEmbedCodeSteps}
        <Grid item={true} xs={12} md={12} className="nabi-margin-bottom-medium">
          <Typography>
            {pasteText}
          </Typography>
          <TextField
            id={MusicFormComponent.Ids.EmbedCode}
            margin="normal"
            name={MusicFormComponent.FieldNames.EmbedCode}
            onChange={props.handleChange}
            required={true}
            multiline={props.typeOfEmbedCode === musicOptions.SoundCloud.value ? true : false}
            fullWidth={true}
            rows={props.typeOfEmbedCode === musicOptions.SoundCloud.value ? 6 : undefined}
            value={props.embedCode}
          />
        </Grid>
      </Grid>
      <Button
        color="primary"
        variant="contained"
        className="nabi-margin-top-small nabi-text-uppercase"
        onClick={props.addMusic}
        type="submit"
      >
        <Icon className="nabi-margin-right-xsmall">add</Icon>
        <span className="nabi-margin-left-xsmall">{MusicFormComponent.Text.AddButton}</span>
      </Button>
      <Button
        color="default"
        variant="contained"
        className="nabi-margin-top-small nabi-text-uppercase nabi-margin-left-xsmall"
        onClick={props.handleCancel}
      >
        <Icon className="nabi-margin-right-xsmall">close</Icon>
        <span className="nabi-margin-left-xsmall">{MusicFormComponent.Text.CancelButton}</span>
      </Button>
    </form>
  );
};

export default MusicForm;