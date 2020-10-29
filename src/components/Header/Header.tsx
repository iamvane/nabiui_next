import * as React from 'react';
import Link from 'next/link';

import {
  Grid
} from '@material-ui/core';
import Menu from "@material-ui/icons/Menu";

import dynamic from "next/dynamic";
const Star = dynamic(() => import('@material-ui/icons/Star'), {
  ssr: false,
});

import '../../../assets/scss/Header.scss'
import { Routes } from '../common/constants/Routes';
import { DrawerMenu } from "./DrawerMenu";

/**
 * Header component
 */

interface MenuType {
  label: string;
  route: string;
}

interface Props {
  drawerMenuItems?: MenuType[];
  logoPosition?: string;
  headerMenuItems?: MenuType[];
}
export const Header = (props: Props) => {
  const [isDrawerMenuOpen, setIsDraweMenuOpen] = React.useState(false);

  const toggleDrawerMenu = () => {
    setIsDraweMenuOpen(prevOpen => !prevOpen);
  };

  const logo =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/full-logo.png";

  const renderMenu = () => {
    return props.headerMenuItems.map((menuItem, index) => (
      <Link href={menuItem.route} prefetch={false}>
        <a className={`nabi-text-mediumbold ${props.headerMenuItems.length - 1 !== index ? 'nabi-margin-right-small' : ''}`}>
          {menuItem.label}
        </a>
      </Link>
    ))
  }

  return (
    <div className="nabi-background-white nabi-hide-mobile">
      <div className="nabi-container nabi-position-relative nabi-background-white">
        <Grid container={true} spacing={1} className="nabi-padding-top-xsmall">
          <Grid
            item={true}
            xs={(props.headerMenuItems && props.headerMenuItems.length) ? 4 : 12}
            md={(props.headerMenuItems && props.headerMenuItems.length) ? 1 : 12}
            className={props.headerMenuItems && props.headerMenuItems.length ? '' : 'nabi-text-center'}
          >
            <Link href={Routes.HomePage}>
              <a>
                <img className="nabi-responsive-image" alt="logo" src={logo} id="logo" />
              </a>
            </Link>
          </Grid>
          {props.drawerMenuItems &&
            <Grid item={true} xs={8} className="hide-on-desktop nabi-text-right menu-container">
              <Menu onClick={toggleDrawerMenu} color="primary" />
              <DrawerMenu
                isOpen={isDrawerMenuOpen}
                closeMenu={toggleDrawerMenu}
                menuItems={props.drawerMenuItems}
              />
            </Grid>
          }
          {props.headerMenuItems && props.headerMenuItems.length > 0 && 
            <Grid item={true} xs={11} className="nabi-text-right menu-container hide-on-mobile">
              {renderMenu()}
            </Grid>
          }
        </Grid>
      </div>
    </div>
  )
}
