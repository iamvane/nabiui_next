import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action, AnyAction,
//  Dispatch
} from 'redux';
import {
  Dispatch,
} from 'redux-fixed';

import { RouteComponentProps } from 'react-router';
import Router from "next/router";
import Head from 'next/head';

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { getCookie } from '../../utils/cookies';
import { StoreState } from '../../redux/reducers/store';
import { requestAction } from '../../redux/actions/actions';
import { gradeLesson } from '../../redux/actions/InstructorActions';
import { InstructorActions } from '../../redux/actions/InstructorActionTypes';

import { Routes } from '../common/constants/Routes';
import SnackBar from '../common/SnackBar';
import PageTitle from '../common/PageTitle';
import SectionTitle from '../common/SectionTitle';
import { Header } from '../Header/Header';
import { Footer } from "../common/Footer";
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import PrivateRoute from '../Auth/PrivateRoutes';
import * as constants from './constants';
import { GradeData } from './models';

interface StateProps {
  isRequesting: boolean;
  message: string;
  error: string;
}

interface DispatchProps {
  gradeLesson: (gradeData: GradeData) => void;
  resetGradeLessonMessage: () => void;
}

interface OwnProps {
}

interface Props extends
  OwnProps,
  RouteComponentProps<{}>,
  StateProps,
  DispatchProps { }

export const GradeLesson = (props: Props) => {
  const [grade, setGrade] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [status, setLessonStatus] = React.useState("");
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [circularProgress, displayCircularProgress] = React.useState(false);

  React.useEffect(() => {
    if (props.message) {
      props.resetGradeLessonMessage();
      setSnackbarMessage('Your grade was submitted successfully.')
      setShowSnackbar(true);
      displayCircularProgress(true);
      delayedRedirect(2000).then(() => Router.push(Routes.InstructorStudio));
    }
    if (props.error) {
      setShowSnackbar(true);
      setSnackbarMessage('There was an error processing your request.')
    }
    /* tslint:disable */
  }, [props.message, props.error]);

  function delayedRedirect(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value as any;
    const name = target.name;

    switch (name) {
      case constants.FieldNames.Grade:
        setGrade(Number(value));
        break;

      case constants.FieldNames.Comment:
        setComment(value);
        break;

      case constants.FieldNames.Status:
        setLessonStatus(value ? 'missed' : '');
        break;

      default:
        return;
    }
  }

  const submitLessonGrade = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    const gradeData: GradeData = {
      ...(status !== 'missed' && {
        comment,
        grade
      }),
      ...(status === 'missed' && {
        status
      })
    }
    await props.gradeLesson(gradeData);
  }

  const disable = React.useCallback(
    () => {
      if (status === 'missed') {
        return !status;
      }

      return !grade || !comment;
    }, [status, comment, grade]
  );

  return (
    <div>
      <Header
        drawerMenuItems={constants.menuItems}
        privateRoute={true}
      />
      <div className="nabi-container">
        <Head>
          <title>{pageTitlesAndDescriptions.dashboard.title}</title>
          <meta name="description" content={pageTitlesAndDescriptions.dashboard.description}></meta>
        </Head>
        <PageTitle pageTitle={constants.pageTitle} />
        <div className="nabi-background-white nabi-section nabi-margin-bottom-medium">
          {props.isRequesting || circularProgress ?
            <div className="nabi-text-center">
              <CircularProgress />
            </div>
            :
            <React.Fragment>
              <SectionTitle text={constants.studentNameSection} />
              <Typography className="nabi-margin-bottom-small">{getCookie('lessonStudentName')}</Typography>
              <SectionTitle text={constants.instrumentSection} />
              <Typography className="nabi-margin-bottom-small">{getCookie('lessonInstrument')}</Typography>
              <form noValidate={true} autoComplete="off" onSubmit={submitLessonGrade}>
                <SectionTitle text={constants.missedLesson} />
                <FormControlLabel
                  className="nabi-margin-bottom-xsmall nabi-margin-left-zero"
                  control={
                    <Checkbox

                      name={constants.FieldNames.Status}
                      onChange={handleChange}
                      size="medium"
                    />
                  }
                  label={constants.missedLessonDescription}
                />

                {status !== 'missed' && (
                  <>
                    <SectionTitle text={constants.gradeSection} />
                    <Rating
                      name={constants.FieldNames.Grade}
                      max={3}
                      className="nabi-margin-bottom-small"
                      value={grade}
                      onChange={handleChange}
                    />
                    <SectionTitle text={constants.commentsSection} />
                    <Grid item={true} xs={12} md={6} className="nabi-margin-bottom-small">
                      <TextField
                        name={constants.FieldNames.Comment}
                        margin="normal"
                        onChange={handleChange}
                        multiline={true}
                        fullWidth={true}
                        rows={6}
                        value={comment}
                        placeholder="Tell them how they did during the lesson, what they should practice for next lesson, or any other tip that will help them improve."
                      />
                    </Grid>
                  </>
                )}
                <Grid item={true} xs={12} md={6} className="nabi-margin-bottom-small nabi-margin-top-small">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={disable()}
                    type="submit"
                  >
                    {constants.button}
                  </Button>
                </Grid>
              </form>
            </React.Fragment>}
        </div>
        <SnackBar
          isOpen={showSnackbar}
          message={snackbarMessage}
          handleClose={() => setShowSnackbar(false)}
          variant={props.error ? "error" : "success"}
        />
      </div>
      <Footer />
    </div>
  );
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    actions: {
      gradeLesson: {
        isRequesting,
        error,
        message
      }
    }
  } = state.instructor;

  return {
    isRequesting,
    error,
    message
  };
}

const mapDispatchToProps = (
  dispatch: any,
): DispatchProps => ({
  gradeLesson: (gradeData: GradeData) => dispatch(gradeLesson(gradeData)),
  resetGradeLessonMessage: () => dispatch(requestAction(InstructorActions.RESET_GRADE_LESSON_MESSAGE))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(GradeLesson, 'Private', ['Instructor']));
