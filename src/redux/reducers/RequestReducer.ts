import { AnyAction } from "redux";

import { setCookie } from "../../utils/cookies";
import { APIActions } from "../models/models";
import {
  defaultRequestState,
  RequestState,
  RequestType
} from "../models/RequestModel";
import { RequestActions } from "../actions/RequestActionTypes";
import { BookLessonsData } from '../../components/BookLessons/model';

export default function requestsReducer(
  state: RequestState = defaultRequestState,
  action: AnyAction
): RequestState {
  switch (action.type) {
    case RequestActions.CREATE_STUDENT:
      return {
        ...state,
        student: {},
        actions: {
          ...state.actions,
          createStudent: {
            ...state.actions.createStudent,
            isRequesting: true,
            error: ""
          }
        }
      };

    case RequestActions.CREATE_STUDENT_SUCCESS:
      const { data: createStudent } = <APIActions.WithData<Partial<RequestType>>>action;
      setCookie("lessonId", createStudent.lessonId)
      return {
        ...state,
        student: createStudent,
        actions: {
          ...state.actions,
          createStudent: {
            ...state.actions.createStudent,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.CREATE_STUDENT_FAILURE:
      const { error: createStudentError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        student: {},
        actions: {
          ...state.actions,
          createStudent: {
            isRequesting: false,
            error: createStudentError
          }
        }
      };

    case RequestActions.CREATE_REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          createRequest: {
            ...state.actions.createRequest,
            isRequesting: true
          }
        }
      };

    case RequestActions.CREATE_REQUEST_SUCCESS:
      const { data: createdRequest } = <APIActions.WithData<Partial<RequestType>>>action;
      return {
        ...state,
        request: {
          ...state.request,
          ...createdRequest
        },
        requests: [...state.requests, createdRequest as RequestType],
        actions: {
          ...state.actions,
          createRequest: {
            ...state.actions.createRequest,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.CREATE_REQUEST_FAILURE:
      const { error: createRequestError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          createRequest: {
            isRequesting: false,
            error: createRequestError
          }
        }
      };

    case RequestActions.FETCH_REQUESTS:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchRequests: {
            ...state.actions.createRequest,
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_REQUESTS_SUCCESS:
      const { data: requests } = action;
      return {
        ...state,
        requests,
        actions: {
          ...state.actions,
          fetchRequests: {
            ...state.actions.fetchRequests,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.FETCH_REQUESTS_FAILURE:
      const { error: fetchRequestsError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchRequests: {
            isRequesting: false,
            error: fetchRequestsError
          }
        }
      };

    case RequestActions.FETCH_REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchRequests: {
            ...state.actions.createRequest,
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_REQUEST_SUCCESS:
      const { data: request } = action;
      return {
        ...state,
        request,
        actions: {
          ...state.actions,
          fetchRequest: {
            ...state.actions.fetchRequest,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.FETCH_REQUEST_FAILURE:
      const { error: fetchRequestError } = <APIActions.WithError<string>>action;
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchRequest: {
            isRequesting: false,
            error: fetchRequestError
          }
        }
      };

    case RequestActions.EDIT_REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          editRequest: {
            ...state.actions.editRequest,
            isRequesting: true,
            message: ""
          }
        }
      };

    case RequestActions.EDIT_REQUEST_SUCCESS:
      const { data: editRequest } = <APIActions.WithData<any>>action;
      const updatedRequest = state.requests.map((request) => {
        if (request.id === editRequest.id) {
          return {
            ...editRequest
          }
        }
        return request;
      });
      return {
        ...state,
        requests: updatedRequest,
        actions: {
          ...state.actions,
          editRequest: {
            ...state.actions.editRequest,
            isRequesting: false,
            error: "",
          }
        }
      };

    case RequestActions.EDIT_REQUEST_FAILURE:
      const { error: editRequestError } = <APIActions.WithError<string>>action;
      return {
        ...state,
        actions: {
          ...state.actions,
          editRequest: {
            isRequesting: false,
            error: editRequestError,
            message: ""
          }
        }
      };

    case RequestActions.DELETE_REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteRequest: {
            ...state.actions.deleteRequest,
            isRequesting: true,
            message: ""
          }
        }
      };

    case RequestActions.DELETE_REQUEST_SUCCESS:
      const { data: deleteRequest } = <APIActions.WithData<any>>(
        action
      );
      const deletedRequest = state.requests.filter((request) => {
        return request.id !== deleteRequest.id;
      });
      return {
        ...state,
        requests: deletedRequest,
        actions: {
          ...state.actions,
          deleteRequest: {
            ...state.actions.deleteRequest,
            isRequesting: false,
            error: "",
          }
        }
      };

    case RequestActions.EDIT_REQUEST_FAILURE:
      const { error: deleteRequestError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteRequest: {
            isRequesting: false,
            error: deleteRequestError,
            message: ""
          }
        }
      };

    case RequestActions.FETCH_REQUESTS_LIST:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchRequestList: {
            ...state.actions.fetchRequestList,
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_REQUESTS_LIST_SUCCESS:
      const { data: requestsList } = action;
      return {
        ...state,
        requestsList,
        actions: {
          ...state.actions,
          fetchRequestList: {
            ...state.actions.fetchRequestList,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.FETCH_REQUESTS_LIST_FAILURE:
      const { error: fetchRequestListError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchRequestList: {
            isRequesting: false,
            error: fetchRequestListError
          }
        }
      };

    case RequestActions.FETCH_MORE_REQUESTS_LIST:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchMoreRequestList: {
            error: '',
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_MORE_REQUESTS_LIST_SUCCESS:
      const { results } = action.data;
      return {
        ...state,
        requestsList: {
          ...state.requestsList,
          results: [...state.requestsList.results, ...results]
        },
        actions: {
          ...state.actions,
          fetchMoreRequestList: {
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.FETCH_MORE_REQUESTS_LIST_FAILURE: {
      const { error: fetchRequestListError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchMoreRequestList: {
            isRequesting: false,
            error: fetchRequestListError
          }
        }
      };
    }

    case RequestActions.FETCH_APPLICATION_LIST:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchApplicationList: {
            ...state.actions.fetchApplicationList,
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_APPLICATION_LIST_SUCCESS:
      const { data: applicationList } = action;
      return {
        ...state,
        applicationList,
        actions: {
          ...state.actions,
          fetchApplicationList: {
            ...state.actions.fetchApplicationList,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.FETCH_APPLICATION_LIST_FAILURE:
      const { error: applicationListError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchApplicationList: {
            isRequesting: false,
            error: applicationListError
          }
        }
      };

    case RequestActions.BOOK_LESSONS:
      return {
        ...state,
        actions: {
          ...state.actions,
          bookLessons: {
            ...state.actions.bookLessons,
            isRequesting: true,
            message: "",
            error: ""
          }
        }
      };

    case RequestActions.BOOK_LESSONS_SUCCESS:
      const { data: bookLessonsData } = <APIActions.WithData<{message: string, booking_id: number}>>action;
      return {
        ...state,
        bookingId: bookLessonsData.booking_id,
        actions: {
          ...state.actions,
          bookLessons: {
            ...state.actions.bookLessons,
            message: bookLessonsData.message,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.BOOK_LESSONS_FAILURE:
      const { error: bookLessonsError } = <APIActions.WithError<string>>action;
      return {
        ...state,
        actions: {
          ...state.actions,
          bookLessons: {
            isRequesting: false,
            error: bookLessonsError,
            message: ""
          }
        }
      };

    case RequestActions.FETCH_BOOK_LESSONS_DATA:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchBookLessonsData: {
            ...state.actions.fetchBookLessonsData,
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_BOOK_LESSONS_DATA_SUCCESS:
      const { data: bookingData } = action;
      return {
        ...state,
        clientSecret: bookingData.clientSecret,
        lessonRate: bookingData.lessonRate,
        lessonsPrice: bookingData.lessonsPrice,
        paymentMethods: bookingData.paymentMethods,
        placementFee: bookingData.placementFee,
        processingFee: bookingData.processingFee,
        subTotal: bookingData.subTotal,
        total: bookingData.total,
        freeTrial: bookingData.freeTrial,
        instructor: bookingData.instructor,
        actions: {
          ...state.actions,
          fetchBookLessonsData: {
            ...state.actions.fetchBookLessonsData,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.FETCH_BOOK_LESSONS_DATA_FAILURE:
      const { error: fetchBookLessonsDataError } = <
        APIActions.WithError<string>
      >action;
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchBookLessonsData: {
            isRequesting: false,
            error: fetchBookLessonsDataError
          }
        }
      };


    case RequestActions.CHOOSE_LESSON_PACKAGE:
      return {
        ...state,
        actions: {
          ...state.actions,
          chooseLessonsPackage: {
            ...state.actions.chooseLessonsPackage,
            isRequesting: true
          }
        }
      };

    case RequestActions.CHOOSE_LESSON_PACKAGE_SUCCESS:
      const { data: chooseLessonsData } = <APIActions.WithData<BookLessonsData>>action;
      return {
        ...state,
        clientSecret: chooseLessonsData.clientSecret,
        lessonRate: chooseLessonsData.lessonRate,
        lessonsPrice: chooseLessonsData.lessonsPrice,
        paymentMethods: chooseLessonsData.paymentMethods,
        placementFee: chooseLessonsData.placementFee,
        processingFee: chooseLessonsData.processingFee,
        subTotal: chooseLessonsData.subTotal,
        total: chooseLessonsData.total,
        freeTrial: chooseLessonsData.freeTrial,
        virtuosoDiscount: chooseLessonsData.virtuosoDiscount,
        discounts: chooseLessonsData.discounts,
        actions: {
          ...state.actions,
          chooseLessonsPackage: {
            ...state.actions.chooseLessonsPackage,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.CHOOSE_LESSON_PACKAGE_FAILURE:
      const { error: chooseLessonsPackageError } = <APIActions.WithError<string>>action;
      return {
        ...state,
        actions: {
          ...state.actions,
          chooseLessonsPackage: {
            isRequesting: false,
            error: chooseLessonsPackageError,
          }
        }
      };

    case RequestActions.SCHEDULE_LESSONS:
      return {
        ...state,
        actions: {
          ...state.actions,
          scheduleLessons: {
            isRequesting: true,
            message: "",
            error: ""
          }
        }
      };

    case RequestActions.SCHEDULE_LESSONS_SUCCESS:
      const { data: scheduleLessonsData } = <APIActions.WithData<{message: string, booking_id: number}>>action;
      return {
        ...state,
        actions: {
          ...state.actions,
          scheduleLessons: {
            message: scheduleLessonsData.message,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.SHCEDULE_LESSONS_FAILURE:
      const { error: scheduleLessonsError } = <APIActions.WithError<string>>action;
      return {
        ...state,
        actions: {
          ...state.actions,
          scheduleLessons: {
            isRequesting: false,
            error: scheduleLessonsError,
            message: ""
          }
        }
      };

    case RequestActions.FETCH_STUDENTS:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchStudents: {
            ...state.actions.fetchStudents,
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_STUDENTS_SUCCESS:
      const { data: studentsData } = action;
      return {
        ...state,
        students: studentsData,
        actions: {
          ...state.actions,
          fetchStudents: {
            ...state.actions.fetchStudents,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.FETCH_STUDENTS_FAILURE:
      const { error: fetchStudentsError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchStudents: {
            isRequesting: false,
            error: fetchStudentsError
          }
        }
      };

    case RequestActions.DELETE_STUDENT:
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteStudent: {
            ...state.actions.deleteStudent,
            isRequesting: true
          }
        }
      };

    case RequestActions.DELETE_STUDENT_SUCCESS:
      const { data: studentDeleteData } = action;
      const deletedStudent = state.students.filter((student) => {
        return student.id !== studentDeleteData.id;
      })
      return {
        ...state,
        students: deletedStudent,
        actions: {
          ...state.actions,
          deleteStudent: {
            ...state.actions.deleteStudent,
            isRequesting: false,
            error: ""
          }
        }
      };

    case RequestActions.DELETE_STUDENT_FAILURE:
      const { error: deleteStudentError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          deleteStudent: {
            isRequesting: false,
            error: deleteStudentError
          }
        }
      };

    default:
      return state;
  }
}
