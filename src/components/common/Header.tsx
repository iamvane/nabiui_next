import * as React from 'react';
import { connect } from 'react-redux';

import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  Action,
  Dispatch
} from 'redux';

import { StoreState } from '../../redux/reducers/store';
import { Routes } from './constants/Routes';
import {
  nabiMusic,
  logIn,
  logOut,
  pricing
} from './constants/Header';
import { UserType } from '../../redux/models/UserModel';
import { logOutUser } from '../../redux/actions/UserActions';

interface DispatchProps {
  logOutUser: () => void;
}

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  logOutError: string;
  message: string;
}

export interface HeaderProps extends
  WithRouterProps,
  NextRouter,
  DispatchProps,
  StateProps {
}

export const Header = (props: HeaderProps) => {
  const isLocationHomepage: boolean = props.router.route === Routes.HomePage;
  const hanldeUserLogout = () => {
      props.logOutUser();
  };
  const logo = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/logo.png';
  return (
    <header>
      <div
        className={`${isLocationHomepage ? 'nabi-header-container-home' : 'nabi-header-container'} nabi-position-relative`}
      >
        <div
            className="nabi-logo-anchor"
        >
          <Link href={props.user.email ? Routes.Dashboard : Routes.HomePage}>
            <>
              <img
                className="nabi-text-center"
                alt="logo"
                src={logo}
              />
              <p
                id="nabi-logo-text"
                className="nabi-text-center nabi-font-montserrat nabi-text-extrabold"
              >
                {nabiMusic}
              </p>
            </>
          </Link>
        </div>

        {props.router.route === Routes.HomePage &&
          <div className="nabi-header-button">
            <Link href={Routes.Pricing}>{pricing}</Link>

            <Link href={Routes.Login}>
              <Button color="primary" variant="contained" className="nabi-responsive-button nabi-margin-left-small">
                {logIn}
              </Button>
            </Link>
          </div>
        }
        {props.router.route === Routes.Dashboard &&
          <div className="nabi-header-button">
            <Button
              color="primary"
              variant="contained"
              className="nabi-responsive-button"
              onClick={hanldeUserLogout}
            >
              {props.isRequesting ? <CircularProgress color="inherit" size={25} /> :
                  logOut}
            </Button>
          </div>
        }
      </div>
    </header>
  );
};

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user,
    actions: {
      logOutUser: {
        isRequesting,
        error: logOutError,
        message
      },
    },
  } = state.user;
  return {
    user,
    isRequesting,
    message,
    logOutError,
  };
};

const mapDispatchToProps = (
  dispatch: any
): DispatchProps => ({
  logOutUser: () => dispatch(logOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
