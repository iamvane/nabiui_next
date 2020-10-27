import * as React from 'react';
import Link from 'next/link';

import {
  Drawer,
  Grid,
  MenuItem,
  MenuList,
  Typography
} from '@material-ui/core';

interface MenuType {
  label: string;
  route: string;
}

interface Props {
  isOpen: boolean;
  closeMenu: () => void;
  menuItems: MenuType[];
}

export const DrawerMenu = (props: Props) => {
  return (
    <div>
      <Drawer
        open={props.isOpen}
        onClose={props.closeMenu}
      >
        <Grid item={true} xs={12} className="nabi-margin-center nabi-padding-top-small nabi-padding-bottom-small">
          <MenuList>
            {props.menuItems && props.menuItems.map((menuItem, index) => (
              <MenuItem onClick={props.closeMenu}>
                <Link prefetch={false} href={menuItem.route}>
                  <Typography color="primary">
                    {menuItem.label}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </MenuList>
        </Grid>
      </Drawer>
    </div>
  );
}
