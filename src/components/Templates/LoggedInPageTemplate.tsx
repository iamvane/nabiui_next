import * as React from 'react';
import { Grid } from '@material-ui/core';

import PageTitle from '../common/PageTitle';
// import { NavigationContainer } from 'components/Navigation/NavigationContainer';

interface Props {
  sidebarContent: JSX.Element;
  mainContent: JSX.Element;
  pageTitle?: string;
}

export const LoggedInPageTemplate: React.StatelessComponent<Props> = (props) => {
  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md">
      {props.pageTitle && <PageTitle pageTitle={props.pageTitle} />}
      <Grid container={true} spacing={8}>
        {/* <NavigationContainer /> */}
        <Grid item={true} xs={12} md={4}>
          <div className="nabi-section-widest nabi-background-white">
            {props.sidebarContent}
          </div>
        </Grid>
        <Grid item={true} xs={12} md={8}>
          {props.mainContent}
        </Grid>
      </Grid>
    </div>
  );
};

export default LoggedInPageTemplate;
