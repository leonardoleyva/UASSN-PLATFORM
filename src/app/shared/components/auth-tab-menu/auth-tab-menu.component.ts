import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

type AuthTabItem = 'login' | 'signup';

@Component({
  selector: 'app-auth-tab-menu',
  templateUrl: './auth-tab-menu.component.html',
  styleUrls: ['./auth-tab-menu.component.scss'],
})
export class AuthTabMenuComponent {
  @Input() activeTab: AuthTabItem = 'login';

  constructor(private router: Router) {}

  handleClick(tab: AuthTabItem) {
    if (this.activeTab === tab) {
      return;
    }

    this.router.navigate([`/${tab}`]);
  }
}
