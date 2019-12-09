import * as React from 'react';

import { ProfileBuilder } from 'components/ProfileBuilder/ProfileBuilder';
import { Routes } from 'components/common/constants/Routes';
import { Role } from 'components/common/constants/Registration';
import { Redirect } from 'react-router-dom';

import { Props } from 'components/CommonStepper/CommonStepper';
import Homepage from 'components/common/Homepage/Homepage';
import Registration  from 'components/common/Registration/Registration';
import { RequestBuilder } from 'components/RequestBuilder/RequestBuilder';
import Login from 'components/common/LoginPage/Login';
import PasswordRecovery from 'components/common/ForgotPassword/PasswordRecovery';
import SetPassword from 'components/common/ForgotPassword/SetPassword';
import Profile from 'components/Profile/Profile';
import Dashboard from 'components/Dashboard/Dashboard';
import Settings from 'components/Settings/Settings';
import RequestView from 'components/Request/RequestView';
import InstructorsList from 'components/Instructors/InstructorsList';
import BookLessons from 'components/BookLessons/BookLessons';
import RequestsList  from 'components/Request/RequestsList';
import RegistrationOptions from 'components/common/Registration/RegistrationOptions';
import { TermsOfUse } from 'components/common/Policies/TermsOfUse';
import { PrivacyPolicy } from 'components/common/Policies/PrivacyPolicy';
import { StudentPolicy } from 'components/common/Policies/StudentPolicy';
import { InstructorPolicy } from 'components/common/Policies/InstructorPolicy';
import ContactUs from 'components/common/ContactUs';
import Pricing from 'components/Pricing/Pricing';

// Renders ProfileBuilder component
const renderProfileBuilder = (props: Props): JSX.Element =>  (
  <ProfileBuilder
    {...props}
    key={props.match.params.step}
  />
);

// Renders RequestBuilder component
const renderRequestBuilder = (props: Props): JSX.Element =>  (
  <RequestBuilder
    {...props}
    key={props.match.params.step}
  />
);

// Renders Registration component for students
const renderRegistrationStudent = (): JSX.Element => (
  <Registration role={Role.student} />
);

// Renders Registration component for instructor
const renderRegistrationInstructor = (): JSX.Element  => (
  <Registration role={Role.instructor} />
);

// Renders Registration component for parent
const renderRegistrationParent = (): JSX.Element => (
  <Registration role={Role.parent} />
);

const renderBookLessons = (): JSX.Element => (
   <BookLessons lessonPrice={50.00} />
);

// Redirect build-profile -> build-profile/account-info
const redirectBuildProfile = (props: Props) => (
  <Redirect to={`${Routes.BuildProfile}${Routes.AccountInfo}`} />
);

// Redirect build-request -> build-request/account-info
const redirectBuildRequest = (props: Props) => (
  <Redirect to={`${Routes.BuildRequest}${Routes.AccountInfo}`} />
);

// Renders Request component
const renderRequest = (props: any): JSX.Element =>  (
  <RequestView
    {...props}
    key={props.match.params.id}
  />
);

export const routes = [
  {
    path: Routes.HomePage,
    component: Homepage,
    exact: true,
    redirectAuthenticatedUser: true
  },
  {
    path: Routes.Registration,
    component: RegistrationOptions,
    exact: true
  },
  {
    path: Routes.RegistrationStudent,
    component: renderRegistrationStudent,
    exact: true
  },
  {
    path: Routes.RegistrationParent,
    component: renderRegistrationParent,
    exact: true
  },
  {
    path: Routes.RegistrationInstructor,
    component: renderRegistrationInstructor,
    exact: true
  },
  {
    path: Routes.BuildProfile,
    component: redirectBuildProfile,
    exact: true,
    private: true,
    roles: [Role.instructor]
  },
  {
    path: Routes.BuildRequest,
    component: redirectBuildRequest,
    exact: true,
    private: true,
    roles: [Role.student, Role.parent]
  },
  {
    path: Routes.BuildRequestStep,
    component: renderRequestBuilder,
    exact: true,
    private: true,
    roles: [Role.student, Role.parent]
  },
  {
    path: Routes.BuildProfileStep,
    component: renderProfileBuilder,
    exact: true,
    private: true,
    roles: [Role.instructor]
  },
  {
    path: Routes.Login,
    component: Login,
    exact: true
  },
  {
    path: Routes.AccountRecovery,
    component: PasswordRecovery,
    exact: true
  },
  {
    path: Routes.ForgotPassword,
    component: SetPassword,
    exact: true
  },
  {
    path: Routes.Profile,
    component: Profile,
    exact: true
  },
  {
    path: Routes.Dashboard,
    exact: true,
    component: Dashboard,
    private: true
  },
  {
    path: Routes.Settings,
    component: Settings
  },
  {
    path: Routes.Instructors,
    exact: true,
    component: InstructorsList
  },
  {
    path: Routes.Requests,
    exact: true,
    component: RequestsList
  },
  {
    path: Routes.RequestId,
    component: renderRequest,
    exact: true
  },
  {
    path: Routes.BookLessons,
    exact: true,
    component: renderBookLessons
  },
  {
    path: Routes.TermsOfUse,
    exact: true,
    component: TermsOfUse
  },
  {
    path: Routes.PrivacyPolicy,
    exact: true,
    component: PrivacyPolicy
  },
  {
    path: Routes.StudentPolicy,
    exact: true,
    component: StudentPolicy
  },
  {
    path: Routes.InstructorPolicy,
    exact: true,
    component: InstructorPolicy
  },
  {
    path: Routes.ContactUs,
    exact: true,
    component: ContactUs
  },
  {
    path: Routes.Pricing,
    exact: true,
    component: Pricing
  }
];
