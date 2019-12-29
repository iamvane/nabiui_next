import { AnyAction } from 'redux';

import { EducationType } from '../../components/Education/model';
import { EmploymentType } from '../../components/Employment/model';
import { APIActions } from '../models/models';
import {
  InstructorState,
  defaultInstructorState,
  InstructorType
} from '../models/InstructorModel';
import { InstructorActions } from '../actions/InstructorActionTypes';

export default function instructorReducer(
  state: InstructorState = defaultInstructorState,
  action: AnyAction): InstructorState {
  switch (action.type) {
    case InstructorActions.BUILD_PROFILE:
      return {
        ...state,
        actions: {
          ...state.actions,
          buildProfile: {
            ...state.actions.buildProfile,
            isRequesting: true
          }
        }
      };

    case InstructorActions.BUILD_PROFILE_SUCCESS:
      const {data: updatedInstructor} = <APIActions.WithData<Partial<InstructorType>>> action;
      return {
        ...state,
        instructor: {
          ...state.instructor,
          ...updatedInstructor
        },
        actions: {
          ...state.actions,
          buildProfile: {
            ...state.actions.buildProfile,
            isRequesting: false,
            error: ''
          }
        }
      };

    case InstructorActions.BUILD_PROFILE_FAILURE:
      const { error: buildProfileError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
        buildProfile: {
            isRequesting: false,
            error: buildProfileError,
          }
        }
      };

      case InstructorActions.FETCH_PROFILE:
        return {
          ...state,
          actions: {
            ...state.actions,
            fetchProfile: {
              ...state.actions.fetchProfile,
              isRequesting: true,
            }
          }
        };

      case InstructorActions.FETCH_PROFILE_SUCCESS:
        const { data: profile } = action;
        return {
          ...state,
          instructor: {
            ...state.instructor,
            bioTitle: profile.bioTitle,
            bioDescription: profile.bioDescription,
            music: profile.music
          },
          actions: {
            ...state.actions,
            fetchProfile: {
              ...state.actions.fetchProfile,
              isRequesting: false,
              error: ''
            }
          }
        };

      case InstructorActions.FETCH_PROFILE_FAILURE:
        const { error } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            fetchProfile: {
              isRequesting: false,
              error
            }
          }
        };

      case InstructorActions.BUILD_JOB_PREFERENCES:
        return {
          ...state,
          actions: {
            ...state.actions,
            buildJobPreferences: {
              ...state.actions.buildJobPreferences,
              isRequesting: true
            }
          }
        };

      case InstructorActions.BUILD_JOB_PREFERENCES_SUCCESS:
        const {data: jobPreferences} = action;
        return {
          ...state,
          instructor: {
            ...state.instructor,
            instruments: jobPreferences.instruments,
            lessonSize: jobPreferences.lessonSize,
            ageGroup: jobPreferences.ageGroup,
            rates: jobPreferences.lessonRate,
            placeForLessons: jobPreferences.placeForLessons,
            availability: jobPreferences.availability,
            qualifications: jobPreferences.additionalQualifications,
            languages: jobPreferences.languages,
            studioAddress: jobPreferences.studioAddress,
            travelDistance: jobPreferences.travelDistance,
          },
          actions: {
            ...state.actions,
            buildJobPreferences: {
              ...state.actions.buildJobPreferences,
              isRequesting: false,
              error: ''
            }
          }
        };

      case InstructorActions.BUILD_JOB_PREFERENCES_FAILURE:
        const { error: buildJobPreferencesError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            buildJobPreferences: {
              isRequesting: false,
              error: buildJobPreferencesError,
            }
          }
        };

      case InstructorActions.FETCH_EDUCATION:
        return {
          ...state,
          actions: {
            ...state.actions,
            fetchEducation: {
              ...state.actions.fetchEducation,
              isRequesting: true,
            }
          }
        };

      case InstructorActions.FETCH_EDUCATION_SUCCESS:
        const {data: education} = <APIActions.WithData<EducationType[]>> action;
        return {
          ...state,
          instructor: {
            ...state.instructor,
            education: education,
          },
          actions: {
            ...state.actions,
            fetchEducation: {
              ...state.actions.fetchEducation,
              isRequesting: false,
              error: ''
            }
          }
        };

      case InstructorActions.FETCH_EDUCATION_FAILURE:
        const { error: fetchEducationError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            fetchEducation: {
              isRequesting: false,
              error: fetchEducationError
            }
          }
        };

      case InstructorActions.ADD_EDUCATION:
        return {
          ...state,
          actions: {
            ...state.actions,
            addEducation: {
              ...state.actions.addEducation,
              isRequesting: true,
              message: ''
            }
          }
        };

      case InstructorActions.ADD_EDUCATION_SUCCESS:
        const {data: message} = <APIActions.WithData<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            addEducation: {
              ...state.actions.addEducation,
              isRequesting: false,
              error: '',
              message: message
            }
          }
        };

      case InstructorActions.ADD_EDUCATION_FAILURE:
        const { error: addEducationError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            addEducation: {
              ...state.actions.addEducation,
              isRequesting: false,
              error: addEducationError,
              message: ''
            }
          }
        };

      case InstructorActions.EDIT_EDUCATION:
        return {
          ...state,
          actions: {
            ...state.actions,
            editEducation: {
              ...state.actions.editEducation,
              isRequesting: true,
              message: ''
            }
          }
        };

      case InstructorActions.EDIT_EDUCATION_SUCCESS:
        const {data: editEducationMessage} = <APIActions.WithData<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            editEducation: {
              ...state.actions.editEducation,
              isRequesting: false,
              error: '',
              message: editEducationMessage
            }
          }
        };

      case InstructorActions.EDIT_EDUCATION_FAILURE:
        const { error: editEducationError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            editEducation: {
              ...state.actions.editEducation,
              isRequesting: false,
              error: editEducationError,
              message: ''
            }
          }
        };

      case InstructorActions.DELETE_EDUCATION:
        return {
          ...state,
          actions: {
            ...state.actions,
            deleteEducation: {
              ...state.actions.deleteEducation,
              isRequesting: true,
              message: ''
            }
          }
        };

      case InstructorActions.DELETE_EDUCATION_SUCCESS:
        const {data: deleteEducationMessage} = <APIActions.WithData<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            deleteEducation: {
              ...state.actions.deleteEducation,
              isRequesting: false,
              error: '',
              message: deleteEducationMessage
            }
          }
        };

      case InstructorActions.DELETE_EDUCATION_FAILURE:
        const { error: deleteEducationError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            deleteEducation: {
              ...state.actions.deleteEducation,
              isRequesting: false,
              error: deleteEducationError,
              message: ''
            }
          }
        };

    case InstructorActions.FETCH_EMPLOYMENT:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchEmployment: {
            ...state.actions.fetchEmployment,
            isRequesting: true,
          }
        }
      };

    case InstructorActions.FETCH_EMPLOYMENT_SUCCESS:
      const {data: employment} = <APIActions.WithData<EmploymentType[]>> action;
      return {
        ...state,
        instructor: {
          ...state.instructor,
          employment
        },
        actions: {
          ...state.actions,
          fetchEmployment: {
            ...state.actions.fetchEmployment,
            isRequesting: false,
            error: ''
          }
        }
      };

    case InstructorActions.FETCH_EMPLOYMENT_FAILURE:
      const { error: fetchEmploymentError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchEmployment: {
            isRequesting: false,
            error: fetchEmploymentError
          }
        }
      };

    case InstructorActions.ADD_EMPLOYMENT:
      return {
        ...state,
        actions: {
          ...state.actions,
          addEmployment: {
            ...state.actions.addEmployment,
            isRequesting: true,
            message: ''
          }
        }
      };

    case InstructorActions.ADD_EMPLOYMENT_SUCCESS:
      const {data: addEmploymentMessage} = <APIActions.WithData<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          addEmployment: {
            ...state.actions.addEmployment,
            isRequesting: false,
            error: '',
            message: addEmploymentMessage
          }
        }
      };

    case InstructorActions.ADD_EMPLOYMENT_FAILURE:
      const { error: addEmploymentError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          addEmployment: {
            ...state.actions.addEmployment,
            isRequesting: false,
            error: addEmploymentError,
            message: ''
          }
        }
      };

    case InstructorActions.EDIT_EMPLOYMENT:
      return {
        ...state,
        actions: {
          ...state.actions,
          editEmployment: {
            ...state.actions.editEmployment,
            isRequesting: true,
            message: ''
          }
        }
      };

    case InstructorActions.EDIT_EMPLOYMENT_SUCCESS:
      const {data: editEmploymentMessage} = <APIActions.WithData<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          editEmployment: {
            ...state.actions.editEmployment,
            isRequesting: false,
            error: '',
            message: editEmploymentMessage
          }
        }
      };

    case InstructorActions.EDIT_EMPLOYMENT_FAILURE:
      const { error: editEmploymentError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          editEmployment: {
            ...state.actions.editEmployment,
            isRequesting: false,
            error: editEmploymentError,
            message: ''
          }
        }
      };

    case InstructorActions.DELETE_EMPLOYMENT:
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteEmployment: {
            ...state.actions.deleteEmployment,
            isRequesting: true,
            message: ''
          }
        }
      };

    case InstructorActions.DELETE_EMPLOYMENT_SUCCESS:
      const {data: deleteEmploymentMessage} = <APIActions.WithData<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteEmployment: {
            ...state.actions.deleteEmployment,
            isRequesting: false,
            error: '',
            message: deleteEmploymentMessage
          }
        }
      };

    case InstructorActions.DELETE_EMPLOYMENT_FAILURE:
      const { error: deleteEmploymentError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteEmployment: {
            ...state.actions.deleteEmployment,
            isRequesting: false,
            error: deleteEmploymentError,
            message: ''
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTORS:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchInstructors: {
            ...state.actions.fetchInstructors,
            isRequesting: true,
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTORS_SUCCESS:
      const { data: instructors } = action;
      return {
        ...state,
        instructors,
        actions: {
          ...state.actions,
          fetchInstructors: {
            ...state.actions.fetchInstructors,
            isRequesting: false,
            error: ''
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTORS_FAILURE:
      const { error: fetchInstructorsError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchInstructors: {
            isRequesting: false,
            error: fetchInstructorsError
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTOR:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchInstructor: {
            ...state.actions.fetchInstructor,
            isRequesting: true,
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTOR_SUCCESS:
      const { data: instructor } = action;
      return {
        ...state,
        instructor,
        actions: {
          ...state.actions,
          fetchInstructor: {
            ...state.actions.fetchInstructor,
            isRequesting: false,
            error: ''
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTOR_FAILURE:
      const { error: fetchInstructorError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchInstructor: {
            isRequesting: false,
            error: fetchInstructorError
          }
        }
      };

    case InstructorActions.REQUEST_REFERENCE:
      return {
        ...state,
        actions: {
          ...state.actions,
          requestReference: {
            ...state.actions.requestReference,
            isRequesting: true,
            message: '',
            error: ''
          }
        }
      };
    case InstructorActions.REQUEST_REFERENCE_SUCCESS:
      return {
        ...state,
        actions: {
          ...state.actions,
          requestReference: {
            ...state.actions.requestReference,
            isRequesting: false,
            error: '',
            message: action.data.message
          }
        }
      };
    case InstructorActions.REQUEST_REFERENCE_FAILURE:
      const { error: requestReferenceError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          requestReference: {
            isRequesting: false,
            error: requestReferenceError,
            message: ''
          }
        }
      };

    case InstructorActions.FETCH_REFERENCES:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchReferences: {
            ...state.actions.fetchReferences,
            isRequesting: true,
            error: ''
          }
        }
      };

    case InstructorActions.FETCH_REFERENCES_SUCCESS:
      return {
        ...state,
        instructor: {
          references: action.data.emails,
        },
        actions: {
          ...state.actions,
          fetchReferences: {
            ...state.actions.fetchReferences,
            isRequesting: false,
            error: ''
          }
        }
      };

    case InstructorActions.FETCH_REFERENCES_FAILURE:
      const { error: fetchReferencesError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchReferences: {
            isRequesting: false,
            error: fetchReferencesError
          }
        }
      };

    default:
      return state;
  }
}
