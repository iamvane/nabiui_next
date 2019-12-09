import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const moxios = require('moxios'); // Library error

import { defaultApiError } from 'constants/apiConstants';
import * as actions from 'redux/actions/UserActions';
import { UserActions } from 'redux/actions/UserActionTypes';
import { Role } from 'components/common/constants/Registration';
import { UserType } from 'redux/models/UserModel';
// import {
//   VerificationChannel
// } from 'components/AccountInfo/models';
import { accountInfo } from 'components/AccountInfo/test/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// const store = mockStore({});
const store = mockStore({
  getState: jest.fn(() => ({
    user: {
      token: 'foo'
    }
  })),
  dispatch: jest.fn()
});

describe('Users actions', () => {
  const setUpRequest = (status: number, response: any) => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: status,
        response: response
      });
    });
  };

  describe('createUser', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
      store.clearActions();
    });

    const mockedUser: UserType = {
      ...accountInfo,
      id: 'foo',
      firstName: 'bar',
      lastName: 'col',
      email: 'qux',
      password: 'foobar',
      role: Role.student,
      displayName: 'foo bar',
    };

    describe('on success', () => {
      beforeEach(async () => {
        setUpRequest(202, mockedUser);

        await store.dispatch(actions.createUser(mockedUser));
      });

      const expectedAction = [
          { type: UserActions.CREATE_USER, },
          { type: UserActions.CREATE_USER_SUCCESS, data: mockedUser }
        ];

      it('Dispatches CREATE_USER & CREATE_USER_SUCCESS', () => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    describe('On failure', () => {
      beforeEach(async () => {
        setUpRequest(500, {
          '__all__': [defaultApiError]
        });

        await store.dispatch(actions.createUser(mockedUser));
      });

      const expectedActions = [
        { type: UserActions.CREATE_USER },
        { type: UserActions.CREATE_USER_FAILURE, error: defaultApiError }
      ];

      it('Dispatches CREATE_USER & CREATE_USER_FAILURE', () => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('authenticateUser', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
      store.clearActions();
    });

    describe('on success', () => {
      beforeEach(async () => {
        setUpRequest(200, 'Send Token');

        await store.dispatch(actions.authenticateUser('fooEmail', 'fooPassword'));
      });

      const expectedAction = [
        { type: UserActions.AUTHENTICATE_USER, },
        { type: UserActions.AUTHENTICATE_USER_SUCCESS, data: 'Send Token' }
      ];

      it('Dispatches AUTHENTICATE_USER & AUTHENTICATE_USER_SUCCESS', () => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    describe('On failure', () => {
      const errorResponse = { response: { data: undefined, status: 404} };

      beforeEach(async () => {
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.reject(errorResponse);
        });

        await store.dispatch(actions.authenticateUser('fooEmail', 'fooPassword'));
      });

      const expectedActions = [
        { type: UserActions.AUTHENTICATE_USER },
        { type: UserActions.AUTHENTICATE_USER_FAILURE, error: defaultApiError }
      ];

      it('Dispatches AUTHENTICATE_USER & AUTHENTICATE_USER_FAILURE', () => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  // describe('updateUser', () => {
  //   beforeEach(() => {
  //     moxios.install();
  //   });

  //   afterEach(() => {
  //     moxios.uninstall();
  //     store.clearActions();
  //   });

  //   describe('on success', () => {
  //     beforeEach(async () => {
  //       moxios.wait(() => {
  //         let request = moxios.requests.mostRecent();
  //         request.respondWith({
  //           status: 202,
  //           response: accountInfo,
  //         });
  //       });

  //       // const getState = jest.fn(() => ({
  //       //   user: {
  //       //     token: 'foo'
  //       //   }
  //       // }));
  //       await store.dispatch(actions.updateUser(accountInfo));
  //     });

  //     const expectedAction = [
  //         { type: UserActions.UPDATE_USER, },
  //         { type: UserActions.UPDATE_USER_SUCCESS, data: accountInfo }
  //       ];

  //     it('Dispatches UPDATE_USER & UPDATE_USER_SUCCESS', () => {
  //       expect(store.getActions()).toEqual(expectedAction);
  //     });
  //   });

  //   describe('On failure', () => {
  //     const errorResponse = { response: null };

  //     beforeEach(async () => {
  //       moxios.wait(() => {
  //         let request = moxios.requests.mostRecent();
  //         request.reject(errorResponse);
  //       });

  //       await store.dispatch(actions.updateUser(accountInfo));
  //     });

  //     const expectedActions = [
  //       { type: UserActions.UPDATE_USER },
  //       { type: UserActions.UPDATE_USER_FAILURE, error: defaultApiError }
  //     ];

  //     it('Dispatches UPDATE_USER & UPDATE_USER_FAILURE', () => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //   });
  // });

  // describe('requestToken', () => {
  //   beforeEach(() => {
  //     moxios.install();
  //   });

  //   afterEach(() => {
  //     moxios.uninstall();
  //     store.clearActions();
  //   });

  //   describe('on success', () => {
  //     const data = {
  //       phoneNumber: '85743894713',
  //       message: 'Token sent.'
  //     };

  //     beforeEach(async () => {
  //       setUpRequest(202, data);

  //       await store.dispatch(actions.requestToken('85743894713', VerificationChannel.Text));
  //     });

  //     const expectedAction = [
  //         { type: UserActions.REQUEST_TOKEN, },
  //         { type: UserActions.REQUEST_TOKEN_SUCCESS, data }
  //       ];

  //     it('Dispatches REQUEST_TOKEN & REQUEST_TOKEN_SUCCESS', () => {
  //       expect(store.getActions()).toEqual(expectedAction);
  //     });
  //   });

  //   describe('On failure', () => {
  //     const errorResponse = { response: null };

  //     beforeEach(async () => {
  //       moxios.wait(() => {
  //         let request = moxios.requests.mostRecent();
  //         request.reject(errorResponse);
  //       });

  //       await store.dispatch(actions.requestToken('85743894713', VerificationChannel.Text));
  //     });

  //     const expectedActions = [
  //       { type: UserActions.REQUEST_TOKEN },
  //       { type: UserActions.REQUEST_TOKEN_FAILURE, error: defaultApiError }
  //     ];

  //     it('Dispatches REQUEST_TOKEN & REQUEST_TOKEN_FAILURE', () => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //   });
  // });

  // describe('verifyToken', () => {
  //   beforeEach(() => {
  //     moxios.install();
  //   });

  //   afterEach(() => {
  //     moxios.uninstall();
  //     store.clearActions();
  //   });

  //   describe('on success', () => {
  //     const data = {
  //       phoneNumber: '85743894713',
  //       message: 'Phone verified.'
  //     };

  //     beforeEach(async () => {
  //       setUpRequest(202, data);

  //       await store.dispatch(actions.verifyToken('85743894713', 'fooToken'));
  //     });

  //     const expectedAction = [
  //         { type: UserActions.VERIFY_TOKEN, },
  //         { type: UserActions.VERIFY_TOKEN_SUCCESS, data }
  //       ];

  //     it('Dispatches VERIFY_TOKEN & VERIFY_TOKEN_SUCCESS', () => {
  //       expect(store.getActions()).toEqual(expectedAction);
  //     });
  //   });

  //   describe('On failure', () => {
  //     const errorResponse = { response: null };

  //     beforeEach(async () => {
  //       moxios.wait(() => {
  //         let request = moxios.requests.mostRecent();
  //         request.reject(errorResponse);
  //       });

  //       await store.dispatch(actions.verifyToken('85743894713', 'foo token'));
  //     });

  //     const expectedActions = [
  //       { type: UserActions.VERIFY_TOKEN },
  //       { type: UserActions.VERIFY_TOKEN_FAILURE, error: defaultApiError }
  //     ];

  //     it('Dispatches VERIFY_TOKEN & VERIFY_TOKEN_FAILURE', () => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //   });
  // });

  // describe('changeAvatar', () => {
  //   const expectedAction = {
  //     id: 'foo',
  //     avatar: 'caracas',
  //     type: UserActions.CHANGE_AVATAR
  //   };
  //   it('Dispatches CHANGE_AVATAR', () => {
  //     expect(actions.changeAvatar('foo', 'caracas')).toEqual(expectedAction);
  //   });
  // });
});
