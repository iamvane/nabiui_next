import * as React from 'react';
import Link from 'next/link';

import {
  Avatar,
  // Badge,
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  Icon,
  // IconButton,
  MenuList,
  MenuItem,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';

import { Role } from '../../constants/Roles';
import { Routes } from '../common/constants/Routes';
import { NavigationComponent } from './constants';
import dynamic from "next/dynamic";
const Question = dynamic(() => import('@material-ui/icons/QuestionAnswer'), {
  ssr: false,
});

interface Props {
  instructorId?: number;
  role?: string;
}

const NavigationDesktop = (props: Props) => {
  const [isAvatarMenuOpen, setIsAvatarMenu] = React.useState(false);
  const [
    anchorElAvatarMenu,
    setAnchorElAvatarMenu
  ] = React.useState<null | HTMLElement>(null);

  const toggleAvatarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAvatarMenu(
      anchorElAvatarMenu || event.currentTarget
    );
    setIsAvatarMenu(prevOpen => !prevOpen);
  };

  return(
    <Grid container={true}>
      <Grid item={true} xs={8} className="hide-on-mobile">
        <ul className="main-navigation nabi-text-decoration-underline-hover">
          <li>
            <Typography className="nabi-margin-top-small">
              <Link href={Routes.Dashboard}>
                <a>{NavigationComponent.NavigationLabels.Home}</a>
              </Link>
            </Typography>
          </li>
          {props.role === Role.instructor ?
            <React.Fragment>
              {/* <li>
                <Typography>
                  <Link href={Routes.Applications}>
                    <a>{NavigationComponent.NavigationLabels.Applications}</a>
                  </Link>
                </Typography>
              </li> */}
              {/* <li>
                <Typography>
                  <Link href={Routes.Lessons}>
                  <a>{NavigationComponent.NavigationLabels.Lessons}</a>
                  </Link>
                </Typography>
              </li> */}
              <li>
                <Typography>
                  <Link href={Routes.Requests}>
                    <a>{NavigationComponent.NavigationLabels.JobRequests}</a>
                  </Link>
                </Typography>
              </li>
              <li>
                <Typography>
                  <Link href={'/profile/' + props.instructorId}>
                    <a>{NavigationComponent.NavigationLabels.Profile}</a>
                  </Link>
                </Typography>
              </li>
              {/* <li>
                <Typography>
                  <Link href={Routes.FAQInstructors}>
                    <a>{NavigationComponent.NavigationLabels.Help}</a>
                  </Link>
                </Typography>
              </li> */}
            </React.Fragment>
            : <React.Fragment>
              <li>
                <Typography>
                  <Link href={Routes.BuildRequest + '/request'}>
                    <a>{NavigationComponent.NavigationLabels.RequestInstructor}</a>
                  </Link>
                </Typography>
              </li>
            </React.Fragment>
          }
          {/* <li>
            <Typography>
              <Link href={Routes.Referrals}>
                <a>{NavigationComponent.NavigationLabels.Referrals}</a>
              </Link>
            </Typography>
          </li> */}
        </ul>
      </Grid>
      <Grid
        className="secondary-navigation hide-on-mobile nabi-text-right nabi-padding-right-medium"
        item={true}
        xs={4}
      >
        <ul>
         <li>
            <Typography>
              <Link href={Routes.FAQInstructors}>
                <a>{NavigationComponent.NavigationLabels.Help}</a>
              </Link>
            </Typography>
          </li>
        </ul>
        </Grid>
        {/* <div className="nabi-display-inline-block nabi-margin-right-xsmall">
          <Badge badgeContent={0} invisible={true} color="primary">
            <IconButton aria-label="Notifications">
              <Icon>notifications</Icon>
            </IconButton>
          </Badge>
        </div> */}
        {/* <div className="nabi-display-inline-block nabi-margin-right-small">
          <Badge badgeContent={4} color="primary">
            <IconButton aria-label="Chat">
              <Icon>chat</Icon>
            </IconButton>
          </Badge>
        </div> */}
        {/* <div
          onClick={toggleAvatarMenu}
          className="secondary-navigation-avatar nabi-display-inline-block nabi-cursor-pointer"
        >
          <Avatar src={'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabiBannerImage.jpg'} />
        </div>
        <Popper
          className="secondary-navigation-avatar-menu"
          open={isAvatarMenuOpen}
          transition={true}
          anchorEl={anchorElAvatarMenu}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className="nabi-padding-right-small nabi-padding-left-small">
                <ClickAwayListener onClickAway={() => setIsAvatarMenu(false)}>
                  <MenuList>
                    {/* <MenuItem onClick={toggleAvatarMenu}>
                      <Typography>
                        <Link href={Routes.Profile}>
                          <a className="nabi-text-decoration-underline-hover">{NavigationComponent.NavigationLabels.Profile}</a>
                        </Link>
                      </Typography>
                    </MenuItem> */}
                    {/* <MenuItem onClick={toggleAvatarMenu}>
                      <Typography>
                        <Link href={Routes.Settings}>
                          <a className="nabi-text-decoration-underline-hover">{NavigationComponent.NavigationLabels.Settings}</a>
                        </Link>
                      </Typography>
                    </MenuItem> */}
                    {/* <MenuItem onClick={toggleAvatarMenu}>
                      <Typography>
                        <Link href={Routes.MyInstructors}>
                          <a className="nabi-text-decoration-underline-hover">{NavigationComponent.NavigationLabels.Instructors}</a>
                        </Link>
                      </Typography>
                    </MenuItem> */}
                    {/* <Divider /> */}
                    {/* <MenuItem onClick={toggleAvatarMenu}>
                      <Typography>
                        <Link href={Routes.FAQInstructors}>
                          <a className="nabi-text-decoration-underline-hover">{NavigationComponent.NavigationLabels.Help}</a>
                        </Link>
                      </Typography>
                    </MenuItem>
                    <Button
                      color="default"
                      variant="contained"
                      className="nabi-text-uppercase nabi-margin-bottom-small"
                      onClick={() => console.log('TODO')}
                    >
                      <Icon>power_settings_new</Icon>
                      <span className="nabi-margin-left-xsmall">{NavigationComponent.logOut}</span>
                    </Button>
                  </MenuList>
                </ClickAwayListener>
              </Paper> */}
            {/* </Grow>
          )}
        </Popper> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default NavigationDesktop;
