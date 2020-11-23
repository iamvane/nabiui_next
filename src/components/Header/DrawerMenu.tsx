import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import Router from 'next/router';
import Link from 'next/link';
import {
  logOutUser
} from '../../redux/actions/UserActions';
import { StoreState } from '../../redux/reducers/store';
import SnackBar from '../common/SnackBar';
import { Routes } from '../common/constants/Routes';
import {
  Button,
  CircularProgress,
  Drawer,
  Grid,
  MenuItem,
  MenuList,
  Typography
} from '@material-ui/core';
import { DrawerMenuComponent } from "./constants";

interface MenuType {
  label: string;
  route: string;
}

interface StateProps {
  isLoggingOut: boolean;
  logoutError: string;
  logoutMessage: string;
}

interface OwnProps {
  isOpen: boolean;
  closeMenu: () => void;
  menuItems: MenuType[];
  privateRoute?: boolean;
}

interface DispatchProps {
  logOutUser: () => void;
}

interface Props extends
  OwnProps,
  DispatchProps,
  StateProps { }

export const DrawerMenu = (props: Props) => {
  const [logout, setLogout] = React.useState(false);
  const [displaySnackBar, setDisplaySnackBar] = React.useState(false);

  React.useEffect(() => {
    if (!logout) {
      return;
    }

    if (props.logoutError && logout) {
      setDisplaySnackBar(true)
    }

  }, [props.logoutError, logout]);

  React.useEffect(() => {
    if (!logout) {
      return;
    }

    if (props.logoutMessage && logout) {
      Router.push(Routes.HomePage);
      props.closeMenu();
    }

  }, [props.logoutMessage, logout]);

  const handleUserLogout = async (event): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    await props.logOutUser();

    setLogout(true);
    setDisplaySnackBar(false)
  }

  return (
    <div>
      <Drawer
        open={props.isOpen}
        onClose={props.closeMenu}
      >
        <Grid item={true} xs={12} className="nabi-margin-center nabi-padding-top-small nabi-padding-bottom-small">
          <MenuList>
            {props.menuItems && props.menuItems.map((menuItem, index) => (
              <MenuItem onClick={props.closeMenu}>
                <Link prefetch={false} href={menuItem.route}>
                  <Typography color="primary">
                    {menuItem.label}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </MenuList>
          {props.privateRoute &&
            <div className="nabi-mobile-logout-button-wrapper">
              <Button
                variant="contained"
                className="nabi-responsive-button"
                onClick={handleUserLogout}
              >
                {props.isLoggingOut ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                    DrawerMenuComponent.logOut
                  )}
              </Button>
            </div>
          }
        </Grid>
      </Drawer>
      <SnackBar
        isOpen={displaySnackBar}
        message={props.logoutError ? props.logoutError : ''}
        handleClose={() => setDisplaySnackBar(false)}
        variant="error"
      />
    </div>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    user,
    token,
    actions: {
      logOutUser: {
        isRequesting: isLoggingOut,
        error: logoutError,
        message: logoutMessage
      }
    },
  } = state.user;

  return {
    isLoggingOut,
    logoutError,
    logoutMessage
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  logOutUser: () => dispatch(logOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
