import { Injectable } from '@angular/core';
import {
  collection,
  query,
  Firestore,
  orderBy,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  where,
  getDoc,
  getDocs,
  CollectionReference,
  setDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadString,
  getDownloadURL,
} from '@angular/fire/storage';
import { Unsubscribe } from '@firebase/util';
import {
  ChatMember,
  ChatRoom,
  CreateChatRoom,
  CreateMessage,
  Message,
} from './type';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private serviceCollection: string = 'chat-rooms';
  private serviceSubCollection: string = 'messages';
  private folderStorage: string = 'messages';

  constructor(private db: Firestore, private storageRef: Storage) {}

  async sendMessage(
    chatRoomId: string,
    { userId, text, image }: CreateMessage
  ) {
    try {
      const messagesCollectionRef = collection(
        this.db,
        `${this.serviceCollection}/${chatRoomId}/${this.serviceSubCollection}`
      );

      const data: Message = {
        userId,
        text,
        image: '',
        timestamp: Date.now(),
      };
      await addDoc(messagesCollectionRef, data);
    } catch (error) {
      throw error;
    }
  }

  async createChatRoom({ members }: CreateChatRoom): Promise<string> {
    try {
      const chatRoomId = this.createChatRoomId(members);
      const chatRoomAlreadyExists = await this.checkIfChatRoomExists(
        chatRoomId
      );
      if (chatRoomAlreadyExists) {
        return chatRoomId;
      }

      const chatRoomCollectionRef = doc(
        this.db,
        this.serviceCollection,
        chatRoomId
      );
      const newChatRoom: ChatRoom = {
        chatRoomId,
        members,
        timestamp: Date.now(),
      };
      await setDoc(chatRoomCollectionRef, newChatRoom);
      return chatRoomId;
    } catch (error) {
      throw error;
    }
  }

  private createChatRoomId(members: ChatMember[]): string {
    const userIdOne = members[0].userId;
    const userIdTwo = members[1].userId;
    return userIdOne.charAt(0) > userIdTwo.charAt(0)
      ? userIdOne + '===' + userIdTwo
      : userIdTwo + '===' + userIdOne;
  }

  private async checkIfChatRoomExists(chatRoomId: string): Promise<boolean> {
    try {
      const ref = doc(this.db, this.serviceCollection, chatRoomId);
      const docSnap = await getDoc(ref);
      return docSnap.exists();
    } catch (error) {
      throw error;
    }
  }

  getChatRoomMessages(chatRoomId: string): {
    messages: Message[];
    unsubscribe: Unsubscribe;
  } {
    const messagesCollectionRef = collection(
      this.db,
      `${this.serviceCollection}/${chatRoomId}/${this.serviceSubCollection}`
    );
    const q = query(messagesCollectionRef, orderBy('timestamp'));

    let messages: Message[] = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      messages.length = 0;
      querySnapshot.docs.forEach((doc) => {
        messages.push(doc.data() as Message);
      });
    });

    return { messages, unsubscribe };
  }

  // getConversations(userId: string): {
  //   conversations: ChatMember[];
  //   unsubscribe: Unsubscribe;
  // } {
  //   const collectionRef = collection(this.db, this.serviceCollection);
  //   const q = query(collectionRef);

  //   const conversations: ChatMember[] = [];
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     conversations.length = 0;
  //     querySnapshot.docs.forEach((doc) => {
  //       const userIds = doc.id.split('===');
  //       if (userIds.includes(userId)) {
  //         const { members } = doc.data() as ChatRoom;
  //         const convMember = this.getConversationMember(members, userId);

  //         conversations.unshift(convMember);
  //       }
  //     });
  //   });

  //   return { conversations, unsubscribe };
  // }

  // private getConversationMember(
  //   members: Record<string, ChatMember>,
  //   userIdToAvoid: string
  // ) {
  //   return Object.values(members).reduce((accum, member) => {
  //     if (userIdToAvoid === member.userId) return { ...accum };
  //     return { ...accum, [member.userId]: member };
  //   });
  // }
}
