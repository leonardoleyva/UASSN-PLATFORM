import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() onLogout = new EventEmitter();
  @Output() onGoProfile = new EventEmitter();
  @Output() onGoHome = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleGoHome() {
    this.onGoHome.emit();
  }

  handleGoProfile() {
    this.onGoProfile.emit();
  }

  handleLogout() {
    this.onLogout.emit();
  }
}
