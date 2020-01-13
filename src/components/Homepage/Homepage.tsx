import * as React from 'react';
import { connect } from 'react-redux';
import Router from "next/router";

import { StoreState } from '../../redux/reducers/store';
import { page } from '../../utils/analytics';
import { UserType } from '../../redux/models/UserModel';
import { Routes } from '../common/constants/Routes';
import Banner from './Banner';
import Features from './Features';
import Testimonials from './Testimonials';
import BecomeATeacher from './BecomeATeacher';
import FreeLesson from './FreeLesson';
/**
 * Homepage component
 */

export interface State {
  performRedirect: boolean;
}

interface StateProps {
  user: UserType;
  token: string;
}

export interface Props extends
  // RouteComponentProps<{}>,
  StateProps { }

export const Homepage = (props: Props) => {
  React.useEffect(() => {
    const userId = props.user ? props.user.email : 'anonymous';

    const analiticsProps = {
      userId,
      properties: {
        referrer: document.referrer
      }
    };
    page('Home', analiticsProps);

    if (props.token) {
      Router.push(Routes.Dashboard)
    }
  }, []);

  return (
    <div>
      <Banner />
      <Features />
      <Testimonials />
      <BecomeATeacher />
      <FreeLesson />
    </div>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user,
    token
  } = state.user;

  return {
    user,
    token
  };
};

export default connect(mapStateToProps, undefined)(Homepage);
