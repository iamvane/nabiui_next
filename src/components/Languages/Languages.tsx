import * as React from 'react';

import {
  Button,
  FormControl,
  Grid,
  Select,
  Typography
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import { languages } from '../../../assets/data/languages';
import SectionTitle from '../common/SectionTitle';
import { LanguageComponent } from './constants';
import LanguageAdded from './LanguageAdded';

interface Props {
  languages: string[];
  language: string;
  handleChangeLanguage: (event: React.FormEvent<{}>) => void;
  addLanguage: (event: React.FormEvent<{}>) => void;
  deleteLanguage: (language: string) => void;
}

export const Languages: React.StatelessComponent<Props> = props => {
    const selectedLenguages = props.languages.map((language, i) => (
      <LanguageAdded
        key={i}
        language={language}
        deleteLanguage={(languageName: string) => props.deleteLanguage(languageName)}
      />
    ));

    const languageSelectItems = languages.map(language => {
      const languageValue = (language.name).toLowerCase();
      return (
        <option key={language.name} value={languageValue}>{language.name}</option>
      );
    });

    return (
      <div>
        <SectionTitle text={LanguageComponent.Text.Languages} />

        <Typography className="nabi-margin-bottom-xsmall">
          {LanguageComponent.Text.SelectWhatLanguage}
        </Typography>

        {selectedLenguages}

        <div className="nabi-margin-top-small">
        <Grid container={true} spacing={2}>
          <Grid item={true} md={5} xs={12}>
            <FormControl className="nabi-margin-top-zero">
              <Select
                native={true}
                value={props.language}
                onChange={props.handleChangeLanguage}
                inputProps={{
                  id: LanguageComponent.id,
                  name: LanguageComponent.fieldName}}
              >
                <option value="" disabled={true}>
                  {LanguageComponent.selectPlaceholder}
                </option>
                {languageSelectItems}
              </Select>
            </FormControl>
          </Grid>
            <Grid item={true} md={4} xs={10}>
              <Button
                onClick={props.addLanguage}
                color="primary"
                variant="contained"
              >
                <Add className="nabi-margin-right-xsmall" />
                {LanguageComponent.Text.Add}
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
};

export default Languages;
