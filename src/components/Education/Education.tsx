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
import {
  fetchEducation,
  addEducation,
  editEducation,
  deleteEducation
} from '../../redux/actions/InstructorActions';
import { Routes } from '../common/constants/Routes';
import { ProfileBuilderStepper } from '../ProfileBuilder/constants';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import SectionTitle from '../common/SectionTitle';
import SnackBar from '../common/SnackBar';
import EducationForm from './EducationForm';
import EducationAdded from './EducationAdded';
import { EducationType } from './model';
import { EducationComponent } from './constants';

const Education = () => {
  const [educationId, setEducationId] = useState(undefined);
  const [school, setSchool] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [schoolLocation, setSchoolLocation] = useState('');
  const [degreeType, setDegreeType] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [educationFormIsOpen, showEducationForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [education, setEducation] = useState([]);
  const [snackbarIsOpen, showSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarMessageType, setSnackbarMessageType] = useState('success');

  const closeSnackbar = () => showSnackbar(false);

  const dispatch = useDispatch();
  const fetchEducationAction = bindActionCreators(fetchEducation, dispatch);
  const addEducationAction = bindActionCreators(addEducation, dispatch);
  const editEducationAction = bindActionCreators(editEducation, dispatch);
  const deleteEducationAction = bindActionCreators(deleteEducation, dispatch);

  const resetEducationState = () => {
    setSchool('');
    setGraduationYear('');
    setSchoolLocation('');
    setDegreeType('');
    setFieldOfStudy('');
  }
  const toggleEducationForm = () => {
    showEducationForm(!educationFormIsOpen);
  }

  const handleCancel = () => {
    resetEducationState();
    toggleEducationForm();
    setIsEditing(false);
  }

  const deleteEducationAsync = (educationId: number): void => {
    deleteEducationAction(educationId);
  }

  let {
    instructorEducation,
    isAddEducationRequesting,
    isDeleteEducationRequesting,
    isEditEducationRequesting,
    isFetchEducationRequesting,
    addEducationError,
    fetchEducationError,
    editEducationError,
    deleteEducationError,
  } = useSelector((state: StoreState) => {
    const {
      instructor: {
        education: instructorEducation
      },
      actions: {
        fetchEducation: {
          isRequesting: isFetchEducationRequesting,
          error: fetchEducationError
        },
        addEducation: {
          isRequesting: isAddEducationRequesting,
          error: addEducationError
        },
        editEducation: {
          isRequesting: isEditEducationRequesting,
          error: editEducationError,
        },
        deleteEducation: {
          isRequesting: isDeleteEducationRequesting,
          error: deleteEducationError,
        }
      }
    } = state.instructor;

    return {
      isFetchEducationRequesting,
      isAddEducationRequesting,
      isDeleteEducationRequesting,
      isEditEducationRequesting,
      fetchEducationError,
      addEducationError,
      editEducationError,
      deleteEducationError,
      instructorEducation: instructorEducation || [],
    };
  });

  useEffect(() => {
    if (!instructorEducation.length) {
      fetchEducationAction();
    }
    if (instructorEducation.length) {
      setEducation(instructorEducation);
      showEducationForm(false);
      setIsEditing(false);
    } else {
      setEducation([]);
      showEducationForm(false);
      setIsEditing(false);
    }
  },
    [
      JSON.stringify(instructorEducation)
    ]);


  useEffect(() => {
    if (instructorEducation.length > education.length) {
      setEducation(instructorEducation);
      showEducationForm(false);
      setIsEditing(false);
    }
  },
    [
      JSON.stringify(instructorEducation)
    ]);

  useEffect(() => {
    if (addEducationError) {
      setSnackbarMessage(addEducationError);
      setSnackbarMessageType('error');
      showSnackbar(true);
      setIsEditing(false);
    }
  },
    [
      addEducationError
    ]);


  useEffect(() => {
    if (editEducationError) {
      setSnackbarMessage(editEducationError);
      setSnackbarMessageType('error');
      showSnackbar(true);
      setIsEditing(false);
    }
  },
    [
      editEducationError
    ]);

  useEffect(() => {
    if (deleteEducationError) {
      setSnackbarMessage(deleteEducationError);
      setSnackbarMessageType('error');
      showSnackbar(true);
      setIsEditing(false);
    }
  },
    [
      deleteEducationError
    ]);


  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>): void => {
      const target = event.currentTarget;
      let value = target.value as any;
      let name = target.name;

      if (name === 'school') {
        setSchool(value);
      }
      if (name === 'graduationYear') {
        setGraduationYear(value);
      }
      if (name === 'schoolLocation') {
        setSchoolLocation(value);
      }
      if (name === 'degreeType') {
        setDegreeType(value);
      }
      if (name === 'fieldOfStudy') {
        setFieldOfStudy(value);
      }
    },
    []
  );

  useEffect(() => {
    const allFieldsFilled = [
      school,
      graduationYear,
      schoolLocation,
      degreeType,
      fieldOfStudy
    ].every((field) => {
      if (typeof field === 'number') {
        return field > 0;
      }
      return field.length;
    });

    setAllFieldsFilled(allFieldsFilled);
  }, [
    school,
    graduationYear,
    schoolLocation,
    degreeType,
    fieldOfStudy
  ]);

  const editEducationForm = useCallback(
    (educationId: number) => {
      const educationToEdit = instructorEducation.length && instructorEducation.find(education =>
        education.id === educationId
      );
      if (educationToEdit) {
        setIsEditing(true);
        setEducationId(educationToEdit.id);
        setSchool(educationToEdit.school);
        setGraduationYear(educationToEdit.graduationYear);
        setSchoolLocation(educationToEdit.schoolLocation);
        setDegreeType(educationToEdit.degreeType);
        setFieldOfStudy(educationToEdit.fieldOfStudy);

        showEducationForm(true);
      }
    },
    [
      educationFormIsOpen,
      isEditing,
      school,
      graduationYear,
      schoolLocation,
      degreeType,
      fieldOfStudy,
      educationId,
      JSON.stringify(instructorEducation)
    ]
  );

  const handleSave = useCallback(
    () => {
      const education: EducationType = {
        school,
        graduationYear,
        degreeType,
        fieldOfStudy,
        schoolLocation
      };

      console.log('is editing', true);
      if (isEditing) {
        education.id = educationId;
        editEducationAction(education);
      } else {
        addEducationAction(education);
      }
      resetEducationState();
      toggleEducationForm();
    },
    [
      school,
      graduationYear,
      degreeType,
      fieldOfStudy,
      schoolLocation,
      educationId
    ]
  );

  const requesting = isAddEducationRequesting || isEditEducationRequesting ||
    isFetchEducationRequesting || isDeleteEducationRequesting;

  const renderEducationForm = (): JSX.Element => {
    return (
      <div>
        <Typography className="nabi-margin-top-xsmall nabi-text-uppercase" variant="body2">
          {EducationComponent.Text.AddEducation}
        </Typography>
        <EducationForm
          handleChange={handleChange}
          handleSave={handleSave}
          school={school}
          graduationYear={graduationYear}
          degreeType={degreeType}
          fieldOfStudy={fieldOfStudy}
          schoolLocation={schoolLocation}
          handleCancel={handleCancel}
          isEditing={isEditing}
          allFieldsFilled={allFieldsFilled}
        />
      </div>
    );
  }

  const educationAdded = education.map((education, i) => (
    <li className="nabi-list" key={i}>
      <EducationAdded
        id={education.id}
        gridWidth={6}
        school={education.school}
        graduationYear={education.graduationYear}
        schoolLocation={education.schoolLocation}
        degreeType={education.degreeType}
        fieldOfStudy={education.fieldOfStudy}
        deleteEducation={(educationId: number) => deleteEducationAsync(educationId)}
        editEducation={(educationId: number) => editEducationForm(educationId)}
      />
    </li>
  ));

  return (
    <div>
      {requesting ?
        <div className="nabi-text-center">
          <CircularProgress />
        </div> :
        (!educationFormIsOpen ?
          <div>
            <SectionTitle text={EducationComponent.Text.YourEducation} />
            <Typography className="nabi-margin-top-xsmall">
              {EducationComponent.Text.TellStudentsAbout}
            </Typography>
            <ul>
              {educationAdded}
            </ul>
            <div className="nabi-margin-top-medium">
              <Button
                color="primary"
                variant="contained"
                onClick={toggleEducationForm}
              >
                <Add className="nabi-margin-right-xsmall" />
                {EducationComponent.Text.AddEducation}
              </Button>
            </div>
          </div>
          : renderEducationForm())
      }
      <StepperButtons
        nextPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Employment}
        backPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.JobPreferences}
        icon={<ArrowForward />}
        errors={
          fetchEducationError ||
          addEducationError ||
          editEducationError ||
          deleteEducationError
        }
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

export default Education;
