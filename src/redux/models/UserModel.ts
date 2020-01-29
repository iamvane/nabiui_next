import {
  ActionStatus,
  ActionStatusWithRedirect,
  ActionStatusWithMessage
} from "./models";
import { AccountInfoType } from "../../components/AccountInfo/models";
import { RegistrationType } from "../../components/Auth/Registration/models";
import {
  StudentDetailsType,
  ParentProfileType
} from "../../components/Dashboard/ParentStudentDashboard/model";
import {
  InstructorDashboardType,
  ParentStudentDashboardType
} from "../../components/Dashboard/models";
import { getCookie } from "../../utils/cookies";
import { InstructorType } from "./InstructorModel";

export interface UserType extends AccountInfoType, RegistrationType {
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
  dashboard?: InstructorDashboardType | ParentStudentDashboardType;
}

export interface FetchLocationData {
  userId: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

interface ReferralInfo {
  displayName: string;
  avatar: string;
  openModal: boolean;
}

interface Offer {
  content: string;
  freeLesson: boolean;
  hideAt: string;
  name: string;
  percentDiscount: number;
  showAt: string;
}

export interface UserState {
  lowestRate?: number;
  user: UserType;
  token: string;
  referralInfo: ReferralInfo;
  invitationToken: string;
  offer: Offer;
  pathname?: string;
  actions: {
    createUser: ActionStatus;
    authenticateUser: ActionStatusWithRedirect;
    fetchUser: ActionStatus;
    updateUser: ActionStatus;
    updateStudentDetail: ActionStatusWithMessage;
    fetchStudentDetail: ActionStatus;
    requestToken: ActionStatusWithMessage;
    verifyToken: ActionStatusWithMessage;
    fetchOffer: ActionStatus;
    changeAvatar: any;
    uploadAvatar: ActionStatusWithMessage;
    fetchLocation: ActionStatus;
    logOutUser: ActionStatusWithMessage;
    requestPasswordRecovery: ActionStatusWithMessage;
    setPassword: ActionStatusWithMessage;
    referralInvite: ActionStatusWithMessage;
    fetchLowestRate: ActionStatus;
    fetchDashboard: ActionStatus;
    fetchReferralInfo: ActionStatus;
  };
}

export const defaultUsersState: UserState = {
  // TODO: users should default to an empty object
  user: {
    id: "",
    email: "",
    password: "",
    role: "",
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    phoneNumber: "",
    phone: {
      phoneNumber: "",
      isVerified: false
    },
    location: "",
    lat: "",
    lng: "",
    displayName: "",
    birthday: "",
    avatar: "",
    referralToken: "",
    pathname: getCookie("pathname")
  },
  token: "",
  invitationToken: "",
  referralInfo: {
    displayName: "",
    avatar: "",
    openModal: false
  },
  offer: {
    content: "San Valentin Special, get 10% off music lessons.",
    freeLesson: false,
    hideAt: "2020-01-31 19:12:57",
    name: "San Valentin Special",
    percentDiscount: 20,
    showAt: "2020-01-28 19:12:49"
  },
  actions: {
    createUser: {
      isRequesting: false,
      error: ""
    },
    authenticateUser: {
      isRequesting: false,
      error: "",
      redirect: false
    },
    fetchUser: {
      isRequesting: false,
      error: ""
    },
    updateUser: {
      isRequesting: false,
      error: ""
    },
    updateStudentDetail: {
      isRequesting: false,
      error: "",
      message: ""
    },
    fetchStudentDetail: {
      isRequesting: false,
      error: ""
    },
    fetchReferralInfo: {
      isRequesting: false,
      error: ""
    },
    requestToken: {
      isRequesting: false,
      error: "",
      message: ""
    },
    verifyToken: {
      isRequesting: false,
      error: "",
      message: ""
    },
    changeAvatar: {},
    uploadAvatar: {
      isRequesting: false,
      error: "",
      message: ""
    },
    fetchLocation: {
      isRequesting: false,
      error: ""
    },
    logOutUser: {
      isRequesting: false,
      error: "",
      message: ""
    },
    requestPasswordRecovery: {
      isRequesting: false,
      error: "",
      message: ""
    },
    setPassword: {
      isRequesting: false,
      error: "",
      message: ""
    },
    referralInvite: {
      isRequesting: false,
      error: "",
      message: ""
    },
    fetchLowestRate: {
      isRequesting: false,
      error: ""
    },
    fetchDashboard: {
      isRequesting: false,
      error: ""
    },
    fetchOffer: {
      isRequesting: false,
      error: ""
    }
  }
};
