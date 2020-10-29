import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import { useRouter } from "next/router";

import {
  Typography,
  Grid,
  Button,
  TextField,
  Divider,
  CircularProgress
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

import { getCookie } from "../../utils/cookies";

import {
  RateInstructorComponent,
  replaceInstructorName,
  replaceStudentName
} from "./constants";

import SectionTitle from '../common/SectionTitle';

import {
  rateInstructor
} from '../../redux/actions/InstructorActions';
import { StoreState } from '../../redux/reducers/store';

import SnackBar from '../common/SnackBar';
import PageTitle from '../common/PageTitle';
import { Role } from '../../constants/Registration';

export interface Props {
  handleCancel?: () => void;
}

export default function RateInstructor(props: Props) {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [snackbarIsOpen, setSnackbarOpen] = React.useState({
    status: false,
    type: "",
    message: ""
  });

  const router = useRouter();

  const instructorId = router.query.instructorId as string;
  const studentName = router.query.studentName as string;
  const instructorName = router.query.instructorName as string;
  const role = getCookie('role');

  const handleChange = React.useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const target = event.currentTarget;
    let value = target.value as any;
    let name = target.name;
    if (name === 'rating') {
      setRating(value);
    }
    if (name === 'comment') {
      setComment(value);
    }
  }, [rating, comment]);

  const dispatch = useDispatch();
  const rateInstructorAction = bindActionCreators(rateInstructor, dispatch);

  let {
    instructorRatingMessage,
    isRequesingInstructorRating,
    errorRateInstructor,
  } = useSelector((state: StoreState) => {
    const {
      actions: {
        rateInstructor: {
          isRequesting: isRequesingInstructorRating,
          error: errorRateInstructor,
          message: instructorRatingMessage
        }
      }
    } = state.instructor;

    return {
      instructorRatingMessage,
      isRequesingInstructorRating,
      errorRateInstructor,
    };
  });

  React.useEffect(() => {
    if (instructorRatingMessage) {
      setSnackbarOpen({
        status: true,
        message: "Instructor Rating Successful",
        type: "success"
      })
    }
  }, [instructorRatingMessage]);

  React.useEffect(() => {
    if (errorRateInstructor) {
      setSnackbarOpen({
        status: true,
        type: "error",
        message: errorRateInstructor
      })
    }
  }, [errorRateInstructor])

  const handleClick = () => {
    rateInstructorAction({
      rating,
      comment,
      instructorId
    });
  }

  const closeSnackbar = React.useCallback(() => {
    setSnackbarOpen({
      status: false,
      message: "",
      type: ""
    });
  }, [snackbarIsOpen])

  const renderPageTitle = () => {
    const isParent = role === Role.parent
    if (isParent && instructorName) {
      const pageTitle = RateInstructorComponent.PageTitleWithInstructorName
        .replace(replaceInstructorName, instructorName);
      return (
        <PageTitle pageTitle={pageTitle} />
      )
    }
    return (
      <PageTitle pageTitle={RateInstructorComponent.PageTitle} />
    )
  }

  const renderTitle = () => {
    const isParent = role === Role.parent
    if (isParent && studentName) {
      const title = RateInstructorComponent.TitleWithStudentName
        .replace(replaceStudentName, studentName);
      return (
        <p className="nabi-color-nabi nabi-jennasue-title nabi-margin-bottom-zero nabi-margin-top-zero">
          {title}
        </p>
      )
    }
    return (
      <p className="nabi-color-nabi nabi-jennasue-title nabi-margin-bottom-zero nabi-margin-top-zero">
        {RateInstructorComponent.Title}
      </p>
    )
  }

  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md nabi-margin-bottom-large">
      {renderPageTitle()}
      <div className="nabi-display-flex nabi-flex-justify-center">
        <Grid
          container={true}
          className="nabi-background-white nabi-border-radius nabi-padding-small nabi-display-flex nabi-flex-justify-center"
        >
          {renderTitle()}
          <Grid item={true} md={8} xs={12} sm={10}>
            <SectionTitle text={RateInstructorComponent.RatingHeader} />
            <Rating
              color="primary"
              name="rating"
              onChange={handleChange}
            />
            <div className="nabi-margin-top-small">
              <SectionTitle text={RateInstructorComponent.Comment} />
            </div>
            <TextField
              margin="normal"
              name="comment"
              onChange={handleChange}
              required={true}
              multiline={true}
              fullWidth={true}
              rows={6}
              placeholder={RateInstructorComponent.ReviewPlaceholder}
            />

            <Button
              variant="contained"
              color="primary"
              className="nabi-margin-top-small nabi-text-uppercase"
              onClick={handleClick}
              disabled={!comment || !rating ? true : false}
            >
              {isRequesingInstructorRating ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                  <span className="nabi-margin-left-xsmall">{RateInstructorComponent.SubmitReview}</span>
                )}

            </Button>
          </Grid>
        </Grid>
        <SnackBar
          isOpen={snackbarIsOpen.status}
          message={snackbarIsOpen.message}
          handleClose={closeSnackbar}
          variant={snackbarIsOpen.type}
        />
      </div>
    </div>
  );
}
