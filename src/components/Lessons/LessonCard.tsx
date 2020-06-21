import Link from "next/link";
import moment from "moment";

import {
  Avatar,
  Button,
  Divider,
  Grid,
  Typography,
  withStyles,
  makeStyles
} from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";

import Rating from "@material-ui/lab/Rating";
// import { Routes } from "../common/constants/Routes";
import { LessonComponent } from "./constants";
import { LessonType, NextLesson } from "../Dashboard/models";

const StyledRating = withStyles({
  iconFilled: {
    color: "#fff !important",
  },
})(Rating);

const flexCol = makeStyles(() => ({
  root: {
    display: "flex !important",
    flexDirection: "column"
  }
}));

const lessonCardContainerGridStyle = makeStyles((theme) => ({
  root: {
    display: "flex !important",
    justifyContent: "flex-start !important",
    alignItems: "center !important"
  },
}));

const lessonCardMobileContainerGridStyle = makeStyles((theme) => ({
  root: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    height: "100% !important"
  },
}));

const lessonCardItemGridStyle = makeStyles((theme) => ({
  root: {
    display: "flex !important",
    justifyContent: "space-around !important",
    width: "45%"
  },
}));

const lessonCardMobileItemGridStyle = makeStyles((theme) => ({
  root: {
    display: "flex !important",
    justifyContent: "space-evenly !important",
    width: "50%"
  },
}));

const lessonCardGradeLessonItemGridStyle = makeStyles((theme) => ({
  root: {
    display: "flex !important",
    justifyContent: "space-around !important",
    flexDirection: "column",
  },
}));

const lessonCardMobileGradeLessonItemGridStyle = makeStyles((theme) => ({
  root: {
    display: "flex !important",
    justifyContent: "space-evenly !important",
    flexDirection: "column",
  },
}));

const dividerMarginStyle = makeStyles(() => ({
  root: {
    marginRight: "10px"
  }
}))

interface LessonCardProps {
  instrument: string;
  skillLevel: string;
  lessonsRemaining: number;
  studentName?: string;
  age?: number;
}

export const LessonCard = (props: LessonCardProps) => {
  const AvatarStyles = { width: "60px", height: "60px" };
  const gridContainerClasses = lessonCardContainerGridStyle();
  const gridItemClass = lessonCardItemGridStyle();
  const dividerMargin = dividerMarginStyle();
  const lessonCardGradeLessonClass = lessonCardGradeLessonItemGridStyle();
  const flexColClass = flexCol();
  return (
    <Grid container={true} xs={12} className={gridContainerClasses.root}>
      <Grid item={true} className={gridItemClass.root}>
        <Avatar src={""} style={AvatarStyles} className="nabi-margin-center nabi-margin-0" />
        <Grid className={flexColClass.root}>
          <Typography color="primary" className="nabi-text-semibold">
            {props.studentName}
          </Typography>
          <Typography>
            {props.instrument}
          </Typography>
          <Typography>
            {props.age}
          </Typography>
          <Typography>
            {props.skillLevel}
          </Typography>
        </Grid>
      </Grid>
      <Divider orientation="vertical" className={dividerMargin.root} flexItem />
      <Grid className={lessonCardGradeLessonClass.root}>
        <Link href={"#"}>
          <a>
            <Button
              color="primary"
              variant="contained"
              className="nabi-padding-xxsmall"
              size="small"
            >
              <StyledRating defaultValue={1} name="customized-color" max={1} size="small" />
              {LessonComponent.LessonCardLabels.GradeLesson}
            </Button>
          </a>
        </Link>
        <Typography>
          {`${props.lessonsRemaining} lesson${props.lessonsRemaining > 1 ? "s" : ""} remaining`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export const LessonCardMobile = (props: LessonCardProps) => {
  const gridContainerClasses = lessonCardMobileContainerGridStyle();
  const gridItemClass = lessonCardMobileItemGridStyle();
  const lessonCardGradeLessonClass = lessonCardMobileGradeLessonItemGridStyle();
  const dividerMargin = dividerMarginStyle();
  const flexColClass = flexCol();
  const AvatarStyles = { width: "50px", height: "50px" };
  return (
    <Grid item={true} xs={12} className={gridContainerClasses.root}>
      <Grid className={gridItemClass.root}>
        <Avatar src={""} style={AvatarStyles} className="nabi-margin-center nabi-margin-0" />
        <Grid className={flexColClass.root}>
          <Typography color="primary" className="nabi-text-semibold">
            {props.studentName}
          </Typography>
          <Typography>
            {props.instrument}
          </Typography>
          <Typography>
            {props.age}
          </Typography>
          <Typography>
            {props.skillLevel}
          </Typography>
        </Grid>
      </Grid>
      <Divider orientation="vertical" className={dividerMargin.root} flexItem />
      <Grid className={lessonCardGradeLessonClass.root}>
        <Link href={"#"}>
          <a>
            <Button
              color="primary"
              variant="contained"
              className="nabi-padding-xxsmall"
              size="small"
            >
              <StyledRating defaultValue={1} name="customized-color" max={1} size="small" />
              {LessonComponent.LessonCardLabels.GradeLesson}
            </Button>
          </a>
        </Link>
        <Typography>
          {`${props.lessonsRemaining} lesson${props.lessonsRemaining > 1 ? "s" : ""} remaining`}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface LessonCardListProps {
  lessons: LessonType[];
  nextLesson: NextLesson;
  mobile?: boolean;
}

const lessonCardListItemStyle = makeStyles(() =>( {
  root: {
    backgroundColor: "#fff !important",
    height: "130px !important",
    padding: "25px !important",
    borderRadius: "17px",
    margin: "5px !important",
    width: "45% !important"
  }
}));

const cardListGridHeaderContainerStyle = makeStyles(() => ({
  root: {
    display: "flex !important",
    alignItems: "center !important",
    backgroundColor: "#fff !important",
	  height: "50px !important",
    padding: "5px !important",
    marginBottom: "20px !important",
  }
}))

const cardListGridHeaderTextWrapperStyle = makeStyles(() => ({
  root: {
    display: "flex !important",
    flexDirection: "column",
    marginLeft: "20px !important"
  }
}))

const spaceBetween = makeStyles(() => ({
  root: {
    display: "flex !important",
    justifyContent: "space-between !important"
  }
}))

export const LessonCardLists = (props: LessonCardListProps) => {
  const lessonCardListClass = lessonCardListItemStyle();
  const cardListHeaderClass = cardListGridHeaderContainerStyle();
  const cardListTextWrapperClass = cardListGridHeaderTextWrapperStyle();
  const spaceBetweenClass = spaceBetween();
  const lessonsLists = props.lessons.map((lesson) => {
    return (
      <Grid item={true} className={lessonCardListClass.root}>
        <LessonCard
          key={lesson.bookingId}
          studentName={lesson.studentName}
          age={lesson.age}
          skillLevel={lesson.skillLevel}
          lessonsRemaining={lesson.lessonsRemaining}
          instrument={lesson.instrument}
        />
      </Grid>
    );
  });
  const studentName = props.nextLesson.student_details ? props.nextLesson.student_details[0].name : "";
  return (
    <>
      <Grid container={true} xs={12} className={cardListHeaderClass.root}>
        <AccessAlarmIcon color="primary" />
        <Grid className={cardListTextWrapperClass.root}>
          <Typography className="nabi-text-size-small">
            {`Next Lesson: ${moment(props.nextLesson.date).format("dddd, MMMM Do YYYY")} with ${studentName}`}
          </Typography>
          <Typography color="primary" className="nabi-text-size-small nabi-text-semibold">
            Join: https://us02web.zoom.us/j/83659982276
          </Typography>
        </Grid>
      </Grid>
      <Grid className={spaceBetweenClass.root} container={true} xs={12}>
        {lessonsLists}
      </Grid>
    </>
  )
}

const cardListMobileGridHeaderContainerStyle = makeStyles(() => ({
  root: {
    display: "flex !important",
    alignItems: "center !important",
    backgroundColor: "#fff !important",
    marginBottom: "20px !important",
    borderRadius: "10px"

  }
}))

const lessonCardListMobileItemStyle = makeStyles(() =>( {
  root: {
    backgroundColor: "#fff !important",
    height: "100px !important",
    borderRadius: "10px",
    marginBottom: "20px !important",
    width: "100%"
  }
}));

const cardListMobileGridHeaderTextWrapperStyle = makeStyles(() => ({
  root: {
    display: "flex !important",
    flexDirection: "column",
    marginLeft: "5px !important",
    width: "80% !important"
  }
}))

export const LessonCardListsMobile = (props: LessonCardListProps) => {
  const lessonCardListClass = lessonCardListMobileItemStyle();
  const cardListHeaderClass = cardListMobileGridHeaderContainerStyle();
  const cardListTextWrapperClass = cardListMobileGridHeaderTextWrapperStyle();
  const lessonsLists = props.lessons.map((lesson) => {
    return (
      <Grid className={lessonCardListClass.root}>
        <LessonCardMobile
          key={lesson.bookingId}
          studentName={lesson.studentName}
          age={lesson.age}
          skillLevel={lesson.skillLevel}
          lessonsRemaining={lesson.lessonsRemaining}
          instrument={lesson.instrument}
        />
      </Grid>
    );
  });
  const studentName = props.nextLesson.student_details ? props.nextLesson.student_details[0].name : "";
  return (
    <>
      <Grid container={true} className={cardListHeaderClass.root}>
        <AccessAlarmIcon color="primary" />
        <Grid className={cardListTextWrapperClass.root}>
          <Typography className="nabi-text-size-xsmall nabi-width-100">
            {`Next Lesson: ${moment(props.nextLesson.date).format("dddd, MMM Do YY")}`}
          </Typography>
          <Typography className="nabi-flex nabi-flex-justify-content-center nabi-text-size-xsmall nabi-width-100">
            {`with ${studentName}`}
          </Typography>
          <Typography noWrap={true} color="primary" className="nabi-text-size-xsmall nabi-text-semibold nabi-width-100">
            Join: https://us02web.zoom.us/j/83659982276
          </Typography>
        </Grid>
      </Grid>
      {lessonsLists}
    </>
  )
}
