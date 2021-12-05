import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUserState } from 'src/app/core/auth/user.actions';
import { AuthenticationService } from 'src/services/auth/service';
import { AuthUser } from 'src/services/auth/type';
import { UserService } from 'src/services/user/service';
import { BasicUserData } from 'src/services/user/type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  data: AuthUser = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private store: Store<{ userState: BasicUserData }>
  ) {}

  async handleSubmit() {
    try {
      const token = await this.authService.signIn(this.data);

      localStorage.setItem('token', token);

      const [, userId] = token.split('tokenBridge');

      const user = await this.userService.getBasicData(userId);

      this.store.dispatch(setUserState(user));

      this.router.navigate(['']);
    } catch (error: any) {
      console.log(error);
    }
  }
}
