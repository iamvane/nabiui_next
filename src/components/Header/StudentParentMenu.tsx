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
import { studentParentMenuLabels } from './constants';

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  anchorEl: HTMLElement;
}

export const StudentParentMenu = (props: Props) => {
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
                  <Link href={Routes.HowItWorksParents}>
                    <a>
                      <Typography color="primary">
                        {studentParentMenuLabels.howItWorks}
                      </Typography>
                    </a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={props.toggleMenu}>
                  <Link href={Routes.FAQParents}>
                    <a>
                      <Typography color="primary">
                        {studentParentMenuLabels.faqs}
                      </Typography>
                    </a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={props.toggleMenu}>
                  <Link href={Routes.LessonPackages}>
                    <a>
                      <Typography color="primary">
                        {studentParentMenuLabels.lessonPackages}
                      </Typography>
                    </a>
                  </Link>
                </MenuItem>
                {/* <MenuItem onClick={props.toggleMenu}>
                  <Link href={Routes.FeaturesParents}>
                    <a>
                      <Typography color="primary">
                        {studentParentMenuLabels.features}
                      </Typography>
                    </a>
                  </Link>
                </MenuItem> */}
                <Link href={Routes.RegistrationParent}>
                  <a>
                    <Button color="primary" variant="contained" className="nabi-responsive-button">{studentParentMenuLabels.start}</Button>
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
