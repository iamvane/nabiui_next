import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Grid,
  Divider,
  Typography
} from '@material-ui/core';

import { Routes } from '../../common/constants/Routes';
import { RegistrationParentstudentOptionsComponent } from './constants';

interface Props {}

/**
 * Contains the registration form fields
 */
const RegistrationParentStudentOptions: React.StatelessComponent<Props> = props => {
  return (
    <div className="nabi-container nabi-margin-bottom-small">
      <div className="nabi-background-white nabi-section nabi-text-center">
        <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-small nabi-margin-top-zero">
          {RegistrationParentstudentOptionsComponent.description}
        </p>
        <Link href={Routes.RegistrationParent}>
          <a>
            <Button
              color="primary"
              variant="contained"
              className="nabi-responsive-button nabi-text-uppercase nabi-margin-right-xsmall"
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
              className="nabi-responsive-button nabi-text-uppercase"
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
