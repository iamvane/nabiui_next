import * as React from "react";
import moment from "moment";
import { connect } from "react-redux";
import Router from "next/router";
import { withRouter, NextRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import Head from 'next/head';
import { Grid } from '@material-ui/core';

import { Action, Dispatch } from "redux";

import { checkErrors } from "../../../utils/checkErrors";
import { StoreState } from "../../../redux/reducers/store";
import { createUser } from "../../../redux/actions/UserActions";
import { setCookie } from "../../../utils/cookies";
import PageTitle from "../../common/PageTitle";
import { Routes } from "../../common/constants/Routes";
import { pageTitlesAndDescriptions } from '../../common/constants/TitlesAndDescriptions';
import RegistrationForm from "./RegistrationForm";
import AgeDisclaimer from "./AgeDisclaimer";
import { Header } from '../../Header/Header';
import { Footer } from "../../common/Footer";
import {
  Role,
  RegistrationComponent,
  RegistrationFormComponent,
  menuItems,
  headerMenuItems
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
  StateProps { }

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
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [otherText, setOtherText] = React.useState("");
  const [agreeWithTerms, setAgreeWithTerms] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});
  const [registration, setRegistration] = React.useState(false);
  const [isAttemptToRegister, setIsAttemptToRegister] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [latLng, setLatLng] = React.useState({ lat: '', lng: '' });

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
        : Router.push(Routes.BookTrial + Routes.ValidatePhone);
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
      termsAccepted: agreeWithTerms,
      role: props.role
    };
    if (props.invitationToken) {
      userValues.referringCode = props.invitationToken;
    }
    if (props.role === Role.parent || props.role === Role.student) {
      userValues.phoneNumber = phoneNumber;
      userValues.location = location;
      userValues.lat = latLng.lat;
      userValues.lng = latLng.lng;
    }

    if (props.role === Role.student) {
      setCookie('studentName', firstName);
    }
    setCookie("role", props.role);
    setCookie("userEmail", email.toLocaleLowerCase());

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

    const formErrorsObject: RegistrationErrors = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      reference: "",
      otherText: "",
      phoneNumber: ""
    };

    // Validate first name
    if (!firstName) {
      formErrorsObject[FieldKey.FirstName] = RegistrationFormComponent.ErrorMessages.FirstName;
    }

    // Validate first name
    if (!lastName) {
      formErrorsObject[FieldKey.LastName] = RegistrationFormComponent.ErrorMessages.LastName;
    }

    // Validate email
    if (!email) {
      formErrorsObject[FieldKey.Email] =
        RegistrationFormComponent.ErrorMessages.Email;
    } else if (email) {
      if (
        //!/^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,64}@([a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,}){1,255}){1,320}$/.test(
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          email
        ) ||
        /^\s*$/.test(email)
      ) {
        formErrorsObject[FieldKey.Email] =
          RegistrationFormComponent.ErrorMessages.Email;
      }
    }

    // Validate password
    if (!password) {
      formErrorsObject[FieldKey.Password] =
        RegistrationFormComponent.ErrorMessages.Password;
    } else if (password) {
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W\-_]{5,}$/.test(password) ||
        /^\s*$/.test(password)
      ) {
        formErrorsObject[FieldKey.Password] =
          RegistrationFormComponent.ErrorMessages.Password;
      }
    }

    // Validate birthday
    displayAgeDisclaimer();
    if (props.role !== Role.instructor) {
      // Validate phoneNumber
      if (!phoneNumber) {
        formErrorsObject[FieldKey.PhoneNumber] = RegistrationFormComponent.ErrorMessages.PhoneNumber;
      }

      // Validate location
      if (!location) {
        formErrorsObject[FieldKey.Location] = RegistrationFormComponent.ErrorMessages.Location;
      }

    }

    return setFormErrors(formErrorsObject);

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
      Boolean(value) && value
    );
  }

  const closeModal = () => toggleModal(false);

  const docTitle = props.role === Role.instructor ? pageTitlesAndDescriptions.registrationInstructor.title :
    props.role === Role.parent ? pageTitlesAndDescriptions.registrationParent.title : pageTitlesAndDescriptions.registrationStudent.title;
  const docDescription = props.role === Role.instructor ? pageTitlesAndDescriptions.registrationInstructor.description :
    props.role === Role.parent ? pageTitlesAndDescriptions.registrationParent.description : pageTitlesAndDescriptions.registrationStudent.description;


  const handleLocationChange = (location: string) => {
    setLocation(location)
    // clear location errors
    setFormErrors({
      ...formErrors,
      location: ''
    });
  }

  const getLatLng = (lat: string, lng: string) => {
    setLatLng({
      lat,
      lng
    });
  };

  const getLocationError = (error: string) => {
    setFormErrors({
      ...formErrors,
      location: error
    })
  }

  return (
    <div>
      <Head>
        <title>{docTitle}</title>
        <meta name="description" content={docDescription}></meta>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA1CE5k-YS94ZnyFiOIjwlr99jz7JjOA&libraries=places"></script>
      </Head>
      <Header
        drawerMenuItems={menuItems}
        headerMenuItems={headerMenuItems}
      />
      <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium-md">
        <Grid xs={12} md={7} className="nabi-background-white-md nabi-section nabi-margin-center">
          <div className="nabi-text-center">
            <PageTitle pageTitle={RegistrationComponent.pageTitle} />
          </div>
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
            otherText={otherText}
            handleNumberChange={handleNumberChange}
            phoneNumber={phoneNumber}
            getLatLng={getLatLng}
            getLocationError={getLocationError}
            handleLocationChange={handleLocationChange}
            location={location || ''}
          />
        </Grid>
      </div>

      <AgeDisclaimer isFormDialogOpen={openModal} closeHandler={closeModal} />
      <Footer />
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
