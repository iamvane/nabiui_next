import * as React from 'react';
import Link from 'next/link';
import moment from 'moment';
const reactStringReplace = require('react-string-replace');

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import SectionTitle from '../../../common-components/SectionTitle';
import {
    Role,
    RegistrationFormComponent
} from './constants';
import { Routes } from '../../../../constants/Routes';

interface Props {
    handleChange: (event: React.FormEvent<{}>) => void;
    handleSubmit: (event: React.FormEvent<{}>) => void;
    handleBirthdayChange: (date: Date) => void;
    birthday?: string;
    selectedRole: string;
    formErrors: any;
    apiError: string;
    isRequesting: boolean;
    agreeWithTerms: boolean;
}

/**
 * Contains the registration form fields
 */
const RegistrationForm: React.StatelessComponent<Props> = props => {
    const { handleChange, selectedRole, isRequesting, formErrors } = props;
    const registerAsText: string = (
        (selectedRole === Role.student) ? RegistrationFormComponent.RegisterText.Student :
            (selectedRole === Role.parent) ? RegistrationFormComponent.RegisterText.Parent :
                RegistrationFormComponent.RegisterText.Instructor
    );

    const termsText = reactStringReplace(
        RegistrationFormComponent.agreeWithTerms,
        RegistrationFormComponent.termsOfServicePlaceholder,
        (i: number) => (
            <Link
                href={Routes.TermsOfUse}
                key={i}>{RegistrationFormComponent.termsText}
            </Link>
        )
    );

    return (
        <form
            className="nabi-general-form nabi-margin-top-medium"
            noValidate={true}
            onSubmit={props.handleSubmit}
            autoComplete="off"
        >
            {selectedRole !== Role.instructor && (
                <React.Fragment>
                    <SectionTitle text={RegistrationFormComponent.IAmA} />
                    <FormControl required={true}>
                        <RadioGroup
                            name={RegistrationFormComponent.FieldNames.Role}
                            onChange={handleChange}
                            value={selectedRole}
                        >
                            <FormControlLabel
                                control={<Radio />}
                                label={RegistrationFormComponent.Labels.ProspectiveStudent}
                                value={Role.student}
                            />
                            <FormControlLabel
                                control={<Radio />}
                                label={RegistrationFormComponent.Labels.ParentGuardian}
                                value={Role.parent}
                            />
                        </RadioGroup>
                    </FormControl>
                </React.Fragment>
            )}

            <div className="nabi-margin-top-small">
                <SectionTitle text={registerAsText} />
            </div>

            <TextField
                fullWidth={true}
                margin="normal"
                id={RegistrationFormComponent.Ids.Email}
                name={RegistrationFormComponent.FieldNames.Email}
                onChange={handleChange}
                placeholder={RegistrationFormComponent.Placeholders.Email}
                required={true}
                error={!!formErrors.email}
                helperText={formErrors.email}
            />

            <TextField
                fullWidth={true}
                margin="normal"
                id={RegistrationFormComponent.Ids.Password}
                name={RegistrationFormComponent.FieldNames.Password}
                onChange={handleChange}
                placeholder={RegistrationFormComponent.Placeholders.Password}
                required={true}
                type={RegistrationFormComponent.FieldNames.Password}
                error={!!formErrors.password}
                helperText={formErrors.password}
            />

            <Typography variant="body2">
                {RegistrationFormComponent.birthday}
            </Typography>

            <FormControl fullWidth={false} required={true}>
                <DatePicker
                    selected={props.birthday ? new Date(props.birthday) : new Date()}
                    onChange={props.handleBirthdayChange}
                    peekNextMonth={true}
                    showMonthDropdown={true}
                    showYearDropdown={true}
                    dropdownMode="select"
                />
            </FormControl>

            <div className="nabi-margin-top-small nabi-margin-left-xsmall">
                <FormControlLabel
                    className="nabi-margin-bottom-medium"
                    control={
                        <Checkbox
                            onChange={handleChange}
                            inputProps={{
                                name: RegistrationFormComponent.FieldNames.AgreeWithTerms,
                                'aria-label': 'uncontrolled-checkbox',
                            }}
                        />
                    }
                    label={termsText}
                />
            </div>

            <div className="nabi-text-center">
                <div className="nabi-margin-top-small">
                    {isRequesting && <CircularProgress />}
                </div>

                <Typography className="nabi-margin-top-small nabi-margin-bottom-small" color="error">
                    {props.apiError}
                </Typography>

                <Button
                    disabled={!props.agreeWithTerms}
                    color="primary"
                    className="nabi-text-uppercase"
                    variant="contained"
                    type="submit"
                >
                    {RegistrationFormComponent.SubmitText}
                </Button>
            </div>
        </form>
    );
};

export default RegistrationForm;
