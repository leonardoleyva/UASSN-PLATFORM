import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@firebase/util';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PostMakerValue } from 'src/app/modules/feed/components/post-maker/post-maker.component';
import { ChatService } from 'src/services/chat/service';
import { Message } from 'src/services/chat/type';
import { FeedService } from 'src/services/feed/service';
import { Post } from 'src/services/feed/type';
import { BasicUserData } from 'src/services/user/type';
import {
  ChatRoomState,
  setChatRoom,
  setIsChatRoomOpen,
} from '../../chat/state/chat.actions';
import { initialChatRoomState } from '../../chat/state/chat.reducer';

@Component({
  selector: 'app-home-posts',
  templateUrl: './home-posts.component.html',
  styleUrls: ['./home-posts.component.scss'],
})
export class HomePostsComponent implements OnInit, OnDestroy {
  user: BasicUserData = {
    userId: '',
    name: '',
    profileImg: '',
    faculty: {
      id: '',
      name: '',
    },
  };
  chatRoom: ChatRoomState = initialChatRoomState;
  chatRoomMessages: Message[] = [];
  posts: Post[] = [];
  unsubscribePosts: Unsubscribe | undefined;
  unsubscribeMessages: Unsubscribe | undefined;
  userSubscription: Subscription | undefined;
  chatSubscription: Subscription | undefined;

  constructor(
    private feedService: FeedService,
    private chatService: ChatService,
    private userStore: Store<{ userState: BasicUserData }>,
    private chatStore: Store<{ chatState: ChatRoomState }>
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userStore
      .select('userState')
      .subscribe((data) => {
        this.user = data;

        if (!this.user.userId) return;

        this.handleFetchPosts();
      });

    this.chatSubscription = this.chatStore
      .select('chatState')
      .subscribe((data) => {
        if (!this.chatRoom.chatRoomId && data.chatRoomId) {
          this.chatStore.dispatch(setIsChatRoomOpen({ isOpen: true }));
        }

        this.chatRoom = data;

        if (!this.chatRoom.chatRoomId) return;

        this.getChatRoomMessages(this.chatRoom.chatRoomId);
      });
  }

  ngOnDestroy() {
    this.unsubscribePosts?.();
    this.chatSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  handleFetchPosts() {
    const { unsubscribe, posts } = this.feedService.getAllPosts();
    this.posts = posts;
    this.unsubscribePosts = unsubscribe;
  }

  async handleSubmitPost(value: PostMakerValue) {
    const { userId, name, profileImg, faculty } = this.user;

    await this.feedService.createPost({
      userId,
      userName: name,
      profileImg,
      faculty,
      body: value,
    });
  }

  async sendMessage({ text }: { text: string; image?: string }) {
    await this.chatService.sendMessage(this.chatRoom.chatRoomId, {
      userId: this.user.userId,
      text,
    });
  }

  async handleChatRoomSubmit(value: { text: string }) {
    if (!value.text) return;
    this.sendMessage(value);
    console.log(value);
  }

  getChatRoomMessages(chatRoomId: string) {
    const { messages, unsubscribe } =
      this.chatService.getChatRoomMessages(chatRoomId);
    this.chatRoomMessages = messages;
    this.unsubscribeMessages = unsubscribe;
  }
}
