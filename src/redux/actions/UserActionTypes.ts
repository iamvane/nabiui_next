export enum UserActions {
    CREATE_USER = 'USERS/CREATE_USER',
    CREATE_USER_SUCCESS = 'USERS/CREATE_USER_SUCCESS',
    CREATE_USER_FAILURE = 'USERS/CREATE_USER_FAILURE',
    SET_INVITATION_TOKEN = 'USERS/SET_INVITATION_TOKEN',
    SET_AUTH_TOKEN = 'USERS/SET_AUTH_TOKEN',
    SET_URL_PATHNAME = 'USERS/SET_URL_PATHNAME',
    AUTHENTICATE_USER = 'USERS/AUTHENTICATE_USER',
    AUTHENTICATE_USER_SUCCESS = 'USERS/AUTHENTICATE_USER_SUCCESS',
    AUTHENTICATE_USER_FAILURE = 'USERS/AUTHENTICATE_USER_FAILURE',
    FETCH_USER = 'USERS/FETCH_USER',
    FETCH_USER_SUCCESS = 'USERS/FETCH_USER_SUCCESS',
    FETCH_USER_FAILURE = 'USERS/FETCH_USER_FAILURE',
    FETCH_USER_NOT_AUTHENTICATED = 'USERS/FETCH_USER_NOT_AUTHENTICATED',
    FETCH_USER_NOT_AUTHENTICATED_FAILURE = 'USERS/FETCH_USER_NOT_AUTHENTICATED_FAILURE',
    CHANGE_AVATAR = 'USERS/CHANGE_AVATAR',
    UPLOAD_AVATAR = 'USERS/UPLOAD_AVATAR',
    UPLOAD_AVATAR_SUCCESS = 'USERS/UPLOAD_AVATAR_SUCCESS',
    UPLOAD_AVATAR_FAILURE = 'USERS/UPLOAD_AVATAR_FAILURE',
    UPDATE_USER = 'USERS/UPDATE_USER',
    UPDATE_USER_SUCCESS = 'USERS/UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILURE = 'USERS/UPDATE_USER_FAILURE',
    REQUEST_TOKEN = 'REQUEST_TOKEN',
    REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS',
    REQUEST_TOKEN_FAILURE = 'REQUEST_TOKEN_FAILURE',
    RESET_REQUEST_TOKEN_MESSAGE = 'RESET_REQUEST_TOKEN_MESSAGE',
    VERIFY_TOKEN = 'VERIFY_TOKEN',
    VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS',
    VERIFY_TOKEN_FAILURE = 'VERIFY_TOKEN_FAILURE',
    RESET_VERIFY_TOKEN_MESSAGE = 'RESET_VERIFY_TOKEN_MESSAGE',
    LOGOUT_USER = 'LOGOUT_USER',
    LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS',
    LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE',
    REQUEST_PASSWORD_RECOVERY = 'REQUEST_PASSWORD_RECOVERY',
    REQUEST_PASSWORD_RECOVERY_SUCCESS = 'REQUEST_PASSWORD_RECOVERY_SUCCESS',
    REQUEST_PASSWORD_RECOVERY_FAILURE = 'REQUEST_PASSWORD_RECOVERY_FAILURE',
    SET_NEW_PASSWORD = 'SET_NEW_PASSWORD',
    SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS',
    SET_NEW_PASSWORD_FAILURE = 'SET_NEW_PASSWORD_FAILURE',
    SEND_REFERRAL_INVITE = 'SEND_REFERRAL_INVITE',
    SEND_REFERRAL_INVITE_SUCCESS = 'SEND_REFERRAL_INVITE_SUCCESS',
    SEND_REFFERRAL_INVITE_FAILURE = 'SEND_REFERRAL_INVITE_FAILURE',
    FETCH_LOWEST_RATE = 'FETCH_LOWEST_RATE',
    FETCH_LOWEST_RATE_SUCCESS = 'FETCH_LOWEST_RATE_SUCCESS',
    FETCH_LOWEST_RATE_FAILURE = 'FETCH_LOWEST_RATE_FAILURE',
    FETCH_DASHBOARD = 'FETCH_DASHBOARD',
    FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS',
    FETCH_DASHBOARD_FAILURE = 'FETCH_DASHBOARD_FAILURE',
    USER_SET_EMAIL = 'USERS/',
    FETCH_REFERRAL_INFO = 'FETCH_REFERRAL_INFO',
    FETCH_REFERRAL_INFO_SUCCESS = 'FETCH_REFERRAL_INFO_SUCCESS',
    FETCH_REFERRAL_INFO_FAILURE = 'FETCH_REFERRAL_INFO_SUCCESS'
}
