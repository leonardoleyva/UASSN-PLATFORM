import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@firebase/util';
import { Store } from '@ngrx/store';
import { PostMakerValue } from 'src/app/shared/components/post-maker/post-maker.component';
import { PostService } from 'src/services/post/service';
import { Post } from 'src/services/post/type';
import { BasicUserData } from 'src/services/user/type';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
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
    private postService: PostService,
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
    const { unsubscribe, posts } = this.postService.getAll();
    this.posts = posts;
    this.unsubscribePosts = unsubscribe;
  }

  async handleSubmitPost(value: PostMakerValue) {
    const { userId, name, profileImg, faculty } = this.user;

    await this.postService.createOne({
      userId,
      userName: name,
      profileImg,
      faculty,
      body: value,
    });
  }
}
