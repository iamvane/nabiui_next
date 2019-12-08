import { Action } from 'redux';
import { APIActions } from '../models/models';

export const requestAction = <T>(type: T): Action => ({
  type
});

export const withDataAction = <T, K>(type: T, data: K): APIActions.WithData<K> => ({
  type,
  data
});

export const withErrorAction = <T, K>(type: T, error: K): APIActions.WithError<K> => ({
  type,
  error
});
