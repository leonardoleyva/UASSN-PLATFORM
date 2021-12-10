import { createAction, props } from '@ngrx/store';
import { BasicUserData } from 'src/services/user/type';

export const setUserState = createAction(
  'setUserState',
  props<BasicUserData>()
);
export const setProfileImg = createAction(
  'setProfileImg',
  props<{ img: string }>()
);
