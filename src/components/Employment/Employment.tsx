import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  bindActionCreators,
} from 'redux';

import {
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Add from '@material-ui/icons/Add';

import { StoreState } from '../../redux/reducers/store';
import SnackBar from '../common/SnackBar';

import {
  fetchEmployment,
  addEmployment,
  editEmployment,
  deleteEmployment
} from '../../redux/actions/InstructorActions';
import { Routes } from '../common/constants/Routes';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import { ProfileBuilderStepper } from '../ProfileBuilder/constants';
import SectionTitle from '../common/SectionTitle';
import { EmploymentComponent } from './constants';
import { EmploymentType } from './model';
import EmploymentForm from './EmploymentForm';
import EmploymentAdded from './EmploymentAdded';

const Employment = () => {
  const [employmentId, setEmploymentId] = useState(undefined);
  const [employer, setEmployer] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [fromMonth, setFromMonth] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [toMonth, setToMonth] = useState('');
  const [toYear, setToYear] = useState('');
  const [stillWorkHere, setStillWorkHere] = useState(false);
  const [employment, setEmployment] = useState([]);
  const [employmentFormIsOpen, showEmploymentForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [snackbarIsOpen, showSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarMessageType, setSnackbarMessageType] = useState('success');

  const closeSnackbar = () => showSnackbar(false);

  const dispatch = useDispatch();
  const fetchEmploymentAction = bindActionCreators(fetchEmployment, dispatch);
  const addEmploymentAction = bindActionCreators(addEmployment, dispatch);
  const editEmploymentAction = bindActionCreators(editEmployment, dispatch);
  const deleteEmploymentAction = bindActionCreators(deleteEmployment, dispatch);

  const resetEmploymentState = () => {
    setEmployer('');
    setJobTitle('');
    setJobLocation('');
    setFromMonth('');
    setFromYear('');
    setToMonth('');
    setToYear('');
    setStillWorkHere(false);
  }
  const toggleEmploymentForm = () => {
    showEmploymentForm(!employmentFormIsOpen);
  }

  const handleCancel = () => {
    resetEmploymentState();
    toggleEmploymentForm();
    setIsEditing(false);
  }

  const deleteEmploymentAsync = (employmentId: number): void => {
    deleteEmploymentAction(employmentId);
  }

  let {
    instructorEmployment,
    isAddEmploymentRequesting,
    isDeleteEmploymentRequesting,
    isEditEmploymentRequesting,
    isFetchEmploymentRequesting,
    addEmploymentError,
    fetchEmploymentError,
    editEmploymentError,
    deleteEmploymentError,
  } = useSelector((state: StoreState) => {
    const {
      instructor: {
        employment: instructorEmployment
      },
      actions: {
        fetchEmployment: {
          isRequesting: isFetchEmploymentRequesting,
          error: fetchEmploymentError
        },
        addEmployment: {
          isRequesting: isAddEmploymentRequesting,
          error: addEmploymentError
        },
        editEmployment: {
          isRequesting: isEditEmploymentRequesting,
          error: editEmploymentError,
        },
        deleteEmployment: {
          isRequesting: isDeleteEmploymentRequesting,
          error: deleteEmploymentError,
        }
      }
    } = state.instructor;

    return {
      employment: state.instructor.instructor.employment || [],
      isFetchEmploymentRequesting,
      isAddEmploymentRequesting,
      isDeleteEmploymentRequesting,
      isEditEmploymentRequesting,
      fetchEmploymentError,
      addEmploymentError,
      editEmploymentError,
      deleteEmploymentError,
      instructorEmployment: instructorEmployment || []
    };
  });

  useEffect(() => {
    if (!instructorEmployment.length) {
      fetchEmploymentAction();
    }
    if (instructorEmployment.length) {
      setEmployment(instructorEmployment);
      showEmploymentForm(false);
      setIsEditing(false);
    } else {
      setEmployment([]);
      showEmploymentForm(false);
      setIsEditing(false);
    }
  },
    [
      JSON.stringify(instructorEmployment)
    ]);

    useEffect(() => {
      if (instructorEmployment.length > employment.length) {
        setEmployment(instructorEmployment);
        showEmploymentForm(false);
        setIsEditing(false);
      }
    },
      [
        JSON.stringify(instructorEmployment)
      ]);

  useEffect(() => {
    if (addEmploymentError) {
      setSnackbarMessage(addEmploymentError);
      setSnackbarMessageType('error');
      showSnackbar(true);
    }
  },
    [
      addEmploymentError
    ]);
  

  useEffect(() => {
    if (editEmploymentError) {
      setSnackbarMessage(editEmploymentError);
      setSnackbarMessageType('error');
      showSnackbar(true);
    }
  },
    [
      editEmploymentError
    ]);

  useEffect(() => {
    if (deleteEmploymentError) {
      setSnackbarMessage(deleteEmploymentError);
      setSnackbarMessageType('error');
      showSnackbar(true);
    }
  },
    [
      deleteEmploymentError
    ]);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>): void => {
      const target = event.currentTarget;
      const value = target.type === 'checkbox' ? target.checked : target.value as any;
      const name = target.name;

      if (name === 'employer') {
        setEmployer(value);
      }
      if (name === 'jobTitle') {
        setJobTitle(value);
      }
      if (name === 'jobLocation') {
        setJobLocation(value);
      }
      if (name === 'fromMonth') {
        setFromMonth(value);
      }
      if (name === 'toMonth') {
        setToMonth(value);
      }
      if (name === 'fromYear') {
        setFromYear(value);
      }
      if (name === 'toYear') {
        setToYear(value);
      }
      if (name === 'stillWorkHere') {
        setStillWorkHere(value);
      }
    },
    []
  );

  useEffect(() => {
    const selectedFields = stillWorkHere ? [
      employer,
      jobTitle,
      jobLocation,
      fromMonth,
      fromYear,
    ] : [
        employer,
        jobTitle,
        jobLocation,
        fromMonth,
        toMonth,
        fromYear,
        toYear
      ]
    const allFieldsFilled = selectedFields.every((field) => {
      if (typeof field === 'number') {
        return field > 0;
      }
      return field.length;
    });
    setAllFieldsFilled(allFieldsFilled);
  }, [
    employer,
    jobTitle,
    jobLocation,
    fromMonth,
    toMonth,
    fromYear,
    toYear,
    stillWorkHere
  ]);

  const editEmploymentForm = useCallback(
    (employmentId: number) => {
      const employmentToEdit = instructorEmployment.length && instructorEmployment.find(employment =>
        employment.id === employmentId
      );
      if (employmentToEdit) {
        setIsEditing(true);
        setEmploymentId(employmentToEdit.id);
        setEmployer(employmentToEdit.employer);
        setJobTitle(employmentToEdit.jobTitle);
        setJobLocation(employmentToEdit.jobLocation);
        setFromYear(employmentToEdit.fromYear);
        setFromMonth(employmentToEdit.fromMonth);
        setToYear(!employmentToEdit.stillWorkHere ? employmentToEdit.toYear : '');
        setToMonth(!employmentToEdit.stillWorkHere ? employmentToEdit.toMonth : '');
        setStillWorkHere(employmentToEdit.stillWorkHere ? employmentToEdit.stillWorkHere : false);

        showEmploymentForm(true);
      }
    },
    [
      employmentFormIsOpen,
      isEditing,
      employer,
      jobTitle,
      jobLocation,
      fromMonth,
      fromYear,
      toMonth,
      toYear,
      employmentId,
      JSON.stringify(instructorEmployment),
      employment
    ]
  );

  const handleSave = useCallback(
    () => {
      const employment: EmploymentType = {
        employer,
        jobTitle,
        fromMonth,
        jobLocation,
        fromYear,
        ...(stillWorkHere && {
          stillWorkHere
        }),
        ...(!stillWorkHere && {
          toMonth,
          toYear
        })
      };

      if (isEditing) {
        employment.id = employmentId;
        editEmploymentAction(employment);
      } else {
        addEmploymentAction(employment);
      }
      resetEmploymentState();
      toggleEmploymentForm();
    },
    [
      employer,
      jobTitle,
      fromMonth,
      toMonth,
      jobLocation,
      employmentId,
      fromYear,
      toYear,
      stillWorkHere
    ]
  );

  const requesting = isAddEmploymentRequesting || isEditEmploymentRequesting ||
    isFetchEmploymentRequesting || isDeleteEmploymentRequesting;

  const renderEmploymentForm = (): JSX.Element => {
    return (
      <div>
        <Typography className="nabi-margin-top-xsmall nabi-text-uppercase" variant="body2">
          {EmploymentComponent.Text.AddEmployment}
        </Typography>
        <EmploymentForm
          handleChange={handleChange}
          handleSave={handleSave}
          employer={employer}
          jobTitle={jobTitle}
          jobLocation={jobLocation}
          fromMonth={fromMonth}
          fromYear={fromYear}
          toMonth={toMonth}
          toYear={toYear}
          stillWorkHere={stillWorkHere}
          isEditing={isEditing}
          handleCancel={handleCancel}
          allFieldsFilled={allFieldsFilled}
        />
      </div>
    );
  }

  const employmentAdded = employment.map((employment, i) => (
    <li className="nabi-list" key={i}>
      <EmploymentAdded
        id={employment.id}
        gridWidth={6}
        employer={employment.employer}
        jobTitle={employment.jobTitle}
        jobLocation={employment.jobLocation}
        fromMonth={employment.fromMonth}
        fromYear={employment.fromYear}
        toMonth={employment.toMonth}
        toYear={employment.toYear}
        stillWorkHere={stillWorkHere}
        deleteEmployment={(employmentId: number) => deleteEmploymentAsync(employmentId)}
        editEmployment={(employmentId: number) => editEmploymentForm(employmentId)}
      />
    </li>
  ));

  return (
    <div>
      {requesting ?
        <div className="nabi-text-center">
          <CircularProgress />
        </div> :
        (!employmentFormIsOpen ?
          <div>
            <SectionTitle text={EmploymentComponent.Text.YourEmployment} />
            <Typography className="nabi-margin-top-xsmall">
              {EmploymentComponent.Text.ListYourPastExperience}
            </Typography>
            <ul>
              {employmentAdded}
            </ul>
            <div className="nabi-margin-top-medium">
              <Button color="primary" variant="contained" onClick={toggleEmploymentForm}>
                <Add className="nabi-margin-right-xsmall" />
                {EmploymentComponent.Text.AddEmployment}
              </Button>
            </div>
          </div>
          : renderEmploymentForm())
      }
      <StepperButtons
        nextPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.References}
        backPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Education}
        icon={<ArrowForward />}
      />
      <SnackBar
        isOpen={snackbarIsOpen}
        message={snackbarMessage}
        handleClose={closeSnackbar}
        variant={snackbarMessageType}
        hideIcon={true}
      />
    </div>
  );
}

export default Employment;
