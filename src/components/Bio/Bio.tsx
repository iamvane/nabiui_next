import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { UserType } from '../../redux/models/UserModel';
import SectionTitle from '../common/SectionTitle';
import { BioComponent } from './constants';

interface Props {
  user: UserType;
  handleChange: (event: React.FormEvent<{}>) => void;
  handleOnBlur: (event: React.FormEvent<{}>) => void;
  bioDescriptionError?: string | JSX.Element;
  bioTitleError?: string | JSX.Element;
  bioTitle?: string;
  bioDescription?: string;
}

/**
 * Contains Bio
 */
const Bio: React.StatelessComponent<Props> = props => (
  <div>
    <SectionTitle text={BioComponent.Text.YourBio} />

    <Typography className="nabi-margin-top-xsmall">
      {BioComponent.Text.AddTitle}
    </Typography>

    <Grid container={true} spacing={0}>
      <Grid item={true} md={6} xs={12}>
        <TextField
          onChange={props.handleChange}
          onBlur={props.handleOnBlur}
          id={BioComponent.Ids.BioTitle}
          margin="normal"
          fullWidth={true}
          name={BioComponent.FieldNames.BioTitle}
          required={true}
          error={!!props.bioTitleError}
          helperText={props.bioTitleError}
          value={props.bioTitle}
        />
      </Grid>
    </Grid>

    <Typography className="nabi-margin-top-xsmall">
      {BioComponent.Text.TalkAboutYour}
    </Typography>

    <TextField
      id={BioComponent.Ids.bioDescription}
      margin="normal"
      name={BioComponent.FieldNames.bioDescription}
      placeholder={BioComponent.Placeholders.CharactersMax}
      onChange={props.handleChange}
      onBlur={props.handleOnBlur}
      required={true}
      multiline={true}
      fullWidth={true}
      rows={6}
      error={!!props.bioDescriptionError}
      helperText={props.bioDescriptionError}
      value={props.bioDescription}
    />
  </div>
);

export default Bio;
