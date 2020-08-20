import {
  useState,
  useEffect,
  useCallback
} from 'react';

import Head from 'next/head';
import {
  bindActionCreators
} from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from "next/router";

import {
  Radio,
  CircularProgress,
  Grid,
  RadioGroup,
  FormControlLabel,
  Button
} from '@material-ui/core';

import { setCookie } from "../../utils/cookies";

import {
  fetchStudentsBookingData,
  fetchStudentsBookingLessonsData
} from "../../redux/actions/RequestActions";

import { StoreState } from '../../redux/reducers/store';
import { Routes } from '../common/constants/Routes';
import SnackBar from '../common/SnackBar';
import { SelectChildComponent } from './constants';
import PageTitle from '../common/PageTitle';

export const SelectChild = () => {
  const [showSnackbar, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState("");
  const [selectedChildId, setChildId] = useState(0);
  const [currentStudents, setCurrentStudents] = useState([]);
  const router = useRouter();

  const closeSnackbar = () => setSnackbarOpen(false);

  let {
    instructor,
    students,
    isRequestingStudentsBookingData,
    isRequestingStudentsBookingLessonsData,
    fetchStudentsBookingLessonsError,
    fetchStudentsBookingDataError
  } = useSelector((state: StoreState) => {
    const {
      students,
      instructor,
      actions: {
        fetchStudentsBookingData: {
          isRequesting: isRequestingStudentsBookingData,
          error: fetchStudentsBookingDataError,
        },
        fetchStudentsBookingLessonsData: {
          isRequesting: isRequestingStudentsBookingLessonsData,
          error: fetchStudentsBookingLessonsError
        }
      },
    } = state.requests;

    return {
      instructor,
      students,
      isRequestingStudentsBookingData,
      isRequestingStudentsBookingLessonsData,
      fetchStudentsBookingLessonsError,
      fetchStudentsBookingDataError
    };
  });
  const email = router.query.email as string;
  const dispatch = useDispatch();
  const fetchStudentBookingDataAction = bindActionCreators(fetchStudentsBookingData, dispatch);
  const fetchStudentsBookingLessonsDataAction = bindActionCreators(fetchStudentsBookingLessonsData, dispatch);

  useEffect(() => {
    fetchStudentBookingDataAction(email);
    if (JSON.stringify(students) !== JSON.stringify(currentStudents)) {
      if (students.length === 1) {
        fetchStudentsBookingLessonsDataAction(students[0].id, email)
      } else {
        setCurrentStudents(students);
      }
    }
  }, [JSON.stringify(students)]);

  useEffect(() => {
    if (instructor.avatar) {
      setCookie("studentId", selectedChildId);
      Router.push(`${Routes.BookLessons}/email/${email}/${selectedChildId}`);
    }

  }, [instructor.avatar]);
  useEffect(() => {

    if (fetchStudentsBookingDataError) {
      setSnackbarOpen(true);
      setSnackBarMessage(fetchStudentsBookingDataError);
    }

  }, [JSON.stringify(fetchStudentsBookingDataError)]);

  useEffect(() => {

    if (fetchStudentsBookingLessonsError) {
      setSnackbarOpen(true);
      setSnackBarMessage(fetchStudentsBookingLessonsError);
    }

  }, [JSON.stringify(fetchStudentsBookingLessonsError)]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): any => {
      const target = event.currentTarget;
      const value = target.type === 'checkbox' ? target.checked : target.value as any;
      const name = target.name;

      setChildId(Number(value));
    },
    []
  );

  const handleNext = useCallback(
    () => {
      const { email } = Router.query as { email: string };
      fetchStudentsBookingLessonsDataAction(Number(selectedChildId), email)
    },
    [selectedChildId]);


  const renderChildrenSelection = () => {
    return currentStudents.map((student) => {
      return (
        <FormControlLabel
          key={student.id}
          control={<Radio />}
          name={student.studentName}
          label={`Buy more ${student.instrument} lessons for ${student.studentName}`}
          value={student.id}
        />
      )
    })
  }

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <Head>
        <title>{SelectChildComponent.pageTitle}</title>
        <meta name="description" content={SelectChildComponent.description}></meta>
      </Head>
      <PageTitle pageTitle={SelectChildComponent.pageTitle} />
      {
        isRequestingStudentsBookingData || isRequestingStudentsBookingLessonsData ?
          <Grid
            item={true}
            xs={12}
            md={6}
            className="nabi-section nabi-background-white nabi-margin-center nabi-display-flex nabi-flex-justify-center"
          >
            <CircularProgress />
          </Grid> :
          <Grid
            item={true}
            xs={12}
            md={6}
            className="nabi-section nabi-background-white nabi-margin-center"
          >
            <RadioGroup
              value={selectedChildId}
              onChange={handleChange}
            >
              {renderChildrenSelection()}
            </RadioGroup>
            <Button
              variant="contained"
              color={"primary"}
              className="nabi-padding-xsmall nabi-margin-top-small"
              onClick={handleNext}
              disabled={!selectedChildId ? true : false}
            >
              Continue
            </Button>
          </Grid>
      }
      <SnackBar
        isOpen={showSnackbar}
        message={snackbarMessage}
        handleClose={closeSnackbar}
        variant="error"
      />
    </div>
  )
}
