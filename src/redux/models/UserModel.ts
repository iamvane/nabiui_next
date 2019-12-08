import { UserState } from '../../types/user';

export const defaultUsersState: UserState = {
    // TODO: users should default to an empty object
    user: {
        id: '',
        email: '',
        password: '',
        role: '',
        firstName: '',
        lastName: '',
        middleName: '',
        gender: '',
        phoneNumber: '',
        phone: {
            phoneNumber: '',
            isVerified: false
        },
        location: '',
        lat: '',
        lng: '',
        displayName: '',
        birthday: '',
        avatar: '',
        referralToken: ''
    },
    token: '',
    invitationToken: '',
    actions: {
        createUser: {
            isRequesting: false,
            error: '',
        },
        authenticateUser: {
            isRequesting: false,
            error: '',
            redirect: false
        },
        fetchUser: {
            isRequesting: false,
            error: ''
        },
        updateUser: {
            isRequesting: false,
            error: ''
        },
        updateStudentDetail: {
            isRequesting: false,
            error: '',
            message: ''
        },
        fetchStudentDetail: {
            isRequesting: false,
            error: ''
        },
        requestToken: {
            isRequesting: false,
            error: '',
            message: ''
        },
        verifyToken: {
            isRequesting: false,
            error: '',
            message: ''
        },
        changeAvatar: {},
        uploadAvatar: {
            isRequesting: false,
            error: '',
            message: ''
        },
        fetchLocation: {
            isRequesting: false,
            error: '',
        },
        logOutUser: {
            isRequesting: false,
            error: '',
            message: ''
        },
        requestPasswordRecovery: {
            isRequesting: false,
            error: '',
            message: ''
        },
        setPassword: {
            isRequesting: false,
            error: '',
            message: ''
        },
        referralInvite: {
            isRequesting: false,
            error: '',
            message: ''
        },
        fetchLowestRate: {
            isRequesting: false,
            error: ''
        }
    },
};
