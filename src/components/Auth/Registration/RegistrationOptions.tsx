import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Divider,
  Typography
} from '@material-ui/core';

import { Routes } from '../../common/constants/Routes';
import {
  RegistrationOptionsComponent,
  menuItems,
  headerMenuItems
} from './constants';
import { Header } from '../../Header/Header';
import { Footer } from "../../common/Footer";

interface Props {}

/**
 * Contains the registration form fields
 */
const RegistrationOptions: React.StatelessComponent<Props> = props => {
  return (
    <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium">
      <Header 
        drawerMenuItems={menuItems}
        headerMenuItems={headerMenuItems}
      />
      <div className="nabi-background-white nabi-section nabi-text-center">
        <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-margin-bottom-zero">
          {RegistrationOptionsComponent.preLaunchStudentCTATitle}
        </p>
        <Typography className="nabi-margin-small">
          {RegistrationOptionsComponent.preLaunchStudentCTADescription}
        </Typography>
        <Link href={Routes.RegistrationParentStudent}>
          <Button
            color="primary"
            variant="contained"
            className="nabi-responsive-button nabi-text-uppercase"
          >
            {RegistrationOptionsComponent.preLaunchStudentButton}
          </Button>
        </Link>
        <Divider className="nabi-margin-top-medium" />
        <p className="nabi-jennasue-title  nabi-color-nabi nabi-margin-bottom-xsmall nabi-margin-bottom-zero">
          {RegistrationOptionsComponent.preLaunchInstructorCTATitle}
        </p>
        <Typography className="nabi-margin-small">{RegistrationOptionsComponent.instructorCTADescription}</Typography>
        <Link href={Routes.RegistrationInstructor}>
          <Button
            color="primary"
            variant="contained"
            className="nabi-responsive-button nabi-text-uppercase"
          >
            {RegistrationOptionsComponent.instructorButton}
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationOptions;
