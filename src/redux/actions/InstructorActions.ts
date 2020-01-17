import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios  from 'axios';

import { ProfileType } from '../../components/ProfileBuilder/ProfileStep/models';
import { defaultApiError } from '../../constants/apiConstants';
import { getError } from '../../utils/handleApiErros';
import { ApiEndpoints } from '../../constants/apiEndpoints';
import { EducationType } from '../../components/Education/model';
import { EmploymentType } from '../../components/Employment/model';
import { BackgroundCheckParams } from '../../components/ProfileBuilder/models';
import { ApplicationPayload } from '../../components/Request/models';
import { getCookie } from '../../utils/cookies';
import { InstructorType } from '../models/InstructorModel';
import { InstructorActions } from '../actions/InstructorActionTypes';
import {
  requestAction,
  withDataAction,
  withErrorAction,
} from './actions';

// Default error message
let errorMessage = defaultApiError;

interface UpdateInstructor extends Action {
  instructor: InstructorType;
}

const authToken = getCookie('token');

/**
 * Action cretator to fetch instructor profile a new instructor
 */
export const fetchProfile = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.FETCH_PROFILE));
  try {
    const response = await axios.get(
      ApiEndpoints.fetchProfile,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );

    dispatch(
      withDataAction(InstructorActions.FETCH_PROFILE_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.FETCH_PROFILE_FAILURE, errorMessage)
    );
  }
};

/**
 * Action creator to update instructor
 */
export function updateInstructor(instructor: InstructorType): UpdateInstructor {
  return {
    instructor,
    type: "Delete this"
  };
}

/**
 * Action creator to build profile
 */
export const buildProfile = (
  data: ProfileType
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.BUILD_PROFILE));
  try {
    await axios.put(
      ApiEndpoints.buildProfile,
      data,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );
    dispatch(withDataAction(InstructorActions.BUILD_PROFILE_SUCCESS, data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.BUILD_PROFILE_FAILURE, errorMessage)
    );
  }
};

/**
 * Action creator to build job preferences
 */
export const buildJobPreferences = (
  data: InstructorType
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.BUILD_JOB_PREFERENCES));
  try {
    const response = await axios.post(
      ApiEndpoints.buildJobPreferences,
      data,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );
    dispatch(
      withDataAction(
        InstructorActions.BUILD_JOB_PREFERENCES_SUCCESS,
        response.data
      )
    )
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(
        InstructorActions.BUILD_JOB_PREFERENCES_FAILURE,
        errorMessage
      )
    );
  }
};

/**
 * Action creator to add an education object
 */
export const addEducation = (
  education: EducationType
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.ADD_EDUCATION));
  try {
    const response = await axios.post(
      ApiEndpoints.education,
      education,
      {
        headers: {'Authorization': `Bearer ${authToken}`}
      },
    );
    dispatch(
      withDataAction(InstructorActions.ADD_EDUCATION_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.ADD_EDUCATION_FAILURE, errorMessage)
    );
  }
};

/**
 * Action cretator to fetch instructor education
 */
export const fetchEducation = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.FETCH_EDUCATION));
  try {
    const response = await axios.get(ApiEndpoints.education, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    dispatch(
      withDataAction(InstructorActions.FETCH_EDUCATION_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.FETCH_EDUCATION_FAILURE, errorMessage)
    );
  }
};

/**
 * Action cretator to edit an education object
 */
export const editEducation = (
  education: Partial<EducationType>
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.EDIT_EDUCATION));
  try {
    const response = await axios.put(
      `${ApiEndpoints.education}${education.id}/`,
      education,
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );

    dispatch(
      withDataAction(InstructorActions.EDIT_EDUCATION_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.EDIT_EDUCATION_FAILURE, errorMessage)
    );
  }
};

/**
 * Action cretator to delete an education object
 */
export const deleteEducation = (
  id: number
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.DELETE_EDUCATION));
  try {
    const response = await axios.delete(
      `${ApiEndpoints.education}${id}/`,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );

    dispatch(
      withDataAction(InstructorActions.DELETE_EDUCATION_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.DELETE_EDUCATION_FAILURE, errorMessage)
    );
  }
};

/**
 * Action creator to add an employment object
 */
export const addEmployment = (
  employment: EmploymentType
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.ADD_EMPLOYMENT));
  try {
    const response = await axios.post(
      ApiEndpoints.employment,
      employment,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );
    dispatch(
      withDataAction(InstructorActions.ADD_EMPLOYMENT_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.ADD_EMPLOYMENT_FAILURE, errorMessage)
    );
  }
};

/**
 * Action cretator to fetch instructor employment
 */
export const fetchEmployment = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.FETCH_EMPLOYMENT));
  try {
    const response = await axios.get(
      ApiEndpoints.employment,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );

    dispatch(
      withDataAction(InstructorActions.FETCH_EMPLOYMENT_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.FETCH_EMPLOYMENT_FAILURE, errorMessage)
    );
  }
};

/**
 * Action cretator to edit an employment object
 */
export const editEmployment = (
  employment: Partial<EmploymentType>
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.EDIT_EMPLOYMENT));
  try {
    const response = await axios.put(
      `${ApiEndpoints.employment}${employment.id}/`,
      employment,
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );

    dispatch(
      withDataAction(InstructorActions.EDIT_EMPLOYMENT_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.EDIT_EMPLOYMENT_FAILURE, errorMessage)
    );
  }
};

/**
 * Action cretator to delete an employment object
 */
export const deleteEmployment = (
  id: number
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.DELETE_EMPLOYMENT));
  try {
    const response = await axios.delete(
      `${ApiEndpoints.employment}${id}/`,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );

    dispatch(
      withDataAction(InstructorActions.DELETE_EMPLOYMENT_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.DELETE_EMPLOYMENT_FAILURE, errorMessage)
    );
  }
};

export const fetchInstructors = (
  params?: any
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.FETCH_INSTRUCTORS));
  try {
    let config = {
      headers: authToken && { Authorization: `Bearer ${authToken}` },
      params: params && params
    };

    const response = await axios.get(ApiEndpoints.fetchInstructors, config);
    dispatch(
      withDataAction(InstructorActions.FETCH_INSTRUCTORS_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }
    dispatch(
      withErrorAction(InstructorActions.FETCH_INSTRUCTORS_FAILURE, errorMessage)
    );
  }
};

export const fetchInstructor = (
  instructorId: number
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.FETCH_INSTRUCTOR));
  try {
    const response = await axios.get(
      `${ApiEndpoints.fetchInstructors}${instructorId}`,
      { headers: authToken && { Authorization: `Bearer ${authToken}` } }
    );
    dispatch(
      withDataAction(InstructorActions.FETCH_INSTRUCTOR_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }
    dispatch(
      withErrorAction(InstructorActions.FETCH_INSTRUCTOR_FAILURE, errorMessage)
    );
  }
};

export const fetchMoreInstructors = (
  pageNumber: number,
  params: any
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.FETCH_MORE_INSTRUCTORS));
  try {
    const config = {
      headers: authToken && { Authorization: `Bearer ${authToken}` },
      params: params && params
    };
    const response = await axios.get(
      `${ApiEndpoints.fetchMoreInstructor}${String(pageNumber)}`,
      config
    );
    dispatch(
      withDataAction(
        InstructorActions.FETCH_MORE_INSTRUCTORS_SUCCESS,
        response.data
      )
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }
    dispatch(
      withErrorAction(
        InstructorActions.FETCH_MORE_INSTRUCTORS_FAILURE,
        errorMessage
      )
    );
  }
};

export const requestReference = (
  references: string
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.REQUEST_REFERENCE));
  try {
    const response = await axios.post(
      ApiEndpoints.requestReferences,
      { emails: [references] },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    dispatch(
      withDataAction(InstructorActions.REQUEST_REFERENCE_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(InstructorActions.REQUEST_REFERENCE_FAILURE, errorMessage)
    );
  }
};

export const fetchReferences = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.FETCH_REFERENCES));
  try {
    const response = await axios.get(
      ApiEndpoints.fetchReferences,
      { headers: authToken && { 'Authorization': `Bearer ${authToken}` }});
    dispatch(withDataAction(InstructorActions.FETCH_REFERENCES_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }
    dispatch(
      withErrorAction(InstructorActions.FETCH_REFERENCES_FAILURE, errorMessage)
    );
  }
};

export const requestBackgroundCheck = (params: BackgroundCheckParams): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.REQUEST_BACKGROUND_CHECK));
  try {
    const response = await axios.post(
      ApiEndpoints.backgroundCheck,
      {...params},
      { headers: authToken && { 'Authorization': `Bearer ${authToken}` }});
    dispatch(withDataAction(InstructorActions.REQUEST_BACKGROUND_CHECK_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(InstructorActions.REQUEST_BACKGROUND_CHECK_FAILURE, errorMessage));
  }
};


export const fetchBackgroundCheckStatus = (params?: {instructorId: number}): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.FETCH_BACKGROUND_CHECK_STATUS));
  try {
    let config = {
      headers: authToken && { 'Authorization': `Bearer ${authToken}` },
      params: params && params
    };

    const response = await axios.get(ApiEndpoints.backgroundCheck, config);
    dispatch(withDataAction(InstructorActions.FETCH_BACKGROUND_CHECK_STATUS_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(InstructorActions.FETCH_BACKGROUND_CHECK_STATUS_FAILURE, errorMessage));
  }
};

export const submitApplication = (application: ApplicationPayload): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(InstructorActions.SUBMIT_APPLICACTION));
  try {
    const response = await axios.post(
      ApiEndpoints.applicationInstructors,
      {...application},
      { headers: authToken && { 'Authorization': `Bearer ${authToken}` }});
    dispatch(withDataAction(InstructorActions.SUBMIT_APPLICACTION_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(InstructorActions.SUBMIT_APPLICACTION_FAILURE, errorMessage));
  }
};
