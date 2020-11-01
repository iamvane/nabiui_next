import * as React from 'react';
import PrivateRoute from '../Auth/PrivateRoutes';
import Profile from "../Profile/Profile";

export const BestMatch = ({}) => {
  return <Profile isTrial={true} />;
}

export default PrivateRoute(BestMatch, 'Private', ['Student', 'Parent']);
