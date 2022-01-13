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

  constructor() {}

  ngOnInit(): void {}

  handleGoProfile() {
    this.onGoProfile.emit();
  }

  handleLogout() {
    this.onLogout.emit();
  }
}
