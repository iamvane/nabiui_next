import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';

import { Routes } from '../common/constants/Routes';
import { instructorMenuLabels } from './constants';

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  anchorEl: HTMLElement;
}

export const InstructorMenu = (props: Props) => {
  return (
    <Popper
      open={props.isMenuOpen}
      transition={true}
      anchorEl={props.anchorEl}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className="nabi-padding-right-small nabi-padding-left-small">
            <ClickAwayListener onClickAway={props.toggleMenu}>
              <MenuList>
                <MenuItem onClick={props.toggleMenu}>
                  <Link href={Routes.HowItWorksInstructors}>
                    <Typography color="primary">
                      {instructorMenuLabels.howItWorks}
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={props.toggleMenu}>
                  <Link href={Routes.FAQInstructors}>
                    <Typography color="primary">
                      {instructorMenuLabels.faqs}
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={props.toggleMenu}>
                  <Link href={Routes.FeaturesInstructors}>
                    <Typography color="primary">
                      {instructorMenuLabels.features}
                    </Typography>
                  </Link>
                </MenuItem>
                <Link href={Routes.RegistrationInstructor}>
                  <Button color="primary" variant="contained" className="nabi-responsive-button">{instructorMenuLabels.start}</Button>
                </Link>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
