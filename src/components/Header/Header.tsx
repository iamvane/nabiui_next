import * as React from 'react';
import { connect } from 'react-redux';

import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';

import {
  Button,
  IconButton
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  Action,
  Dispatch
} from 'redux';

import '../../../assets/scss/Header.scss';
import { StoreState } from '../../redux/reducers/store';
import { UserType } from '../../redux/models/UserModel';
import { logOutUser } from '../../redux/actions/UserActions';
import { Routes } from '../common/constants/Routes';
import {
  nabiMusic,
  logIn,
  logOut,
  headerMenuLabels
} from './constants';
import { DrawerMenu } from './DrawerMenu';
import  { InstructorMenu } from './InstructorMenu';
import  { StudentParentMenu } from './StudentParentMenu';

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
  const [isDrawerMenuOpen, setIsDraweMenuOpen] = React.useState(false);
  const [isStudentParentMenuOpen, setStudentParentMenuOpen] = React.useState(false);
  const [anchorElStudentParentMenu, setAnchorElStudentParentMenu] = React.useState<null | HTMLElement>(null);
  const [isInstructorMenuOpen, setInstructorMenuOpen] = React.useState(false);
  const [anchorElInstructorMenu, setAnchorElInstructorMenu] = React.useState<null | HTMLElement>(null);

  const toggleDrawerMenu = () => {
    setIsDraweMenuOpen(prevOpen => !prevOpen);
  };

  const openInstructorMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElInstructorMenu(anchorElInstructorMenu || event.currentTarget);
    setInstructorMenuOpen(true);
  };

  const openStudentParentMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStudentParentMenu(anchorElStudentParentMenu || event.currentTarget);
    setStudentParentMenuOpen(true);
  };

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
        <div className="nabi-header-menu hide-on-desktop">
          <IconButton onClick={toggleDrawerMenu}><Menu /></IconButton>
          <DrawerMenu isOpen={isDrawerMenuOpen} closeMenu={toggleDrawerMenu} />
        </div>
        <div className="nabi-header-menu hide-on-mobile">
          <p
            className="nabi-text-uppercase nabi-text-semibold nabi-cursor-pointer nabi-display-inline nabi-color-nabi"
            onClick={openStudentParentMenu}
          >
            {headerMenuLabels.student}
          </p>
          <StudentParentMenu
            isMenuOpen={isStudentParentMenuOpen}
            toggleMenu={() => setStudentParentMenuOpen(false)}
            anchorEl={anchorElStudentParentMenu}
          />
          <p
            className="nabi-text-uppercase nabi-text-semibold nabi-margin-left-small nabi-display-inline nabi-color-nabi nabi-cursor-pointer"
            onClick={openInstructorMenu}
          >
            {headerMenuLabels.instructors}
          </p>
          <InstructorMenu
            isMenuOpen={Boolean(isInstructorMenuOpen && anchorElInstructorMenu)}
            toggleMenu={() => setInstructorMenuOpen(false)}
            anchorEl={anchorElInstructorMenu}
          />
          <a href="https://blog.nabimusic.com" className="nabi-text-uppercase nabi-text-semibold nabi-margin-left-small" target="_blank">{headerMenuLabels.blog}</a>
        </div>
        <div className="nabi-logo-anchor">
          <Link href={props.user.email ? Routes.Dashboard : Routes.HomePage}>
            <a>
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
            </a>
          </Link>
        </div>

        {props.router.route === Routes.HomePage &&
          <div className="nabi-header-button">
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
