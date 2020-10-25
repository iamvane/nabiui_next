import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Drawer,
  Grid,
  MenuItem,
  MenuList,
  Typography
} from '@material-ui/core';

import { Routes } from '../common/constants/Routes';
import { menuLabels } from './constants';

interface Props {
  isOpen: boolean;
  closeMenu: () => void;
}

export const DrawerMenu = (props: Props) => {
  return (
    <div>
      <Drawer
        open={props.isOpen}
        onClose={props.closeMenu}
      >
        <Grid item={true} xs={10} className="nabi-margin-center nabi-padding-top-small nabi-padding-bottom-small">
          <MenuList>
            <MenuItem onClick={props.closeMenu}>
              <Link prefetch={false} href={Routes.HowItWorksParents}>
                <Typography color="primary">
                  {menuLabels.howItWorks}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={props.closeMenu}>
              <Link prefetch={false} href={Routes.RegistrationInstructor}>
                <Typography color="primary">
                  {menuLabels.teach}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={props.closeMenu}>
              <Link prefetch={false} href={Routes.Login}>
                <Typography color="primary">
                  {menuLabels.login}
                </Typography>
              </Link>
            </MenuItem>
          </MenuList>
        </Grid>
      </Drawer>
    </div>
  );
}
