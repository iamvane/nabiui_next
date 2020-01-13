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
import {
  forParents,
  forInstructors,
  studentParentMenuLabels,
  instructorMenuLabels
} from './constants';

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
          <Typography color="secondary" className="nabi-text-semibold">{forParents}</Typography>
          <MenuList>
            <MenuItem onClick={props.closeMenu}>
              <Link href={Routes.HowItWorksParents}>
                <Typography color="primary">
                  {studentParentMenuLabels.howItWorks}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={props.closeMenu}>
              <Link href={Routes.FAQParents}>
                <Typography color="primary">
                  {studentParentMenuLabels.faqs}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={props.closeMenu}>
              <Link href={Routes.LessonPackages}>
                <Typography color="primary">
                  {studentParentMenuLabels.lessonPackages}
                </Typography>
              </Link>
            </MenuItem>
            {/* <MenuItem onClick={props.closeMenu}>
              <Link href={Routes.FeaturesParents}>
                <Typography color="primary">
                  {studentParentMenuLabels.features}
                </Typography>
              </Link>
            </MenuItem> */}
            <Link href={Routes.RegistrationParent}>
              <Button color="primary" variant="contained" className="nabi-responsive-button">{studentParentMenuLabels.start}</Button>
            </Link>
            <Typography color="secondary" className="nabi-text-semibold nabi-margin-top-medium">{forInstructors}</Typography>
            <MenuItem onClick={props.closeMenu}>
              <Link href={Routes.HowItWorksInstructors}>
                <Typography color="primary">
                  {instructorMenuLabels.howItWorks}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={props.closeMenu}>
              <Link href={Routes.FAQInstructors}>
                <Typography color="primary">
                  {instructorMenuLabels.faqs}
                </Typography>
              </Link>
            </MenuItem>
            {/* <MenuItem onClick={props.closeMenu}>
              <Link href={Routes.FeaturesInstructors}>
                <Typography color="primary">
                  {instructorMenuLabels.features}
                </Typography>
              </Link>
            </MenuItem> */}
            <Link href={Routes.RegistrationInstructor}>
              <Button color="primary" variant="contained" className="nabi-responsive-button">{instructorMenuLabels.start}</Button>
            </Link>
          </MenuList>
        </Grid>
      </Drawer>
    </div>
  );
}
