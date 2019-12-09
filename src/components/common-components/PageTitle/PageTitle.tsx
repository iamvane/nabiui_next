import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
  pageTitle: string;
}

/**
 * Page Title
 */
export const PageTitle: React.StatelessComponent<Props> = props => {
  return (
    <Typography variant="h2" id="nabi-page-title">
      {props.pageTitle}
    </Typography>
  );
};
