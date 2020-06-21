import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';

import { LessonCardLists } from '../Lessons/LessonCard'
import { Role } from '../../constants/Roles';
import { Routes } from '../common/constants/Routes';
import { NavigationComponent } from './constants';
import { LessonType, NextLesson } from '../Dashboard/models';

import dynamic from "next/dynamic";
const Question = dynamic(() => import('@material-ui/icons/QuestionAnswer'), {
  ssr: false,
});

const StyledRating = withStyles({
  iconFilled: {
    color: '#fff !important',
  },
})(Rating);

interface Props {
  instructorId?: number;
  role?: string;
  lessons?: LessonType[];
  nextLesson?: NextLesson;
}

const FindStudentCard = () => {
  return (
    <>
      <Grid item={true} xs={5} className="nabi-studio-card nabi-border-radius nabi-background-white-md hide-on-mobile nabi-margin-xsmall">
        <Grid item={true} xs={12}>
          <Typography className="nabi-padding-bottom-xsmall">
            {NavigationComponent.NavigationLabels.ConnectWithNewStudents}
          </Typography>
        </Grid>
        <Grid item={true} xs={12} className="hide-on-mobile">
          <Link href={Routes.Requests}>
            <a>
              <Button
                color="primary"
                variant="contained"
                className="nabi-responsive-button"
                size="small"
              >
                {NavigationComponent.NavigationLabels.FindStudents}
              </Button>
            </a>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

const NavigationDesktop = (props: Props) => {
  const [isAvatarMenuOpen, setIsAvatarMenu] = React.useState(false);
  const AvatarStyles = { width: '50px', height: '50px' };
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

  return (
    <>
      <Grid item={true} xs={12} className="hide-on-mobile">
        {(props.role === Role.instructor && !props.lessons.length) && <FindStudentCard />}
        {(props.role === Role.instructor && props.lessons.length > 0)  && <LessonCardLists
          lessons={props.lessons as LessonType[]}
          nextLesson={props.nextLesson}
        />}
      </Grid>
    </>
  );
};

export default NavigationDesktop;
