import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BasicUserData } from 'src/services/user/type';

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

  constructor(private store: Store<{ userState: BasicUserData }>) {}

  ngOnInit(): void {
    this.store.select('userState').subscribe((data) => {
      this.user = data;

      if (data.userId) {
        this.isLoggedIn = true;
      }
    });
  }
}
