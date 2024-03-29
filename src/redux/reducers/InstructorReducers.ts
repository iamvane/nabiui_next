import { AnyAction } from "redux";

import { EducationType } from "../../components/Education/model";
import { EmploymentType } from "../../components/Employment/model";
import { APIActions } from "../models/models";
import {
  InstructorState,
  defaultInstructorState,
  InstructorType
} from "../models/InstructorModel";
import { InstructorActions } from "../actions/InstructorActionTypes";

export default function instructorReducer(
  state: InstructorState = defaultInstructorState,
  action: AnyAction
): InstructorState {
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
      const { data: updatedInstructor } = <APIActions.WithData<Partial<InstructorType>>>action;
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
            error: ""
          }
        }
      };

    case InstructorActions.BUILD_PROFILE_FAILURE:
      const { error: buildProfileError } = <APIActions.WithError<string>>action;
      return {
        ...state,
        actions: {
          ...state.actions,
          buildProfile: {
            isRequesting: false,
            error: buildProfileError
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
            isRequesting: true
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
          music: profile.music,
          video: profile.video,
          yearsOfExperience: profile.yearsOfExperience
        },
        actions: {
          ...state.actions,
          fetchProfile: {
            ...state.actions.fetchProfile,
            isRequesting: false,
            error: ""
          }
        }
      };

    case InstructorActions.FETCH_PROFILE_FAILURE:
      const { error } = <APIActions.WithError<string>>action;
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
      const { data: jobPreferences } = action;
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
          zoomLink: jobPreferences.zoomLink
        },
        actions: {
          ...state.actions,
          buildJobPreferences: {
            ...state.actions.buildJobPreferences,
            isRequesting: false,
            error: ""
          }
        }
      };

    case InstructorActions.BUILD_JOB_PREFERENCES_FAILURE:
      const { error: buildJobPreferencesError } = <
        APIActions.WithError<string>
      >action;
      return {
        ...state,
        actions: {
          ...state.actions,
          buildJobPreferences: {
            isRequesting: false,
            error: buildJobPreferencesError
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
            isRequesting: true
          }
        }
      };

    case InstructorActions.FETCH_EDUCATION_SUCCESS:
      const { data: education } = <APIActions.WithData<EducationType[]>>action;
      return {
        ...state,
        instructor: {
          ...state.instructor,
          education: education
        },
        actions: {
          ...state.actions,
          fetchEducation: {
            ...state.actions.fetchEducation,
            isRequesting: false,
            error: ""
          }
        }
      };

    case InstructorActions.FETCH_EDUCATION_FAILURE:
      const { error: fetchEducationError } = <APIActions.WithError<string>>(
        action
      );
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
            message: ""
          }
        }
      };

    case InstructorActions.ADD_EDUCATION_SUCCESS:
      const { data: addedEducation } = <APIActions.WithData<any>>action;
      return {
        ...state,
        instructor: {
          ...state.instructor,
          education: [
            ...state.instructor.education,
            addedEducation
          ]
        },
        actions: {
          ...state.actions,
          addEducation: {
            ...state.actions.addEducation,
            isRequesting: false,
            error: ""
          }
        }
      };

    case InstructorActions.ADD_EDUCATION_FAILURE:
      const { error: addEducationError } = <APIActions.WithError<string>>action;
      return {
        ...state,
        actions: {
          ...state.actions,
          addEducation: {
            ...state.actions.addEducation,
            isRequesting: false,
            error: addEducationError,
            message: ""
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
            message: ""
          }
        }
      };

    case InstructorActions.EDIT_EDUCATION_SUCCESS:
      const {
        data: editEducation
    } = <APIActions.WithData<any>>(
        action
      );
      const updatedEducation = state.instructor.education.map((education) => {
        if (education.id === editEducation.id) {
          return {
            ...editEducation
          }
        }
        return education;
      });
      return {
        ...state,
        instructor: {
          ...state.instructor,
          education: updatedEducation
        },
        actions: {
          ...state.actions,
          editEducation: {
            ...state.actions.editEducation,
            isRequesting: false,
            error: "",
          }
        }
      };

    case InstructorActions.EDIT_EDUCATION_FAILURE:
      const { error: editEducationError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          editEducation: {
            ...state.actions.editEducation,
            isRequesting: false,
            error: editEducationError,
            message: ""
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
            message: ""
          }
        }
      };

    case InstructorActions.DELETE_EDUCATION_SUCCESS:
      const {
        data: deleteEducation
    } = <APIActions.WithData<any>>(
        action
      );
      const deletedEducation = state.instructor.education.filter((education) => {
        return education.id !== deleteEducation.id;
      })
      return {
        ...state,
        instructor: {
          ...state.instructor,
          education: deletedEducation
        },
        actions: {
          ...state.actions,
          deleteEducation: {
            ...state.actions.deleteEducation,
            isRequesting: false,
            error: "",
          }
        }
      };

    case InstructorActions.DELETE_EDUCATION_FAILURE:
      const { error: deleteEducationError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteEducation: {
            ...state.actions.deleteEducation,
            isRequesting: false,
            error: deleteEducationError,
            message: ""
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
            isRequesting: true
          }
        }
      };

    case InstructorActions.FETCH_EMPLOYMENT_SUCCESS:
      const { data: employment } = <APIActions.WithData<EmploymentType[]>>(
        action
      );
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
            error: ""
          }
        }
      };

    case InstructorActions.FETCH_EMPLOYMENT_FAILURE:
      const { error: fetchEmploymentError } = <APIActions.WithError<string>>(
        action
      );
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
            message: ""
          }
        }
      };

    case InstructorActions.ADD_EMPLOYMENT_SUCCESS:
      const {
        data: addEmployment
    } = <APIActions.WithData<any>>(
        action
      );
      return {
        ...state,
        instructor: {
          ...state.instructor,
          employment: [
            ...state.instructor.employment,
            addEmployment
          ]
        },
        actions: {
          ...state.actions,
          addEmployment: {
            ...state.actions.addEmployment,
            isRequesting: false,
            error: "",
          }
        }
      };

    case InstructorActions.ADD_EMPLOYMENT_FAILURE:
      const { error: addEmploymentError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          addEmployment: {
            ...state.actions.addEmployment,
            isRequesting: false,
            error: addEmploymentError,
            message: ""
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
            message: ""
          }
        }
      };

    case InstructorActions.EDIT_EMPLOYMENT_SUCCESS:
      const {
        data: editEmployment
    } = <APIActions.WithData<any>>(
        action
      );
      const updatedEmployment = state.instructor.employment.map((employment) => {
        if (employment.id === editEmployment.id) {
          return {
            ...editEmployment
          }
        }
        return employment;
      });
      return {
        ...state,
        instructor: {
          ...state.instructor,
          employment: updatedEmployment
        },
        actions: {
          ...state.actions,
          editEmployment: {
            ...state.actions.editEmployment,
            isRequesting: false,
            error: "",
          }
        }
      };

    case InstructorActions.EDIT_EMPLOYMENT_FAILURE:
      const { error: editEmploymentError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          editEmployment: {
            ...state.actions.editEmployment,
            isRequesting: false,
            error: editEmploymentError,
            message: ""
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
            message: ""
          }
        }
      };

    case InstructorActions.DELETE_EMPLOYMENT_SUCCESS:
      const {
        data: deleteEmployment
    } = <APIActions.WithData<any>>(
        action
      );
      const deletedEmployment = state.instructor.employment.filter((employment) => {
        return employment.id !== deleteEmployment.id;
      })
      return {
        ...state,
        instructor: {
          ...state.instructor,
          employment: deletedEmployment
        },
        actions: {
          ...state.actions,
          deleteEmployment: {
            ...state.actions.deleteEmployment,
            isRequesting: false,
            error: "",
          }
        }
      };

    case InstructorActions.DELETE_EMPLOYMENT_FAILURE:
      const { error: deleteEmploymentError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteEmployment: {
            ...state.actions.deleteEmployment,
            isRequesting: false,
            error: deleteEmploymentError,
            message: ""
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
            isRequesting: true
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
            error: ""
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTORS_FAILURE:
      const { error: fetchInstructorsError } = <APIActions.WithError<string>>(
        action
      );
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
            isRequesting: true
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTOR_SUCCESS:
      const { data: instructor } = action;
      return {
        ...state,
        instructorProfile: instructor,
        actions: {
          ...state.actions,
          fetchInstructor: {
            ...state.actions.fetchInstructor,
            isRequesting: false,
            error: ""
          }
        }
      };

    case InstructorActions.FETCH_INSTRUCTOR_FAILURE:
      const { error: fetchInstructorError } = <APIActions.WithError<string>>(
        action
      );
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

    case InstructorActions.FETCH_MORE_INSTRUCTORS: {
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchMoreInstructors: {
            ...state.actions.fetchMoreInstructors,
            isRequesting: true,
            error: ""
          }
        }
      };
    }

    case InstructorActions.FETCH_MORE_INSTRUCTORS_SUCCESS: {
      const { results } = action.data;

      return {
        ...state,
        instructors: {
          ...state.instructors,
          results:[ ...state.instructors.results, ...results]
        },
        actions: {
          ...state.actions,
          fetchMoreInstructors: {
            ...state.actions.fetchMoreInstructors,
            isRequesting: false,
            error: ""
          }
        }
      };
    }

    case InstructorActions.FETCH_MORE_INSTRUCTORS_FAILURE: {
      const { error: fetchInstructorError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchMoreInstructors: {
            isRequesting: false,
            error: fetchInstructorError
          }
        }
      };
    }

    case InstructorActions.REQUEST_REFERENCE:
      return {
        ...state,
        actions: {
          ...state.actions,
          requestReference: {
            ...state.actions.requestReference,
            isRequesting: true,
            message: "",
            error: ""
          }
        }
      };
    case InstructorActions.REQUEST_REFERENCE_SUCCESS:
      const {data: referencesData} = action;
      return {
        ...state,
        instructor: {
          references: referencesData.emails
        },
        actions: {
          ...state.actions,
          requestReference: {
            ...state.actions.requestReference,
            isRequesting: false,
            error: "",
            message: referencesData.message
          }
        }
      };
    case InstructorActions.REQUEST_REFERENCE_FAILURE:
      const { error: requestReferenceError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          requestReference: {
            isRequesting: false,
            error: requestReferenceError,
            message: ""
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
            error: ""
          }
        }
      };

    case InstructorActions.FETCH_REFERENCES_SUCCESS:
      return {
        ...state,
        instructor: {
          ...state.instructor,
          references: action.data.emails,
        },
        actions: {
          ...state.actions,
          fetchReferences: {
            ...state.actions.fetchReferences,
            isRequesting: false,
            error: ""
          }
        }
      };

    case InstructorActions.FETCH_REFERENCES_FAILURE:
      const { error: fetchReferencesError } = <APIActions.WithError<string>>(
        action
      );
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

    case InstructorActions.REQUEST_BACKGROUND_CHECK:
      return {
        ...state,
        actions: {
          ...state.actions,
          requestBackgroundCheck: {
            isRequesting: true,
            error: '',
            message: ''
          }
        }
      };

    case InstructorActions.REQUEST_BACKGROUND_CHECK_SUCCESS:
      const {data: backgroundMessage} = <APIActions.WithData<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          requestBackgroundCheck: {
            isRequesting: false,
            message: backgroundMessage,
            error: ''
          }
        }
      };

    case InstructorActions.REQUEST_BACKGROUND_CHECK_FAILURE:
      const { error: backgroundCheckError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          requestBackgroundCheck: {
            isRequesting: false,
            error: backgroundCheckError,
            message: ''
          }
        }
      };

    case InstructorActions.FETCH_BACKGROUND_CHECK_STATUS:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchBackgroundCheckStatus: {
            isRequesting: true,
            error: '',
          }
        }
      };

    case InstructorActions.FETCH_BACKGROUND_CHECK_STATUS_SUCCESS:
      return {
        ...state,
        instructor: {
          backgroundCheckResults: {
            requestorEmail: action.data.requestorEmail,
            status: action.data.status,
            result: action.data.result,
            createdAt: action.data.createdAt
          }
        },
        actions: {
          ...state.actions,
          fetchBackgroundCheckStatus: {
            isRequesting: false,
            error: ''
          }
        }
      };

    case InstructorActions.FETCH_BACKGROUND_CHECK_STATUS_FAILURE:
      const { error: backgroundStatusError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchBackgroundCheckStatus: {
            isRequesting: false,
            error: backgroundStatusError,
          }
        }
      };

    case InstructorActions.SUBMIT_APPLICACTION:
        return {
          ...state,
          actions: {
            ...state.actions,
            submitApplication: {
              ...state.actions.submitApplication,
              isRequesting: true,
              message: ''
            }
          }
        };

      case InstructorActions.SUBMIT_APPLICACTION_SUCCESS:
        const {data: submitApplicationMessage} = <APIActions.WithData<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            submitApplication: {
              ...state.actions.submitApplication,
              isRequesting: false,
              error: '',
              message: submitApplicationMessage
            }
          }
        };

      case InstructorActions.SUBMIT_APPLICACTION_FAILURE:
        const { error: submitApplicationError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            submitApplication: {
              ...state.actions.submitApplication,
              isRequesting: false,
              error: submitApplicationError,
              message: ''
            }
          }
        };

      case InstructorActions.GRADE_LESSON:
        return {
          ...state,
          actions: {
            ...state.actions,
            submitApplication: {
              ...state.actions.submitApplication,
              isRequesting: true,
              message: ''
            }
          }
        };

      case InstructorActions.GRADE_LESSON_SUCCESS:
        const {data: gradeLessonMessage} = <APIActions.WithData<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            gradeLesson: {
              ...state.actions.gradeLesson,
              isRequesting: false,
              error: '',
              message: gradeLessonMessage
            }
          }
        };

      case InstructorActions.GRADE_LESSON_FAILURE:
        const { error: gradeLessonError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            gradeLesson: {
              ...state.actions.gradeLesson,
              isRequesting: false,
              error: gradeLessonError,
              message: ''
            }
          }
        };


      case InstructorActions.RESET_GRADE_LESSON_MESSAGE:
        return {
          ...state,
          actions: {
            ...state.actions,
            gradeLesson: {
              ...state.actions.gradeLesson,
              message: undefined
            }
          }
        };

      case InstructorActions.SIGN_FILE:
        return {
          ...state,
          actions: {
            ...state.actions,
            signFile: {
              ...state.actions.signFile,
              isRequesting: true
            }
          }
        };

      case InstructorActions.SIGN_FILE_SUCCESS:
        const { data: signFileData } = action;

        return {
          ...state,
          instructor: {
            ...state.instructor,
            signedFile: signFileData.url
          },
          actions: {
            ...state.actions,
            signFile: {
              isRequesting: false,
              error: "",
              message: "Video uploaded successfully."
            }
          }
        };

      case InstructorActions.SIGN_FILE_FAILURE:
        const { error: signFileError } = <APIActions.WithError<string>>action;
        return {
          ...state,
          actions: {
            ...state.actions,
            signFile: {
              isRequesting: false,
              error: signFileError,
              message: ""
            }
          }
        };

      case InstructorActions.UPLOAD_VIDEO_PROFILE:
        return {
          ...state,
          actions: {
            ...state.actions,
            uploadVideoProfile: {
              ...state.actions.uploadVideoProfile,
              isRequesting: true
            }
          }
        };

      case InstructorActions.UPLOAD_VIDEO_PROFILE_SUCCESS:
        const { data: uploadVideoProfileMessage } = action;

        return {
          ...state,
          actions: {
            ...state.actions,
            uploadVideoProfile: {
              isRequesting: false,
              error: "",
              message: uploadVideoProfileMessage.message
            }
          }
        };

      case InstructorActions.UPLOAD_VIDEO_PROFILE_FAILURE:
        const { error: uploadVideoProfileError } = <APIActions.WithError<string>>action;
        return {
          ...state,
          actions: {
            ...state.actions,
            uploadVideoProfile: {
              isRequesting: false,
              error: uploadVideoProfileError,
              message: ""
            }
          }
        };

      case InstructorActions.REVIEW_INSTRUCTOR:
        return {
          ...state,
          actions: {
            ...state.actions,
            rateInstructor: {
              ...state.actions.rateInstructor,
              isRequesting: true
            },
          }
        };

      case InstructorActions.REVIEW_INSTRUCTOR_SUCCESS:
        const { data: rateInstructorMessage } = action;

        return {
          ...state,
          instructorReview: rateInstructorMessage,
          actions: {
            ...state.actions,
            rateInstructor: {
              isRequesting: false,
              error: "",
            }
          }
        };

      case InstructorActions.REVIEW_INSTRUCTOR_FAILURE:
        const { error: rateInstructorError } = <APIActions.WithError<string>>action;
        return {
          ...state,
          actions: {
            ...state.actions,
            rateInstructor: {
              isRequesting: false,
              error: rateInstructorError,
            }
          }
        };

      case InstructorActions.REVIEW_INSTRUCTOR_UNAUTHENTICATED:
        return {
          ...state,
          actions: {
            ...state.actions,
            rateInstructorUnauthenticated: {
              ...state.actions.rateInstructor,
              isRequesting: true
            },
          }
        };

      case InstructorActions.REVIEW_INSTRUCTOR_UNAUTHENTICATED_SUCCESS:
        const { data: reviewUnauthenticated } = action;

        return {
          ...state,
          instructorReview: reviewUnauthenticated,
          actions: {
            ...state.actions,
            rateInstructorUnauthenticated: {
              isRequesting: false,
              error: "",
            }
          }
        };

      case InstructorActions.REVIEW_INSTRUCTOR_UNAUTHENTICATED_FAILURE:
        const { error: reviewErrorUnauthenticated } = <APIActions.WithError<string>>action;
        return {
          ...state,
          actions: {
            ...state.actions,
            rateInstructorUnauthenticated: {
              isRequesting: false,
              error: reviewErrorUnauthenticated,
            }
          }
        };

    default:
      return state;
  }
}
