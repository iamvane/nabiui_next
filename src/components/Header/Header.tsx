import * as React from 'react';
import Link from 'next/link';

import {
  Grid
} from 'nabi_web_components';
import Menu from "@material-ui/icons/Menu";

import dynamic from "next/dynamic";
const Star = dynamic(() => import('@material-ui/icons/Star'), {
  ssr: false,
});

//import '../../../assets/scss/Header.scss'
import { getCookie } from "../../utils/cookies";
import { Role } from '../../constants/Roles';
import { Routes } from '../common/constants/Routes';
import DrawerMenu from "./DrawerMenu";

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
  privateRoute?: boolean;
}
export const Header = (props: Props) => {
  const [isDrawerMenuOpen, setIsDraweMenuOpen] = React.useState(false);

  const toggleDrawerMenu = () => {
    setIsDraweMenuOpen(prevOpen => !prevOpen);
  };

  const logo =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/full-logo.png";

  const role = getCookie('role');
  
  const renderMenu = () => {
    return props.headerMenuItems.map((menuItem, index) => (
      <Link href={menuItem.route} prefetch={false} key={index}>
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
            xs={(props.headerMenuItems?.length || props.privateRoute) ? 4 : 12}
            md={(props.headerMenuItems?.length || props.privateRoute) ? 1 : 12}
            className={props.headerMenuItems?.length || props.privateRoute ? '' : 'nabi-text-center'}
          >
            <Link href={
              !props.privateRoute ? Routes.HomePage :
              props.privateRoute && role === Role.instructor ? Routes.InstructorStudio :
              Routes.ParentStudio}
            >
              <a>
                <img className="nabi-responsive-image" alt="logo" src={logo} id="logo" />
              </a>
            </Link>
          </Grid>
          {props.drawerMenuItems &&
            <Grid item={true} xs={8} md={11} className={`${props.privateRoute ? "" : "hide-on-desktop"} nabi-text-right menu-container`}>
              <Menu onClick={toggleDrawerMenu} color="primary" />
              <DrawerMenu
                isOpen={isDrawerMenuOpen}
                closeMenu={toggleDrawerMenu}
                menuItems={props.drawerMenuItems}
                privateRoute={props.privateRoute}
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
