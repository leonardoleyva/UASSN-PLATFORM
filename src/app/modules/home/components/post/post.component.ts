import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() userType: string = '';
  @Input() facultyName: string = '';
  @Input() postContent: { text: string; img?: string } = { text: '' };
  @Input() likes: number = 0;
  @Input() comments: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
