import { Action, createReducer, on } from '@ngrx/store';
import { BasicUserData } from 'src/services/user/type';
import * as actions from './user.actions';

const initialState: BasicUserData = {
  userId: '',
  name: '',
  profileImg: '',
  faculty: {
    id: '',
    name: '',
  },
};

const _userReducer = createReducer(
  initialState,
  on(actions.setUserState, (_, data) => data)
);

export function userReducer(state: BasicUserData | undefined, action: Action) {
  return _userReducer(state, action);
}
