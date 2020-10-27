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
    <h2 id="nabi-text-uppercase">
      {props.pageTitle}
    </h2>
  );
};

export default PageTitle;