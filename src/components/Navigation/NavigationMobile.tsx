import * as React from 'react';

import {
  Grid,
  Typography,
} from '@material-ui/core';

import { CollapsibleSidebar } from '../CollapsibleSidbar/CollapsibleSidbar';
import { NavigationComponent } from './constants';

const logo = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/logo.png";
const referAfriendImg = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/icono-de-regalo.jpg";


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
      <CollapsibleSidebar
        isRequesting={props.isRequesting}
        isOpen={isMobileMenuOpen}
        handleUserLogout={props.handleUserLogout}
        toggleMenu={toggleMobileMenu}
        role={props.role}
      />
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
