import * as React from 'react';
import {
  Grid,
  Icon,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

import { LanguageAddedComponent } from './constants';

interface Props {
  language: string;
  deleteLanguage: (languageName: string) => void;
}

const LanguageAdded: React.StatelessComponent<Props> = props => {
  const languageName = props.language.charAt(0).toUpperCase() + props.language.slice(1);

  return (
    <Grid container={true}>
      <Grid item={true} md={3} xs={12}>
        <ListItem>
          <ListItemText
            primary={
              LanguageAddedComponent.languageAdded.replace(
                LanguageAddedComponent.languagePlaceholder,
                languageName
              )
            }
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={() => props.deleteLanguage(props.language)}>
              <Icon>delete</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export default LanguageAdded;
