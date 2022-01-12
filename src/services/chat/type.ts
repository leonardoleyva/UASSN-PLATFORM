export interface ChatMember {
  userId: string;
  name: string;
}

export interface ChatRoom {
  chatRoomId: string;
  members: ChatMember[];
  timestamp: number;
}

export interface CreateChatRoom
  extends Omit<ChatRoom, 'chatRoomId' | 'timestamp'> {}

export interface Message {
  userId: string;
  text: string;
  image?: string;
  timestamp: number;
}

export interface CreateMessage extends Omit<Message, 'timestamp'> {}
