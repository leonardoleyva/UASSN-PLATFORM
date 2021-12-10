import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@firebase/util';
import { Store } from '@ngrx/store';
import { PostMakerValue } from 'src/app/modules/feed/components/post-maker/post-maker.component';
import { FeedService } from 'src/services/feed/service';
import { Post } from 'src/services/feed/type';
import { BasicUserData } from 'src/services/user/type';

@Component({
  selector: 'app-home-posts',
  templateUrl: './home-posts.component.html',
  styleUrls: ['./home-posts.component.scss'],
})
export class HomePostsComponent implements OnInit, OnDestroy {
  user: BasicUserData = {
    userId: '',
    name: '',
    profileImg: '',
    faculty: {
      id: '',
      name: '',
    },
  };
  posts: Post[] = [];
  unsubscribePosts: Unsubscribe | undefined;

  constructor(
    private feedService: FeedService,
    private store: Store<{ userState: BasicUserData }>
  ) {}

  ngOnInit(): void {
    this.store.select('userState').subscribe((data) => {
      this.user = data;

      if (!this.user.userId) return;

      this.handleFetchPosts();
    });
  }

  ngOnDestroy() {
    this.unsubscribePosts?.();
  }

  handleFetchPosts() {
    const { unsubscribe, posts } = this.feedService.getAllPosts();
    this.posts = posts;
    this.unsubscribePosts = unsubscribe;
  }

  async handleSubmitPost(value: PostMakerValue) {
    const { userId, name, profileImg, faculty } = this.user;

    await this.feedService.createPost({
      userId,
      userName: name,
      profileImg,
      faculty,
      body: value,
    });
  }
}
