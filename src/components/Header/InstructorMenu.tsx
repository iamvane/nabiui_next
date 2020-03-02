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
                  <Link prefetch={false} href={Routes.HowItWorksInstructors}>
                    <a>
                      <Typography color="primary">
                        {instructorMenuLabels.howItWorks}
                      </Typography>
                    </a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={props.toggleMenu}>
                  <Link prefetch={false} href={Routes.FAQInstructors}>
                    <a>
                      <Typography color="primary">
                        {instructorMenuLabels.faqs}
                      </Typography>
                    </a>
                  </Link>
                </MenuItem>
                {/* <MenuItem onClick={props.toggleMenu}>
                  <Link prefetch={false} href={Routes.FeaturesInstructors}>
                    <a>
                      <Typography color="primary">
                        {instructorMenuLabels.features}
                      </Typography>
                    </a>
                  </Link>
                </MenuItem> */}
                <Link prefetch={false} href={Routes.RegistrationInstructor}>
                  <a>
                    <Button color="primary" variant="contained" className="nabi-responsive-button">{instructorMenuLabels.start}</Button>
                  </a>
                </Link>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
