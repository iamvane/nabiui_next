import * as React from "react";
import { connect, useSelector } from "react-redux";

import Router from "next/router";
import { withRouter, NextRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import Link from "next/link";

import { Button, Typography, Avatar, Badge } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../../../assets/scss/Header.scss";
import { getCookie } from "../../utils/cookies";
import { StoreState } from "../../redux/reducers/store";
import { UserType } from "../../redux/models/UserModel";
import { logOutUser } from "../../redux/actions/UserActions";
import { Role } from '../../constants/Roles';
import { Routes } from "../common/constants/Routes";

import {
  nabiMusic,
  logIn,
  logOut,
  headerMenuLabels,
  signUp,
  ClaimYour
} from "./constants";
import { CollapsibleSidebar } from "../CollapsibleSidbar/CollapsibleSidbar";
import { DrawerMenu } from "./DrawerMenu";
import { InstructorMenu } from "./InstructorMenu";
import { StudentParentMenu } from "./StudentParentMenu";

import HelpIcon from "@material-ui/icons/Help";

interface DispatchProps {
  logOutUser: () => void;
}

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  logOutError: string;
  message: string;
  token;
}

export interface HeaderProps
  extends WithRouterProps,
    NextRouter,
    DispatchProps,
    StateProps {}

export const Header = (props: HeaderProps) => {
  const [isDrawerMenuOpen, setIsDraweMenuOpen] = React.useState(false);
  const [isStudentParentMenuOpen, setStudentParentMenuOpen] = React.useState(
    false
  );
  const [
    anchorElStudentParentMenu,
    setAnchorElStudentParentMenu
  ] = React.useState<null | HTMLElement>(null);
  const [isInstructorMenuOpen, setInstructorMenuOpen] = React.useState(false);
  const [
    anchorElInstructorMenu,
    setAnchorElInstructorMenu
  ] = React.useState<null | HTMLElement>(null);

  const { avatar, token } = useSelector(
    (state: StateProps) => state.user.referralInfo
  );

  const toggleDrawerMenu = () => {
    setIsDraweMenuOpen(prevOpen => !prevOpen);
  };

  const handleUserLogout = async () => {
    await props.logOutUser();
    Router.push(Routes.HomePage);
    toggleDrawerMenu();
  };

  const { error } = useSelector(
    (state: StoreState) => state.user.actions.fetchReferralInfo
  );

  const openInstructorMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElInstructorMenu(anchorElInstructorMenu || event.currentTarget);
    setInstructorMenuOpen(true);
  };

  const openStudentParentMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStudentParentMenu(
      anchorElStudentParentMenu || event.currentTarget
    );
    setStudentParentMenuOpen(true);
  };

  const hanldeUserLogout = async () => {
    await props.logOutUser();
    Router.push(Routes.HomePage);
  };
  const logo =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/logo.png";
  const menuWhitelist = [
    Routes.AboutUs,
    Routes.TermsOfUse,
    Routes.ContactUs,
    Routes.LessonPackages,
    Routes.HowItWorksInstructors,
    Routes.HowItWorksParents,
    Routes.FAQParents,
    Routes.FAQInstructors,
    Routes.FeaturesParents,
    Routes.FeaturesInstructors,
    Routes.VetInstructor,
    Routes.HomePage
  ];

  const menuDisplayPages = [
    Routes.ApplicationList,
    Routes.BookLessons,
    Routes.Requests,
    Routes.InstructorStudio,
    Routes.ParentStudio
  ] as string[];

  const role = getCookie('role');

  return (
    <header>
      <div className="nabi-header-container nabi-position-relative">
        {(menuWhitelist as string[]).includes(props.router.route) || error ? (
          <React.Fragment>
            <div className="nabi-header-menu hide-on-desktop">
              <Menu onClick={toggleDrawerMenu} color="primary" />
              <DrawerMenu
                isOpen={isDrawerMenuOpen}
                closeMenu={toggleDrawerMenu}
              />
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
                isMenuOpen={Boolean(
                  isInstructorMenuOpen && anchorElInstructorMenu
                )}
                toggleMenu={() => setInstructorMenuOpen(false)}
                anchorEl={anchorElInstructorMenu}
              />
              <a
                href="https://blog.nabimusic.com"
                className="nabi-text-uppercase nabi-text-semibold nabi-margin-left-small"
                target="_blank"
                rel="noreferrer"
              >
                {headerMenuLabels.blog}
              </a>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
        { (props.token && menuDisplayPages.includes(props.router.route)) && (
          <div className="nabi-deskop-menu-icon">
            <Menu onClick={toggleDrawerMenu} color="primary" />
            <CollapsibleSidebar
              isRequesting={props.isRequesting}
              isOpen={isDrawerMenuOpen}
              handleUserLogout={handleUserLogout}
              toggleMenu={toggleDrawerMenu}
              currentRoute={props.router.route}
            />
          </div>
        )}
        <div
          className={`nabi-logo-anchor ${
            token ? "nabi-margin-top-medium-sm" : ""
          }`}
        >
          <Link href={props.token ?
            (role === Role.instructor ?
            Routes.InstructorStudio : Routes.HomePage) : Routes.HomePage}>
            <a>
              <>
                <img className="nabi-text-center" alt="logo" src={logo} />
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

        {(menuWhitelist as string[]).includes(props.router.route) || error ? (
          <div className="nabi-header-button">
            <Link href={Routes.Login} prefetch={false}>
              <a>
                <Button
                  color="primary"
                  variant="contained"
                  className="nabi-responsive-button nabi-margin-left-small"
                >
                  {logIn}
                </Button>
              </a>
            </Link>
          </div>
        ) : (
          ""
        )}
        {(props.router.route.includes("referral") && !error) ||
        (props.router.route == Routes.HomePage && token) ? (
          <div>
            <div className="nabi-header-button nabi-display-flex">
              <Typography
                color="primary"
                className="nabi-text-semibold nabi-margin-right-xsmall nabi-align-self-center"
              >
                {ClaimYour}
              </Typography>
              <HelpIcon color="primary" className="nabi-align-self-center" />
              {avatar && (
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  badgeContent={
                    <Avatar
                      alt="gift"
                      className="nabi-small-avatar-responsive lazyload"
                      data-src="https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/free-trial.jpeg"
                    />
                  }
                >
                  <Avatar
                    alt="referrer-user"
                    src={avatar}
                    className="nabi-big-avatar-responsive nabi-margin-center"
                  />
                </Badge>
              )}

              <Link href={Routes.Registration} prefetch={false}>
                <a className="nabi-align-self-center">
                  <Button
                    color="primary"
                    variant="contained"
                    className="nabi-responsive-button nabi-margin-left-small"
                  >
                    {signUp}
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* {props.router.route === Routes.Dashboard && (
          <div className="nabi-header-button">
            <Button
              color="primary"
              variant="contained"
              className="nabi-responsive-button"
              onClick={hanldeUserLogout}
            >
              {props.isRequesting ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                logOut
              )}
            </Button>
          </div>
        )} */}
      </div>
    </header>
  );
};

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user,
    token,
    actions: {
      logOutUser: { isRequesting, error: logOutError, message }
    }
  } = state.user;
  return {
    user,
    isRequesting,
    message,
    logOutError,
    token
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  logOutUser: () => dispatch(logOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
