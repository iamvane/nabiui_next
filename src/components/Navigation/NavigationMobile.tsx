import * as React from 'react';
import Link from 'next/link';

import {
  Grid,
  Typography,
  Button,
  withStyles,
  makeStyles
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { CollapsibleSidebar } from '../CollapsibleSidbar/CollapsibleSidbar';
import { NavigationComponent } from './constants';
import { LessonType, NextLesson } from '../Dashboard/models';
import { LessonCardListsMobile } from '../Lessons/LessonCard'
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';

const logo = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/logo.png";
const referAfriendImg = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/icono-de-regalo.jpg";


// const Notifications = dynamic(() => import('@material-ui/icons/Notifications'), {
//   ssr: false,
// });
const StyledRating = withStyles({
  iconFilled: {
    color: '#fff !important',
  },
})(Rating);

interface Props {
  instructorId?: number;
  role?: string;
  handleUserLogout?: () => void;
  isRequesting?: boolean;
  lessons?: LessonType[];
  nextLesson?: NextLesson;
}

const findStudentContainerStyle = makeStyles(() => ({
  root: {
    display: "flex !important",
    flexDirection: "column",
    justifyContent: "center !important",
    alignItems: "center !important",
    backgroundColor: "#fff !important",
	  height: "100px !important",
    padding: "5px !important",
    width: "100%",
    borderRadius: "10px"
  }
}))

const findStudentItemStyle = makeStyles(() => ({
  root: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    width: "100% !important"
  }
}));

const findStudentTextWrapperStyle = makeStyles(() => ({
  root: {
    display: "flex !important",
    justifyContent: "center !important",
    width: "100% !important"
  }
}))

const FindStudentCard = () => {
  const findStudentContainerClass = findStudentContainerStyle();
  const findStudentItemClass = findStudentItemStyle();
  const findStudentTextWrapperClass = findStudentTextWrapperStyle();
  return (
    <>
      <Grid container={true} className={findStudentContainerClass.root}>
        <Grid item={true} className={findStudentTextWrapperClass.root}>
          <Typography className="nabi-padding-bottom-xsmall">
            {NavigationComponent.NavigationLabels.ConnectWithNewStudents}
          </Typography>
        </Grid>
        <Grid item={true} className={findStudentItemClass.root}>
          <Link href={Routes.Requests}>
            <a>
              <Button
                color="primary"
                variant="contained"
                className="nabi-padding-xxsmall nabi-text-small-medium"
                size="medium"
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

const NavigationMobile: React.StatelessComponent<Props> = props => {
  const [isMobileMenuOpen, setIsMobileMenu] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenu(prevOpen => !prevOpen);
  };

  return (
    <>
      <Grid item={true} xs={12} className="hide-on-desktop">
        {(props.role === Role.instructor && !props.lessons.length) && <FindStudentCard />}
        {(props.role === Role.instructor && props.lessons.length) > 0 && <LessonCardListsMobile
          lessons={props.lessons as LessonType[]}
          nextLesson={props.nextLesson}
        />}
      </Grid>
      <Grid item={true} xs={11} className="hide-on-desktop">
        <CollapsibleSidebar
          isRequesting={props.isRequesting}
          isOpen={isMobileMenuOpen}
          handleUserLogout={props.handleUserLogout}
          toggleMenu={toggleMobileMenu}
          role={props.role}
        />
      </Grid>
    </>
  );
};

export default NavigationMobile;
