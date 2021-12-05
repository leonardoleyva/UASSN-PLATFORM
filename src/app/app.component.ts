import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from 'src/services/user/service';
import { BasicUserData } from 'src/services/user/type';
import { setUserState } from './core/auth/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn = false;
  user: BasicUserData = {
    userId: '',
    name: '',
    profileImg: '',
    faculty: {
      id: '',
      name: '',
    },
  };

  constructor(
    private store: Store<{ userState: BasicUserData }>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) return;

    const [, userId] = token?.split('tokenBridge');

    this.handleFetchUser(userId);
  }

  async handleFetchUser(userId: string) {
    try {
      const user = await this.userService.getBasicData(userId);

      this.store.dispatch(setUserState(user));
    } catch (error: any) {}
  }
}
