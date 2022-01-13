import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/services/feed/service';
import { getImageURL } from 'src/services/utils/functions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() currentUserId: string = '';
  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() userImg: string = '';
  @Input() userType: string = '';
  @Input() facultyName: string = '';
  @Input() postContent: { text: string; img?: string } = { text: '' };
  @Input() likes: number = 0;
  @Input() comments: number = 0;

  imageURL = '';

  constructor() {}

  ngOnInit(): void {
    this.setUserProfileImg();
  }

  async setUserProfileImg() {
    this.imageURL = getImageURL(this.userId, '/users');
  }
}
