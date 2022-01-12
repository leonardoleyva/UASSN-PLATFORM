import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './chat.actions';

export const initialChatRoomState: actions.ChatRoomState = {
  chatRoomId: '',
  members: [],
  isOpen: false,
};

const _chatReducer = createReducer(
  initialChatRoomState,
  on(actions.setChatRoom, (state, { chatRoomId, members }) => ({
    ...state,
    chatRoomId,
    members,
  })),
  on(actions.setIsChatRoomOpen, (state, { isOpen }) => ({ ...state, isOpen }))
);

export function chatReducer(
  state: actions.ChatRoomState | undefined,
  action: Action
) {
  return _chatReducer(state, action);
}
