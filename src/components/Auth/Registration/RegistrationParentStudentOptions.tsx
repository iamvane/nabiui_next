import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from "next/router";
import { Button, Grid } from '@material-ui/core';

import { pageTitlesAndDescriptions } from '../../common/constants/TitlesAndDescriptions';
import { Routes } from '../../common/constants/Routes';
import { Header } from '../../Header/Header';
import {
  RegistrationParentstudentOptionsComponent,
  menuItems,
  headerMenuItems
} from './constants';
import { Footer } from "../../common/Footer";
import { PageTitle } from "../../common/PageTitle";

/**
 * Contains the registration form fields
 */
const RegistrationParentStudentOptions = () => {
  const routeToRegistration = (route: string) => {
    return Router.push(route);
  }

  return (
    <div>
      <Head>
        <title>{pageTitlesAndDescriptions.registrationParentStudent.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.registrationParentStudent.description}></meta>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA1CE5k-YS94ZnyFiOIjwlr99jz7JjOA&libraries=places"></script>
      </Head>
      <Header
        drawerMenuItems={menuItems}
        headerMenuItems={headerMenuItems}
      />
      <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium-md">
        <Grid xs={12} md={7} className="nabi-background-white-md nabi-section nabi-text-center nabi-margin-center">
          <PageTitle pageTitle={RegistrationParentstudentOptionsComponent.pageTitle} />
          <h4>{RegistrationParentstudentOptionsComponent.description}</h4>
          <p>{RegistrationParentstudentOptionsComponent.ageDisclaimer}</p>
          <Button
            color="primary"
            variant="contained"
            className="nabi-responsive-button nabi-text-uppercase nabi-margin-right-xsmall nabi-margin-bottom-xsmall"
            onClick={() => routeToRegistration(Routes.RegistrationParent)}
          >
            {RegistrationParentstudentOptionsComponent.parent}
          </Button>

          <Button
            color="secondary"
            variant="contained"
            className="nabi-responsive-button nabi-text-uppercase nabi-margin-bottom-xsmall"
            onClick={() => routeToRegistration(Routes.RegistrationStudent)}
          >
            {RegistrationParentstudentOptionsComponent.student}
          </Button>
        </Grid>
      </div>
      <Footer bottomPlacement={true} />
    </div>
  );
};

export default RegistrationParentStudentOptions;
