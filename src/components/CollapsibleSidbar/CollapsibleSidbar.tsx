import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Divider,
  Drawer,
  MenuList,
  MenuItem,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { Role } from '../../constants/Roles';
import { Routes } from '../common/constants/Routes';
import { NavigationComponent } from './constants';

const referAfriendImg = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/icono-de-regalo.jpg";
const logo = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/logo.png";

const StudentMenuItems = () => {
  const items = [
    // {
    //   label: NavigationComponent.NavigationLabels.Calendar,
    //   url: ''
    // },
    // {
    //   label: NavigationComponent.NavigationLabels.ViewApplications,
    //   url: ''
    // },
    {
      label: NavigationComponent.NavigationLabels.Studio,
      url: Routes.Dashboard
    },
    {
      label: NavigationComponent.NavigationLabels.RequestInstructor,
      url: Routes.BuildRequest + Routes.Request
    },
    // {
    //   label: NavigationComponent.NavigationLabels.ReferAFriend,
    //   url: ''
    // }
  ];

  const studentItems = items.map((item, index) => {
    return (
      <MenuItem
        classes={{
          root: "nabi-mobile-item"
        }}
        key={`${item}-${index}`}
      >
        {item.label === NavigationComponent.NavigationLabels.ReferAFriend && (
          <img src={referAfriendImg} className="nabi-mobile-icon-large" alt="location-icon" />
        )}
        <Typography>
          <Link href={item.url}>
            <a className="nabi-mobile-typography">{item.label}</a>
          </Link>
        </Typography>
      </MenuItem>
    )
  });
  return (
    <>
      {studentItems}
    </>
  )
}

const InstructorMenuItems = ({ currentRoute }) => {
  const items = [
    // NavigationComponent.NavigationLabels.Calendar,
    {
      label: currentRoute === Routes.InstructorDashboard ? NavigationComponent.NavigationLabels.Jobs : NavigationComponent.NavigationLabels.Studio,
      url:  currentRoute === Routes.InstructorDashboard ? Routes.Requests : Routes.InstructorDashboard
    }
    // NavigationComponent.NavigationLabels.ReferAFriend
  ];

  const instructorItems = items.map((item, index) => {
    return (
      <MenuItem
        classes={{
          root: "nabi-mobile-item"
        }}
        key={`${item}-${index}`}
      >
        {item.label === NavigationComponent.NavigationLabels.ReferAFriend && (
          <img src={referAfriendImg} className="nabi-mobile-icon-large" alt="location-icon" />
        )}
        <Typography>
          <Link href={item.url}>
            <a className="nabi-mobile-typography">{item.label}</a>
          </Link>
        </Typography>
      </MenuItem>
    )
  })
  return (
    <>
      {instructorItems}
    </>
  )
}

const GoToStudioButton = () => {
  return (
    <div className="nabi-mobile-button-wrapper">
      <Link href={Routes.Dashboard}>
        <a>
          <Button
            color="primary"
            variant="contained"
            className="nabi-responsive-button"
          >
            {NavigationComponent.NavigationLabels.GoToStudio}
          </Button>
        </a>
      </Link>
    </div>
  )
}

const FindJobsButton = () => {
  return (
    <div className="nabi-mobile-button-wrapper">
      <Link href={Routes.Requests}>
        <a>
          <Button
            color="primary"
            variant="contained"
            className="nabi-responsive-button"
          >
            {NavigationComponent.NavigationLabels.FindJobs}
          </Button>
        </a>
      </Link>
    </div>
  )
}

interface Props {
  role?: string;
  toggleMenu?: () => void;
  isOpen?: boolean;
  handleUserLogout?: () => void;
  isRequesting?: boolean;
  currentRoute?: string;
}

export const CollapsibleSidebar = (props: Props) => {
  return (
    <Drawer
      open={props.isOpen}
      onClose={props.toggleMenu}
      classes={{
        paper: "nabi-mobile-width"
      }}
    >
      <MenuList
        className="nabi-padding-right-small nabi-padding-left-small"
        tabIndex={0}
        role="button"
        onClick={props.toggleMenu}
        onKeyDown={props.toggleMenu}
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
        {props.role && (
          <>
            {(props.role === Role.student || props.role === Role.parent) && (
              <>
                <StudentMenuItems />
              </>
            )}

            {props.role === Role.instructor && (
              <>
                { (Routes.Requests === props.currentRoute) && <GoToStudioButton />}
                { (Routes.InstructorDashboard === props.currentRoute) &&  <FindJobsButton />}
                <InstructorMenuItems currentRoute={props.currentRoute} />
              </>
            )}
          </>
        )
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
          {/* <Typography
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
        > */}
          <Typography>
            <Link href={Routes.ContactUs}>
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
  )
}
