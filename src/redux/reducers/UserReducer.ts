import { AnyAction } from 'redux';

import {
    defaultUsersState
} from '../models/UserModel';
import { UserState, UserType } from '../models/UserModel'
import { UserActions } from '../actions/UserActionTypes';
import { APIActions } from '../models/models';
import { setProfile } from './utils';

export default function usersReducer(
  state: UserState = defaultUsersState,
  action: AnyAction
): UserState {
  switch (action.type) {
    case UserActions.CREATE_USER:
      return {
        ...state,
        actions: {
          ...state.actions,
          createUser: {
            ...state.actions.createUser,
            isRequesting: true,
          }
        }
      };

    case UserActions.CREATE_USER_SUCCESS:
      const { data: userDetails } = action;
      return {
        ...state,
        token: action.data.token.access,
        user: {
          ...state.user,
          id: userDetails.id,
          birthday: userDetails.birthday,
          email: userDetails.email,
          referralToken: userDetails.referralToken,
          role: userDetails.role
        },
        actions: {
          ...state.actions,
          createUser: {
            ...state.actions.createUser,
            isRequesting: false,
            error: ''
          }
        }
      };

    case UserActions.CREATE_USER_FAILURE:
      const { error: createUserError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          createUser: {
            isRequesting: false,
            error: createUserError,
          }
        }
      };

    case UserActions.AUTHENTICATE_USER:
      return {
        ...state,
        actions: {
          ...state.actions,
          authenticateUser: {
            ...state.actions.authenticateUser,
            isRequesting: true,
            redirect: false
          }
        }
      };

    case UserActions.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        token: action.data.access,
        actions: {
          ...state.actions,
          authenticateUser: {
            ...state.actions.authenticateUser,
            isRequesting: false,
            error: '',
            redirect: true
          }
        }
      };

    case UserActions.AUTHENTICATE_USER_FAILURE:
      const { error: authenticateUserError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          authenticateUser: {
            isRequesting: false,
            error: authenticateUserError,
            redirect: false
          }
        }
      };

    case UserActions.FETCH_USER:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchUser: {
            ...state.actions.fetchUser,
            isRequesting: true,
          }
        }
      };

    case UserActions.FETCH_USER_SUCCESS:
      const { data: user } = action;
      const lastNameInitial = user.lastName.charAt(0).toUpperCase();

      return {
        ...state,
        user: {
          ...state.user,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          displayName: `${user.firstName} ${lastNameInitial}.`,
          gender: user.gender,
          role: user.role,
          birthday: user.birthday,
          location: user.location,
          phoneNumber: user.phone.phoneNumber,
          isPhoneVerified: user.phone.isVerified,
          lat: user.lat,
          lng: user.lng,
          referralToken: user.referralToken,
          profile: setProfile(user)
        },
        actions: {
          ...state.actions,
          fetchUser: {
            ...state.actions.fetchUser,
            isRequesting: false,
            error: ''
          }
        }
      };

    case UserActions.FETCH_USER_NOT_AUTHENTICATED:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchUser: {
            isRequesting: false,
            error: ''
          }
        }
      };

    case UserActions.FETCH_USER_FAILURE:
    case UserActions.FETCH_USER_NOT_AUTHENTICATED_FAILURE:
      const { error } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchUser: {
            isRequesting: false,
            error
          }
        }
      };

    case UserActions.UPDATE_USER:
      return {
        ...state,
        actions: {
          ...state.actions,
          updateUser: {
            ...state.actions.updateUser,
            isRequesting: true
          }
        }
      };

    case UserActions.UPDATE_USER_SUCCESS:
      const { data: updatedUser } = <APIActions.WithData<Partial<UserType>>> action;
      return {
        ...state,
        user: {
          ...state.user,
          ...updatedUser
        },
        actions: {
          ...state.actions,
          updateUser: {
            ...state.actions.updateUser,
            isRequesting: false,
            error: ''
          }
        }
      };

    case UserActions.UPDATE_USER_FAILURE:
      const { error: updateUserError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          updateUser: {
            isRequesting: false,
            error: updateUserError,
          }
        }
      };
    case UserActions.REQUEST_TOKEN:
      return {
        ...state,
        actions: {
          ...state.actions,
          requestToken: {
            ...state.actions.requestToken,
            isRequesting: true
          }
        }
      };

    case UserActions.REQUEST_TOKEN_SUCCESS:
      const { data: requestTokenData } = action;

      return {
        ...state,
        user: {
          ...state.user
        },
        actions: {
          ...state.actions,
          requestToken: {
            isRequesting: false,
            error: '',
            message: requestTokenData.message
          }
        }
      };

    case UserActions.REQUEST_TOKEN_FAILURE:
      const { error: requestTokenError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          requestToken: {
            isRequesting: false,
            error: requestTokenError,
            message: ''
          }
        }
      };

    case UserActions.RESET_REQUEST_TOKEN_MESSAGE:
      return {
        ...state,
        actions: {
          ...state.actions,
          requestToken: {
            ...state.actions.requestToken,
            message: ''
          }
        }
      };

    case UserActions.VERIFY_TOKEN:
      return {
        ...state,
        actions: {
          ...state.actions,
          verifyToken: {
            ...state.actions.verifyToken,
            isRequesting: true
          }
        }
      };

    case UserActions.VERIFY_TOKEN_SUCCESS:
      const { data: verifyTokenMessage } = action;

      return {
        ...state,
        user: {
          ...state.user,
          isPhoneVerified: true
        },
        actions: {
          ...state.actions,
          verifyToken: {
            isRequesting: false,
            error: '',
            message: verifyTokenMessage.message
          }
        }
      };

    case UserActions.VERIFY_TOKEN_FAILURE:
      const { error: verifyTokenError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          verifyToken: {
            isRequesting: false,
            error: verifyTokenError,
            message: ''
          }
        }
      };

    case UserActions.RESET_VERIFY_TOKEN_MESSAGE:
      return {
        ...state,
        actions: {
          ...state.actions,
          verifyToken: {
            ...state.actions.verifyToken,
            message: ''
          }
        }
      };

    case UserActions.CHANGE_AVATAR:
      const withAvatar =
        state.user.id === action.id
          ? {
            ...state.user,
            avatar: action.avatar
          }
          : state.user;

      return {
        ...state,
        user: withAvatar
      };

    case UserActions.SET_INVITATION_TOKEN:
      return {
        ...state,
        invitationToken: action.token
      };

    case UserActions.UPLOAD_AVATAR:
      return {
        ...state,
        actions: {
          ...state.actions,
          uploadAvatar: {
            ...state.actions.uploadAvatar,
            isRequesting: true
          }
        }
      };

    case UserActions.UPLOAD_AVATAR_SUCCESS:
      const { data: uploadAvatarMessage } = action;

      return {
        ...state,
        user: {
          ...state.user,
          isPhoneVerified: true
        },
        actions: {
          ...state.actions,
          uploadAvatar: {
            isRequesting: false,
            error: '',
            message: uploadAvatarMessage.message
          }
        }
      };

    case UserActions.UPLOAD_AVATAR_FAILURE:
      const { error: uploadAvatarError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          uploadAvatar: {
            isRequesting: false,
            error: uploadAvatarError,
            message: ''
          }
        }
      };

    case UserActions.LOGOUT_USER:
      return {
        ...state,
        actions: {
          ...state.actions,
          logOutUser: {
            ...state.actions.logOutUser,
            isRequesting: true,
            message: ''
          }
        }
      };

    case UserActions.LOGOUT_USER_SUCCESS:
      const { data: message } = <APIActions.WithData<string>> action;
      return {
        ...state,
        token: '',
        user: {
          ...state.user,
          email: '',
          firstName: '',
          lastName: '',
          middleName: '',
          gender: '',
          role: '',
          birthday: '',
          location: '',
          phone: {
            phoneNumber: '',
            isVerified: false
          },
          lat: '',
          lng: ''
        },
        actions: {
          ...state.actions,
          logOutUser: {
            ...state.actions.logOutUser,
            isRequesting: false,
            error: '',
            message
          },
          authenticateUser: {
            ...state.actions.authenticateUser,
            isRequesting: false,
            error: '',
            redirect: false
          },
        }
      };

    case UserActions.LOGOUT_USER_FAILURE:
      const logoutError = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          logOutUser: {
            isRequesting: false,
            error: logoutError.error,
            message: ''
          }
        }
      };

    case UserActions.SET_NEW_PASSWORD:
      return {
        ...state,
        actions: {
          ...state.actions,
          setPassword: {
            ...state.actions.setPassword,
            isRequesting: true,
            message: ''
          }
        }
      };

    case UserActions.SET_NEW_PASSWORD_SUCCESS:
      const { data: setPasswordMessage } = <APIActions.WithData<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          setPassword: {
            ...state.actions.requestPasswordRecovery,
            isRequesting: false,
            error: '',
            message: setPasswordMessage
          }
        }
      };

    case UserActions.SET_NEW_PASSWORD_FAILURE:
      const setPasswordError = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          setPassword: {
            isRequesting: false,
            error: setPasswordError.error,
            message: ''
          }
        }
      };

    case UserActions.REQUEST_PASSWORD_RECOVERY:
      return {
        ...state,
        actions: {
          ...state.actions,
          requestPasswordRecovery: {
            ...state.actions.requestPasswordRecovery,
            isRequesting: true,
            message: ''
          }
        }
      };

    case UserActions.REQUEST_PASSWORD_RECOVERY_SUCCESS:
      const { data: passwordRecoveryMessage } = <APIActions.WithData<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          requestPasswordRecovery: {
            ...state.actions.requestPasswordRecovery,
            isRequesting: false,
            error: '',
            message: passwordRecoveryMessage
          }
        }
      };

    case UserActions.REQUEST_PASSWORD_RECOVERY_FAILURE:
      const passwordRecoveryError = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          requestPasswordRecovery: {
            isRequesting: false,
            error: passwordRecoveryError.error,
            message: ''
          }
        }
      };

    case UserActions.SEND_REFERRAL_INVITE:
      return {
        ...state,
        actions: {
          ...state.actions,
          referralInvite: {
            ...state.actions.referralInvite,
            isRequesting: true
          }
        }
      };

    case UserActions.SEND_REFERRAL_INVITE_SUCCESS:
      const { data: referralInviteMessage } = action;

      return {
        ...state,
        user: {
          ...state.user
        },
        actions: {
          ...state.actions,
          referralInvite: {
            isRequesting: false,
            error: '',
            message: referralInviteMessage.message
          }
        }
      };

    case UserActions.SEND_REFFERRAL_INVITE_FAILURE:
      const { error: referralInviteError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
          referralInvite: {
            isRequesting: false,
            error: referralInviteError,
            message: ''
          }
        }
      };

    case UserActions.FETCH_LOWEST_RATE:
      return {
        ...state,
        user: {
          ...state.user,
          actions: {
            fetchLowestRate: {
              isRequesting: true,
              error: ''
            }
          }
        }
      };

    case UserActions.FETCH_LOWEST_RATE_SUCCESS:
      console.log(action);
      return {
        ...state,
        lowestRate: action.data.minRate,
        user: {
          ...state.user,
          actions: {
            fetchLowestRate: {
              isRequesting: false,
              error: ''
            }
          }
        }
      };

    case UserActions.FETCH_LOWEST_RATE_FAILURE:
      const { error: lowestRateError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        user: {
          ...state.user,
          actions: {
            fetchLowestRate: {
              isRequesting: false,
              error: lowestRateError
            }
          }
        }
      };

    default:
      return state;
  }
}
