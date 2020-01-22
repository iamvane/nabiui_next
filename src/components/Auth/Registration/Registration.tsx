import * as React from "react";
import moment from "moment";
import { connect } from "react-redux";

import Router from "next/router";
import { withRouter, NextRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import { Action, Dispatch } from "redux";

import { checkErrors } from "../../../utils/checkErrors";
import { StoreState } from "../../../redux/reducers/store";
import { createUser } from "../../../redux/actions/UserActions";
import PageTitle from "../../common/PageTitle";
import { Routes } from "../../common/constants/Routes";
import RegistrationForm from "./RegistrationForm";
import AgeDisclaimer from "./AgeDisclaimer";

import {
  Role,
  RegistrationComponent,
  RegistrationFormComponent
} from "./constants";
import { RegistrationType } from "./models";
import { page, track } from "../../../utils/analytics";

export interface RegistrationErrors {
  [RegistrationFormComponent.FieldKey.Email]?: string;
  [RegistrationFormComponent.FieldKey.Password]?: string;
}

interface StateProps {
  invitationToken: string;
  isRequesting: boolean;
  apiError: string;
  email: any;
}

interface OwnProps {
  role?: Role;
}

interface DispatchProps {
  createUser: (user: RegistrationType) => void;
}

interface OwnProps {
  role?: Role;
}

interface Props
  extends WithRouterProps,
    NextRouter,
    OwnProps,
    DispatchProps,
    StateProps {}

/**
 * Contains a form to register new users
 */
export const Registration = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState(props.role);
  const [birthday, setBirthday] = React.useState("");
  const [openModal, toggleModal] = React.useState(false);
  const [isUnderage, setIsUnderAge] = React.useState(false);
  const [agreeWithTerms, setAgreeWithTerms] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});
  const [registration, setRegistration] = React.useState(false);
  const [isAttemptToRegister, setIsAttemptToRegister] = React.useState(false);

  React.useEffect(() => {
    setEmail(props.email);
    const analiticsProps = {
      properties: {
        referrer: document.referrer
      }
    };
    page("Registration", analiticsProps);

    if (registration && !isUnderage) {
      const isError = checkErrors(Object.values(formErrors));

      if (!isError) {
        createUser();
      }
    }

    if (!props.apiError && isAttemptToRegister && !props.isRequesting) {
      const analiticsProps = {
        userId: email,
        properties: {
          referrer: document.referrer
        }
      };
      track("Created Account", analiticsProps);

      role === Role.instructor
        ? Router.push(Routes.BuildProfile + Routes.AccountInfo)
        : Router.push(Routes.BuildRequest + Routes.AccountInfo);
    }
  }, [
    registration,
    isUnderage,
    formErrors,
    props.apiError,
    isAttemptToRegister,
    props.email
  ]);

  const createUser = async () => {
    setRegistration(false);
    let userValues: RegistrationType = {
      birthday: moment(birthday).format("YYYY-MM-DD"),
      email: email.toLocaleLowerCase(),
      password,
      role
    };
    if (props.invitationToken) {
      userValues.referringCode = props.invitationToken;
    }
    await props.createUser(userValues);
    setIsAttemptToRegister(true);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case RegistrationFormComponent.FieldNames.Role:
        setRole(value as any);
        break;
      case RegistrationFormComponent.FieldNames.Email:
        setEmail(value);
        break;
      case RegistrationFormComponent.FieldNames.Password:
        setPassword(value);
        break;
      case RegistrationFormComponent.FieldNames.AgreeWithTerms:
        setAgreeWithTerms(target.checked);
        break;
      default:
        return;
    }
  };

  const handleBirthdayChange = (date: moment.Moment): void => {
    setBirthday(String(date));
  };

  const displayAgeDisclaimer = (): void => {
    const userAge = Math.abs(moment(birthday).diff(moment(), "years"));

    if (userAge >= RegistrationComponent.minimumAge) {
      return setIsUnderAge(false);
    }
    toggleModal(true);
    setIsUnderAge(true);
    return;
  };

  const validate = () => {
    const { FieldKey } = RegistrationFormComponent;

    const formErrors: RegistrationErrors = {
      email: "",
      password: ""
    };

    // Validate email
    if (!email) {
      formErrors[FieldKey.Email] =
        RegistrationFormComponent.ErrorMessages.Email;
    } else if (email) {
      if (
        !/^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,64}@([a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,}){1,255}){1,320}$/.test(
          email
        ) ||
        /^\s*$/.test(email)
      ) {
        formErrors[FieldKey.Email] =
          RegistrationFormComponent.ErrorMessages.Email;
      }
    }

    // Validate password
    if (!password) {
      formErrors[FieldKey.Password] =
        RegistrationFormComponent.ErrorMessages.Password;
    } else if (password) {
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W\-_]{5,}$/.test(password) ||
        /^\s*$/.test(password)
      ) {
        formErrors[FieldKey.Password] =
          RegistrationFormComponent.ErrorMessages.Password;
      }
    }

    // Validate birthday
    displayAgeDisclaimer();
    return setFormErrors(formErrors);
  };

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    if (event) {
      event.preventDefault();
    }

    validate();
    setRegistration(true);
  };

  const closeModal = () => toggleModal(false);
  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <PageTitle pageTitle={RegistrationComponent.pageTitle} />

      <div className="nabi-background-white nabi-section">
        <RegistrationForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleBirthdayChange={handleBirthdayChange}
          birthday={birthday ? birthday : ""}
          selectedRole={role || ""}
          formErrors={formErrors}
          apiError={props.apiError}
          email={email}
          isRequesting={props.isRequesting}
          agreeWithTerms={agreeWithTerms}
        />
      </div>

      <AgeDisclaimer isFormDialogOpen={openModal} closeHandler={closeModal} />
    </div>
  );
};

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    invitationToken,
    user: { email },
    actions: {
      createUser: { isRequesting, error }
    }
  } = state.user;

  return {
    invitationToken,
    isRequesting,
    email,
    apiError: error
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  createUser: (user: RegistrationType) => dispatch(createUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Registration));
