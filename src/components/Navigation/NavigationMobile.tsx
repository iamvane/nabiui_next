import * as React from 'react';
import Link from 'next/link';

import {
  Badge,
  Button,
  Divider,
  Drawer,
  Grid,
  Icon,
  IconButton,
  MenuList,
  MenuItem,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { Role } from '../../constants/Roles';
import { Routes } from '../common/constants/Routes';
import { NavigationComponent } from './constants';
import dynamic from "next/dynamic";
const Menu = dynamic(() => import('@material-ui/icons/Menu'), {
  ssr: false,
});

const Power = dynamic(() => import('@material-ui/icons/Power'), {
  ssr: false,
});

const logo = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/logo.png";

// const Notifications = dynamic(() => import('@material-ui/icons/Notifications'), {
//   ssr: false,
// });

interface Props {
  instructorId?: number;
  role?: string;
  handleUserLogout?: () => void;
  isRequesting?: boolean;
}

const NavigationMobile: React.StatelessComponent<Props> = props => {
  const [isMobileMenuOpen, setIsMobileMenu] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenu(prevOpen => !prevOpen);
  };

  return(
    <Grid container={true}>
      <Grid item={true} xs={11} className="hide-on-desktop">
      <IconButton className="nabi-display-inline-block" onClick={toggleMobileMenu} aria-label="Menu">
        <Menu className="nabi-color-nabi"  />
      </IconButton>
      <Drawer
        open={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        classes={{
          paper: "nabi-mobile-width"
        }}
      >
        <MenuList
          className="nabi-padding-right-small nabi-padding-left-small"
          tabIndex={0}
          role="button"
          onClick={toggleMobileMenu}
          onKeyDown={toggleMobileMenu}
        >
          <MenuItem
            classes={{
              root: "nabi-mobile-item"
            }}
          >
            <div className="nabi-mobile-drawer-header-container">
              <Link href={Routes.Dashboard}>
                <a className="nabi-mobile-drawer-image-link">
                  <>
                    <img className="nabi-text-center nabi-mobile-drawer-image" alt="logo" src={logo} />
                    <p
                      id="nabi-logo-text"
                      className="nabi-text-center nabi-font-montserrat nabi-text-extrabold"
                    >
                      {NavigationComponent.nabiMusic}
                    </p>
                  </>
                </a>
              </Link>
            </div>
          </MenuItem>
          <Divider />
          {props.role === Role.instructor ?
            <React.Fragment>
         
            {/* <MenuItem>
              <Typography>
                <Link href={Routes.Applications}>
                  <a>{NavigationComponent.NavigationLabels.Applications}</a>
                </Link>
              </Typography>
            </MenuItem> */}
            {/* <MenuItem>
              <Typography>
                <Link href={Routes.Lessons}>
                  <a>{NavigationComponent.NavigationLabels.Lessons}</a>
                </Link>
              </Typography>
            </MenuItem> */}
            <MenuItem>
              <Typography>
                <Link href={Routes.Requests}>
                  <a>{NavigationComponent.NavigationLabels.JobRequests}</a>
                </Link>
              </Typography>
            </MenuItem>

            {/* <Divider />
            <MenuItem>
              <Badge className="badge-menu-item" badgeContent={4} color="primary">
                <Typography className="nabi-margin-right-small">
                  <Link href={Routes.Messages}>
                    <a>{NavigationComponent.NavigationLabels.Messages}</a>
                  </Link>
                </Typography>
              </Badge>
            </MenuItem> */}
            <MenuItem>
              <Typography>
                <Link href={'/profile/' + props.instructorId}>
                  <a>{NavigationComponent.NavigationLabels.Profile}</a>
                </Link>
              </Typography>
            </MenuItem>
          </React.Fragment> :
          <React.Fragment>
            <MenuItem
              classes={{
                root: "nabi-mobile-item"
              }}
            >
              <Typography>
                <Link href={Routes.BuildRequest + '/request'}>
                  <a className="nabi-mobile-typography">{NavigationComponent.NavigationLabels.Calendar}</a>
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem
              classes={{
                root: "nabi-mobile-item"
              }}
            >
              <Typography>
                <Link href={Routes.BuildRequest + '/request'}>
                  <a className="nabi-mobile-typography">{NavigationComponent.NavigationLabels.ViewApplications}</a>
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem
              classes={{
                root: "nabi-mobile-item"
              }}
            >
              <Typography>
                <Link href={Routes.BuildRequest + '/request'}>
                  <a className="nabi-mobile-typography">{NavigationComponent.NavigationLabels.RequestInstructor}</a>
                </Link>
              </Typography>
            </MenuItem>

            <MenuItem
              classes={{
                root: "nabi-mobile-item"
              }}
            >
              <Typography>
                <Link href={Routes.BuildRequest + '/request'}>
                  <a className="nabi-mobile-typography">{NavigationComponent.NavigationLabels.ReferAFriend}</a>
                </Link>
              </Typography>
            </MenuItem>
          </React.Fragment>
          
          }
          {/* <MenuItem>
              <Typography>
                <Link href={Routes.Referrals}>
                  <a>{NavigationComponent.NavigationLabels.Referrals}</a>
                </Link>
              </Typography>
            </MenuItem> */}
          {/* <MenuItem>
            <Typography>
              <Link href={Routes.Settings}>
                <a>{NavigationComponent.NavigationLabels.Settings}</a>
              </Link>
            </Typography>
          </MenuItem> */}
          <Divider />
          <MenuItem
            classes={{
              root: "nabi-mobile-item"
            }}
          >
            <Typography
            >
              <Link href={Routes.FAQInstructors}>
                <a className="nabi-mobile-typography">{NavigationComponent.NavigationLabels.Setting}</a>
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem
            classes={{
              root: "nabi-mobile-item"
            }}
          >
            <Typography
            >
              <Link href={Routes.FAQInstructors}>
                <a className="nabi-mobile-typography">{NavigationComponent.NavigationLabels.SendNabiFeedback}</a>
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem
            classes={{
              root: "nabi-mobile-item"
            }}
          >
            <Typography
            >
              <Link href={Routes.FAQInstructors}>
                <a className="nabi-mobile-typography">{NavigationComponent.NavigationLabels.Help}</a>
              </Link>
            </Typography>
          </MenuItem>
          {/* <Button
            color="default"
            variant="contained"
            className="nabi-text-uppercase nabi-margin-bottom-small"
            onClick={() => console.log('TODO')}
          >
            <Power className="nabi-color-nabi" />
            <span className="nabi-margin-left-xsmall">{NavigationComponent.logOut}</span>
          </Button> */}
        </MenuList>
        <div className="nabi-mobile-logout-button-wrapper">
          <Button
            variant="contained"
            className="nabi-responsive-button"
            onClick={props.handleUserLogout}
          >
            {props.isRequesting ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              NavigationComponent.logOut
            )}
          </Button>
        </div>
      </Drawer>
      <Typography
        color="primary"
        className="nabi-text-uppercase nabi-display-inline-block nabi-text-mediumbold"
      >
        {NavigationComponent.menuText}
      </Typography>
      </Grid>
      {/* <Grid item={true} xs={1} className="nabi-text-right hide-on-desktop">
        <Badge badgeContent={0} invisible={true} color="primary">
          <IconButton aria-label="Notifications">
            <Notifications />
          </IconButton>
        </Badge>
      </Grid> */}
    </Grid>
  );
};

export default NavigationMobile;
