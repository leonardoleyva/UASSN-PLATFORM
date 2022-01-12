import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/services/chat/service';
import { ChatMember, ChatRoom } from 'src/services/chat/type';
import { UserService } from 'src/services/user/service';
import { BasicUserData, User } from 'src/services/user/type';
import { Unsubscribe } from '@firebase/util';
import { ChatRoomState, setChatRoom } from '../state/chat.actions';

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.component.html',
  styleUrls: ['./home-users.component.scss'],
})
export class HomeUsersComponent implements OnInit, OnDestroy {
  user: BasicUserData = {
    userId: '',
    name: '',
    profileImg: '',
    faculty: {
      id: '',
      name: '',
    },
  };
  users: User[] = [];
  conversations: ChatMember[] = [];
  userSubscription: Subscription | undefined;
  private unsubscribeUsers: Unsubscribe | undefined;

  constructor(
    private userService: UserService,
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

        this.getUsers(this.user.userId);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeUsers?.();
    this.userSubscription?.unsubscribe();
  }

  getUsers(userId: string) {
    const { users, unsubscribe } = this.userService.getUsers(userId);
    this.users = users;
    this.unsubscribeUsers = unsubscribe;
  }

  async handleUserClick(user: ChatMember) {
    const currentUser = {
      userId: this.user.userId,
      name: this.user.name,
    };
    const members = [currentUser, user];
    const chatRoomId = await this.chatService.createChatRoom({
      members,
    });

    this.chatStore.dispatch(setChatRoom({ members, chatRoomId }));
  }
}
