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
  Typography
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

// const Notifications = dynamic(() => import('@material-ui/icons/Notifications'), {
//   ssr: false,
// });

interface Props {
  instructorId?: number;
  role?: string;
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
      >
        <MenuList
          className="nabi-padding-right-small nabi-padding-left-small"
          tabIndex={0}
          role="button"
          onClick={toggleMobileMenu}
          onKeyDown={toggleMobileMenu}
        >
          <MenuItem>
            <Typography>
              <Link href={Routes.Dashboard}>
                <a>{NavigationComponent.NavigationLabels.Home}</a>
              </Link>
            </Typography>
          </MenuItem>
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
            <MenuItem>
              <Typography>
                <Link href={Routes.BuildRequest + '/request'}>
                  <a>{NavigationComponent.NavigationLabels.RequestInstructor}</a>
                </Link>
              </Typography>
            </MenuItem>
          </React.Fragment>
          
          }
          <MenuItem>
              <Typography>
                <Link href={Routes.Referrals}>
                  <a>{NavigationComponent.NavigationLabels.Referrals}</a>
                </Link>
              </Typography>
            </MenuItem>
          <Divider />
          {/* <MenuItem>
            <Typography>
              <Link href={Routes.Settings}>
                <a>{NavigationComponent.NavigationLabels.Settings}</a>
              </Link>
            </Typography>
          </MenuItem> */}
          <MenuItem>
            <Typography>
              <Link href={Routes.FAQInstructors}>
                <a>{NavigationComponent.NavigationLabels.Help}</a>
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
