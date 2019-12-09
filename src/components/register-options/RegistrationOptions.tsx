import * as React from 'react';
import Link from 'next/link';

import {
    Button,
    Divider,
    Typography
} from '@material-ui/core';

import { Routes } from '../../constants/Routes';
import { RegistrationOptionsComponent } from './constants';
interface Props { }

/**
 * Contains the registration form fields
 */
const RegistrationOptions: React.StatelessComponent<Props> = () => {
    return (
        <div className="nabi-container">
            <div className="nabi-background-white nabi-section nabi-text-center">
                <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-bottom-xsmall nabi-margin-bottom-zero">
                    {RegistrationOptionsComponent.preLaunchStudentCTATitle}
                </p>
                <Typography className="nabi-margin-small">
                    {RegistrationOptionsComponent.preLaunchStudentCTADescription}
                </Typography>
                <Link href={Routes.RegistrationStudent}>
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

        </div>
    );
};

export default RegistrationOptions;
