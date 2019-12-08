
import {
    ActionStatus,
    ActionStatusWithRedirect,
    ActionStatusWithMessage
} from '../redux/models/models';
import { AccountInfoType } from './account-info';
import { RegistrationType } from './registration';
import { InstructorType } from './instructor';
import {
    StudentDetailsType,
    ParentProfileType
} from './student-dashboard';

export interface UserType extends
    AccountInfoType,
    RegistrationType {
    id?: string;
    displayName?: string;
    zipCode?: string;
    avatar?: string;
    state?: string;
    city?: string;
    country?: string;
    confirmNoMiddleName?: boolean;
    phone: {
        phoneNumber: string;
        isVerified: boolean;
    };
    referralToken: string;
    [key: string]: any;
    profile?: InstructorType | StudentDetailsType | ParentProfileType;
}

export interface FetchLocationData {
    userId: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
}

export interface UserState {
    lowestRate?: number;
    user: UserType;
    token: string;
    invitationToken: string;
    actions: {
        createUser: ActionStatus;
        authenticateUser: ActionStatusWithRedirect;
        fetchUser: ActionStatus;
        updateUser: ActionStatus;
        updateStudentDetail: ActionStatusWithMessage;
        fetchStudentDetail: ActionStatus;
        requestToken: ActionStatusWithMessage;
        verifyToken: ActionStatusWithMessage;
        changeAvatar: any;
        uploadAvatar: ActionStatusWithMessage;
        fetchLocation: ActionStatus;
        logOutUser: ActionStatusWithMessage;
        requestPasswordRecovery: ActionStatusWithMessage;
        setPassword: ActionStatusWithMessage;
        referralInvite: ActionStatusWithMessage;
        fetchLowestRate: ActionStatus;
    };
}

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
