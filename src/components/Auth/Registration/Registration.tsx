import * as React from "react";
import moment from "moment";
import { connect } from "react-redux";
import Router from "next/router";
import { withRouter, NextRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import Head from 'next/head';

import { Action, Dispatch } from "redux";

import useScript from '../../../hooks/useScript';
import { checkErrors } from "../../../utils/checkErrors";
import { StoreState } from "../../../redux/reducers/store";
import { createUser } from "../../../redux/actions/UserActions";
import PageTitle from "../../common/PageTitle";
import { Routes } from "../../common/constants/Routes";
import { pageTitlesAndDescriptions } from '../../common/constants/TitlesAndDescriptions';
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
  [RegistrationFormComponent.FieldKey.FirstName]?: string;
  [RegistrationFormComponent.FieldKey.LastName]?: string;
  [RegistrationFormComponent.FieldKey.Email]?: string;
  [RegistrationFormComponent.FieldKey.Password]?: string;
  [RegistrationFormComponent.FieldKey.Reference]?: string;
  [RegistrationFormComponent.FieldKey.OtherText]?: string;
  [RegistrationFormComponent.FieldKey.Location]?: string;
  [RegistrationFormComponent.FieldKey.PhoneNumber]?: string;
}

interface StateProps {
  invitationToken: string;
  isRequesting: boolean;
  apiError: string;
  email: string;
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
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [openModal, toggleModal] = React.useState(false);
  const [isUnderage, setIsUnderAge] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [latLng, setLatLng] = React.useState({} as {lat: string, lng: string});
  const [reference, setReference] = React.useState("");
  const [otherText, setOtherText] = React.useState("");
  const [agreeWithTerms, setAgreeWithTerms] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});
  const [registration, setRegistration] = React.useState(false);
  const [isAttemptToRegister, setIsAttemptToRegister] = React.useState(false);

  React.useEffect(() => {
    if (props.email) {
      setEmail(props.email);
    }

    if (!registration) {
      const analiticsProps = {
        properties: {
          referrer: document.referrer
        }
      };
      page("Registration", analiticsProps);
    }

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

      props.role === Role.instructor
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
      firstName,
      lastName,
      birthday: moment(birthday).format("YYYY-MM-DD"),
      email: email.toLocaleLowerCase(),
      password,
      reference: otherText || reference,
      termsAccepted: agreeWithTerms,
      role: props.role
    };
    if (props.invitationToken) {
      userValues.referringCode = props.invitationToken;
    }
    if (props.role === Role.parent || props.role === Role.student) {
      userValues.location = location;
      userValues.lat = latLng.lat;
      userValues.lng = latLng.lng;
      userValues.phoneNumber = phoneNumber;
    }
    await props.createUser(userValues);
    setIsAttemptToRegister(true);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case RegistrationFormComponent.FieldNames.FirstName:
        setFirstName(value);
        break;
      case RegistrationFormComponent.FieldNames.LastName:
        setLastName(value);
        break;
      case RegistrationFormComponent.FieldNames.Email:
        setEmail(value);
        break;
      case RegistrationFormComponent.FieldNames.Password:
        setPassword(value);
        break;
      case RegistrationFormComponent.FieldNames.Reference:
        setReference(value);
        break;
      case RegistrationFormComponent.FieldNames.OtherText:
        setOtherText(value);
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
      password: "",
      firstName: "",
      lastName: "",
      reference: "",
      otherText: "",
      location: "",
      phoneNumber: ""
    };

    // Validate first name
    if (!firstName) {
      formErrors[FieldKey.FirstName] = RegistrationFormComponent.ErrorMessages.FirstName;
    }

    // Validate first name
    if (!lastName) {
      formErrors[FieldKey.LastName] = RegistrationFormComponent.ErrorMessages.LastName;
    }

    // Validate email
    if (!email) {
      formErrors[FieldKey.Email] =
        RegistrationFormComponent.ErrorMessages.Email;
    } else if (email) {
      if (
         //!/^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,64}@([a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,}){1,255}){1,320}$/.test(
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
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

    // Validate reference
    if (!reference) {
      formErrors[FieldKey.Reference] = RegistrationFormComponent.ErrorMessages.Reference;
    }

     // Validate otherText
     if (reference === 'other' && !otherText) {
      formErrors[FieldKey.OtherText] = RegistrationFormComponent.ErrorMessages.OtherText;
    }

    // Validate birthday
    displayAgeDisclaimer();

    if (props.role !== Role.instructor) {
      // Validate location
      if (!location || !latLng.lat || !latLng.lng) {
        formErrors[FieldKey.Location] = RegistrationFormComponent.ErrorMessages.Location;
      }

      // Validate phoneNumber
      if (!phoneNumber) {
        formErrors[FieldKey.PhoneNumber] = RegistrationFormComponent.ErrorMessages.PhoneNumber;
      }
    }

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

  const handleNumberChange = (value: string): void => {
    setPhoneNumber(
      Boolean(value) &&  value
    );
  }

  const handleLocationChange = (location: string) => {
    setLocation(location);
    // clear location errors
    setFormErrors({
      ...formErrors,
      location: ''
    })
  }

  const getLatLng = (lat: string, lng: string) => {
    setLatLng({
      lat,
      lng
    })
  };

  const getLocationError = (error: string) => {
    setFormErrors({
      ...formErrors,
      location: error
    })
  }

  const closeModal = () => toggleModal(false);

  const docTitle = props.role === Role.instructor ? pageTitlesAndDescriptions.registrationInstructor.title :
    props.role === Role.parent ? pageTitlesAndDescriptions.registrationParent.title : pageTitlesAndDescriptions.registrationStudent.title;
  const docDescription = props.role === Role.instructor ? pageTitlesAndDescriptions.registrationInstructor.description :
    props.role === Role.parent ? pageTitlesAndDescriptions.registrationParent.description : pageTitlesAndDescriptions.registrationStudent.description;

  return (
    <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium">
      <Head>
        <title>{docTitle}</title>
        <meta name="description" content={docDescription}></meta>
        <script async={true} defer={true} src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA1CE5k-YS94ZnyFiOIjwlr99jz7JjOA&libraries=places&callback=loadGoogleMaps"></script>
      </Head>
      <PageTitle pageTitle={RegistrationComponent.pageTitle} />

      <div className="nabi-background-white nabi-section">
        <RegistrationForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleBirthdayChange={handleBirthdayChange}
          birthday={birthday ? birthday : ""}
          selectedRole={props.role || ""}
          formErrors={formErrors}
          apiError={props.apiError}
          email={email}
          firstName={firstName}
          lastName={lastName}
          isRequesting={props.isRequesting}
          agreeWithTerms={agreeWithTerms}
          reference={reference}
          otherText={otherText}
          getLatLng={getLatLng}
          getLocationError={getLocationError}
          handleLocationChange={handleLocationChange}
          location={location || ''}
          handleNumberChange={handleNumberChange}
          phoneNumber={phoneNumber}
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
