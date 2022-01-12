import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getImageURL } from 'src/services/utils/functions';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss'],
})
export class ChatUserComponent implements OnInit {
  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() isUserOnline: boolean = false;

  @Output() onClick = new EventEmitter();

  userImg: string = '';

  constructor() {}

  ngOnInit(): void {
    this.userImg = getImageURL(this.userId, '/users');
  }

  handleClick() {
    const user = {
      userId: this.userId,
      userName: this.userName,
    };
    this.onClick.emit(user);
  }
}
