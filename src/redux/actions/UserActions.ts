import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

import {
  defaultApiError,
  unauthorizedError
} from "../../constants/apiConstants";
import { getError } from "../../utils/handleApiErros";
import { ApiEndpoints } from "../../constants/apiEndpoints";
import { Role } from "../../constants/Roles";
import { RegistrationType } from "../../components/Auth/Registration/models";
import {
  AccountInfoType,
  VerificationChannel
} from "../../components/AccountInfo/models";
import { getCookie } from "../../utils/cookies";
import { requestAction, withDataAction, withErrorAction } from "./actions";
import { UserActions } from "./UserActionTypes";

interface ChangeAvatar extends Action {
  id: number;
  avatar: string;
}

interface ReferralToken extends Action {
  token: string;
}

// Default error message
let errorMessage = defaultApiError;
const authToken = getCookie("token");

/**
 * Action creator for adding a new user
 */
export const createUser = (
  user: RegistrationType
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.CREATE_USER));
  try {
    const url = ApiEndpoints.register;
    const response = await axios.post(url, user);
    dispatch(withDataAction(UserActions.CREATE_USER_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(UserActions.CREATE_USER_FAILURE, getError(e)));
  }
};

/**
 * Action creator for authenticating users
 */
export const authenticateUser = (
  email: string,
  password: string
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.AUTHENTICATE_USER));
  try {
    const url = ApiEndpoints.login;
    const requestBody = {
      email,
      password
    };
    const response = await axios.post(url, requestBody);
    dispatch(
      withDataAction(UserActions.AUTHENTICATE_USER_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(
      withErrorAction(UserActions.AUTHENTICATE_USER_FAILURE, errorMessage)
    );
  }
};
export const fetchUserOnLogin = (
  token: string
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.FETCH_USER));
  try {
    const response = await axios.get(ApiEndpoints.fetchUser, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const user = response.data;
    if (user.email) {
      dispatch(withDataAction(UserActions.FETCH_USER_SUCCESS, user));
    } else {
      dispatch(requestAction(UserActions.FETCH_USER_NOT_AUTHENTICATED));
    }
  } catch (e) {
    if (e.response !== undefined && e.response.status === 401) {
      dispatch(requestAction(UserActions.FETCH_USER_NOT_AUTHENTICATED_FAILURE));
    } else {
      dispatch(
        withErrorAction(UserActions.FETCH_USER_FAILURE, unauthorizedError)
      );
    }
  }
};

export const fetchUser = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(UserActions.FETCH_USER));
  try {
    const response = await axios.get(ApiEndpoints.fetchUser, {
      headers: { Authorization: `Bearer ${getCookie("token")}` }
    });
    const user = response.data;
    if (user.email) {
      dispatch(withDataAction(UserActions.FETCH_USER_SUCCESS, user));
    } else {
      dispatch(requestAction(UserActions.FETCH_USER_NOT_AUTHENTICATED));
    }
  } catch (e) {
    if (e.response !== undefined && e.response.status === 401) {
      dispatch(requestAction(UserActions.FETCH_USER_NOT_AUTHENTICATED));
    } else {
      dispatch(
        withErrorAction(UserActions.FETCH_USER_FAILURE, unauthorizedError)
      );
    }
  }
};

/**
 * Action creator to change avatar
 */
export function changeAvatar(id: number, avatar: string): ChangeAvatar {
  return {
    id,
    avatar,
    type: UserActions.CHANGE_AVATAR
  };
}

export function setInvitationToken(token: string): ReferralToken {
  return {
    token,
    type: UserActions.SET_INVITATION_TOKEN
  };
}

export function setAuthToken(authToken: string) {
  return {
    authToken,
    type: UserActions.SET_AUTH_TOKEN
  };
}

export function setPathname(pathname: string) {
  return {
    pathname,
    type: UserActions.SET_URL_PATHNAME
  };
}

export const uploadAvatar = (
  value: string
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.UPLOAD_AVATAR));
  try {
    const url = ApiEndpoints.uploadAvatar;
    const requestBody = new FormData();
    requestBody.append("avatar", value);

    const response = await axios.post(url, requestBody, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    dispatch(withDataAction(UserActions.UPLOAD_AVATAR_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(UserActions.UPLOAD_AVATAR_FAILURE, errorMessage));
  }
};

/**
 * Action creator to update user
 */
export const updateUser = (
  data: AccountInfoType
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.UPDATE_USER));
  try {
    const response = await axios.put(ApiEndpoints.updateUser, data, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    dispatch(withDataAction(UserActions.UPDATE_USER_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(UserActions.UPDATE_USER_FAILURE, errorMessage));
  }
};

/**
 * Action creator to request Twilio token
 */
export const requestToken = (
  phoneNumber: string,
  channel: VerificationChannel
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.REQUEST_TOKEN));
  const data = {
    phoneNumber,
    channel
  };
  try {
    const response = await axios.post(
      ApiEndpoints.phoneVerificationToken,
      data,
      {
        headers: { Authorization: `Bearer ${authToken || getCookie("token")}` }
      }
    );

    dispatch(withDataAction(UserActions.REQUEST_TOKEN_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(UserActions.REQUEST_TOKEN_FAILURE, errorMessage));
  }
};

/**
 * Action creator to verify Twilio token
 */
export const verifyToken = (
  phoneNumber: string,
  token: string
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.VERIFY_TOKEN));
  const data = {
    phoneNumber,
    code: token
  };
  try {
    const response = await axios.put(
      ApiEndpoints.phoneVerificationToken,
      data,
      {
        headers: { Authorization: `Bearer ${authToken || getCookie("token")}` }
      }
    );

    dispatch(withDataAction(UserActions.VERIFY_TOKEN_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(UserActions.VERIFY_TOKEN_FAILURE, errorMessage));
  }
};

export const sendReferralInvite = (
  email: string
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.SEND_REFERRAL_INVITE));
  try {
    const response = await axios.post(
      ApiEndpoints.referralInvite,
      { email },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    dispatch(
      withDataAction(UserActions.SEND_REFERRAL_INVITE_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e, "email");
    }

    dispatch(
      withErrorAction(UserActions.SEND_REFFERRAL_INVITE_FAILURE, errorMessage)
    );
  }
};

export const logOutUser = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(UserActions.LOGOUT_USER));
  try {
    const response = await axios.get(ApiEndpoints.logout, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    if (response.data.message) {
      dispatch(
        withDataAction(UserActions.LOGOUT_USER_SUCCESS, response.data.message)
      );
    } else {
      dispatch(requestAction(UserActions.LOGOUT_USER_FAILURE));
    }
  } catch (e) {
    dispatch(
      withErrorAction(UserActions.LOGOUT_USER_FAILURE, unauthorizedError)
    );
  }
};

export const requestPasswordRecovery = (
  email: string
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.REQUEST_PASSWORD_RECOVERY));
  try {
    const response = await axios.post(ApiEndpoints.passwordRecovery, {
      email
    });
    if (response.data.message) {
      dispatch(
        withDataAction(
          UserActions.REQUEST_PASSWORD_RECOVERY_SUCCESS,
          response.data.message
        )
      );
    } else {
      dispatch(requestAction(UserActions.REQUEST_PASSWORD_RECOVERY_FAILURE));
    }
  } catch (e) {
    dispatch(
      withErrorAction(
        UserActions.REQUEST_PASSWORD_RECOVERY_FAILURE,
        unauthorizedError
      )
    );
  }
};

export const setPassword = (
  password: string,
  token: string
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.SET_NEW_PASSWORD));
  try {
    const response = await axios.put(
      `${ApiEndpoints.setPassword}?token=${token}`,
      {
        password
      }
    );

    if (response.data.message) {
      dispatch(
        withDataAction(
          UserActions.SET_NEW_PASSWORD_SUCCESS,
          response.data.message
        )
      );
    } else {
      dispatch(requestAction(UserActions.SET_NEW_PASSWORD_FAILURE));
    }
  } catch (e) {
    dispatch(
      withErrorAction(UserActions.SET_NEW_PASSWORD_FAILURE, unauthorizedError)
    );
  }
};

export const fetchLowestRate = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(UserActions.FETCH_LOWEST_RATE));
  try {
    const response = await axios.get(ApiEndpoints.fetchMinimalRate);

    dispatch(
      withDataAction(UserActions.FETCH_LOWEST_RATE_SUCCESS, response.data)
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e, "email");
    }
    dispatch(
      withErrorAction(UserActions.FETCH_LOWEST_RATE_FAILURE, errorMessage)
    );
  }
};

export const fetchReferralInfo = (
  token
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.FETCH_REFERRAL_INFO));
  try {
    const response = await axios.get(
      `${ApiEndpoints.fetchReferralInfo}${token}`
    );

    dispatch(
      withDataAction(UserActions.FETCH_REFERRAL_INFO_SUCCESS, {
        ...response.data,
        token
      })
    );
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }
    dispatch(
      withErrorAction(UserActions.FETCH_REFERRAL_INFO_FAILURE, errorMessage)
    );
  }
};

export const fetchDashboard = (
  role: Role
): ThunkAction<Promise<void>, {}, {}> => async (dispatch: Dispatch<{}>) => {
  dispatch(requestAction(UserActions.FETCH_DASHBOARD));
  try {
    const response = await axios.get(ApiEndpoints.dashboard, {
      headers: { Authorization: `Bearer ${getCookie("token")}` }
    });

    const data = {
      apiResponse: response.data,
      role
    };
    dispatch(withDataAction(UserActions.FETCH_DASHBOARD_SUCCESS, data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e, "email");
    }
    dispatch(
      withErrorAction(UserActions.FETCH_DASHBOARD_FAILURE, errorMessage)
    );
  }
};

export const fetchOffer = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(UserActions.FETCH_OFFER));
  try {
    const response = await axios.get(ApiEndpoints.offers);

    dispatch(withDataAction(UserActions.FETCH_OFFER_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === "string") {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(UserActions.FETCH_OFFER_FAILURE, errorMessage));
  }
};

export const setUserEmail = email => ({
  email,
  type: UserActions.SET_USER_EMAIL
});
