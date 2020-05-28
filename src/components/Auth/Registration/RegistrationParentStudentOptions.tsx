import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { Button } from '@material-ui/core';

import { pageTitlesAndDescriptions } from '../../common/constants/TitlesAndDescriptions';
import { Routes } from '../../common/constants/Routes';
import { RegistrationParentstudentOptionsComponent } from './constants';

interface Props {}

/**
 * Contains the registration form fields
 */
const RegistrationParentStudentOptions: React.StatelessComponent<Props> = props => {
  return (
    <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium">
      <Head>
        <title>{pageTitlesAndDescriptions.registrationParentStudent.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.registrationParentStudent.description}></meta>
      </Head>
      <div className="nabi-background-white nabi-section nabi-text-center">
        <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-small nabi-margin-top-zero">
          {RegistrationParentstudentOptionsComponent.description}
        </p>
        <Link href={Routes.RegistrationParent}>
          <a>
            <Button
              color="primary"
              variant="contained"
              className="nabi-responsive-button nabi-text-uppercase nabi-margin-right-xsmall nabi-margin-bottom-xsmall"
            >
              {RegistrationParentstudentOptionsComponent.parent}
            </Button>
          </a>
        </Link>
        <Link href={Routes.RegistrationStudent}>
          <a>
            <Button
              color="primary"
              variant="contained"
              className="nabi-responsive-button nabi-text-uppercase nabi-margin-bottom-xsmall"
            >
              {RegistrationParentstudentOptionsComponent.student}
            </Button>
          </a>
        </Link>
        <div className="nabi-margin-top-small">
          <Link href={Routes.RegistrationInstructor}>
            <a>{RegistrationParentstudentOptionsComponent.InstructorUrl}</a>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default RegistrationParentStudentOptions;
