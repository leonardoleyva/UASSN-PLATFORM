import { createAction, props } from '@ngrx/store';
import { ChatMember, ChatRoom } from 'src/services/chat/type';

export interface ChatRoomState extends Omit<ChatRoom, 'timestamp'> {
  isOpen: boolean;
  convMember: ChatMember;
}

export const setChatRoom = createAction(
  'setChatRoom',
  props<Pick<ChatRoomState, 'chatRoomId' | 'members' | 'convMember'>>()
);
export const setIsChatRoomOpen = createAction(
  'setIsChatRoomOpen',
  props<Pick<ChatRoomState, 'isOpen'>>()
);
