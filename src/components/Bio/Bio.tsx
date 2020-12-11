import * as React from 'react';

import {
  Grid,
  TextField
} from "nabi_web_components";

import { UserType } from '../../redux/models/UserModel';
import SectionTitle from '../common/SectionTitle';
import { BioComponent } from './constants';

interface Props {
  user: UserType;
  handleChange: (event: React.FormEvent<{}>) => void;
  handleOnBlur: (event: React.FormEvent<{}>) => void;
  bioDescriptionError?: string | JSX.Element;
  bioTitleError?: string | JSX.Element;
  yearsOfExperienceError?: string | JSX.Element;
  bioTitle?: string;
  bioDescription?: string;
  yearsOfExperience?: string | number;
}

/**
 * Contains Bio
 */
const Bio: React.StatelessComponent<Props> = props => {
  return (
    <div>
      <SectionTitle text={BioComponent.Text.YourBio} />

      <p className="nabi-margin-top-xsmall">
        {BioComponent.Text.AddTitle}
      </p>

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

      <p className="nabi-margin-top-xsmall">
        {BioComponent.Text.TalkAboutYour}
      </p>

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

      <p className="nabi-margin-top-xsmall">
        {BioComponent.Text.YearsOfExperience}
      </p>

      <Grid container={true} spacing={0}>
        <Grid item={true} md={6} xs={12}>
          <TextField
            onChange={props.handleChange}
            type="number"
            onBlur={props.handleOnBlur}
            id={BioComponent.Ids.yearsOfExperience}
            margin="normal"
            name={BioComponent.FieldNames.yearsOfExperience}
            required={true}
            error={!!props.yearsOfExperienceError}
            helperText={props.yearsOfExperienceError}
            value={props.yearsOfExperience ? props.yearsOfExperience : ''}
          />
        </Grid>
      </Grid>
    </div>
  )
};

export default Bio;
