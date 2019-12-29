import { defaultUsersState } from './UserModel';
import { defaultInstructorState } from './InstructorModel';
import { defaultRequestState } from './RequestModel';

export const defaultState = {
  user: defaultUsersState,
  instructor: defaultInstructorState,
  requests: defaultRequestState
}
