import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { BasicUserData } from 'src/services/user/type';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  user: BasicUserData = {
    userId: '',
    name: '',
    profileImg: '',
    faculty: {
      id: '',
      name: '',
    },
  };
  constructor(private titleService: Title) {
    this.titleService.setTitle(
      `${environment.PLATFORM_NAME} - Inicio de sesión`
    );
  }
}
