import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/services/auth/service';
import { BasicUserData } from 'src/services/user/type';
import { setUserState } from '../../auth/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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
  isMenuOpen: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private store: Store<{ userState: BasicUserData }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select('userState').subscribe((data) => {
      this.user = data;

      if (data.userId) {
        this.isLoggedIn = true;
      }
    });
  }

  handleClickMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleGoHome() {
    this.router.navigate(['']);
  }

  handleGoProfile() {
    this.router.navigate(['profile']);
  }

  async handleLogout() {
    await this.authService.logout(this.user.userId);
    this.isLoggedIn = false;
    this.store.dispatch(
      setUserState({
        userId: '',
        name: '',
        profileImg: '',
        faculty: {
          id: '',
          name: '',
        },
      })
    );

    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
