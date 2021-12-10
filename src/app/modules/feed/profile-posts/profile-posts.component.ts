import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setProfileImg, setUserState } from 'src/app/core/auth/user.actions';
import { toBase64 } from 'src/app/shared/utils/image';
import { FeedService } from 'src/services/feed/service';
import { UserService } from 'src/services/user/service';
import { BasicUserData } from 'src/services/user/type';
import { PostMakerValue } from '../components/post-maker/post-maker.component';
import { Unsubscribe } from '@firebase/util';
import { Post } from 'src/services/feed/type';
import { ActivatedRoute } from '@angular/router';

const defaultUserValue: BasicUserData = {
  userId: '',
  name: '',
  profileImg: '',
  faculty: {
    id: '',
    name: '',
  },
};

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
})
export class ProfilePostsComponent implements OnInit {
  currentUser: BasicUserData = { ...defaultUserValue };
  userProfile: BasicUserData = { ...defaultUserValue };
  posts: Post[] = [];
  unsubscribePosts: Unsubscribe | undefined;

  constructor(
    private route: ActivatedRoute,
    private feedService: FeedService,
    private userService: UserService,
    private store: Store<{ userState: BasicUserData }>
  ) {
    this.userProfile.userId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    const profileId = this.userProfile.userId;
    if (profileId) {
      this.handleFetchUserProfile(profileId);
      this.handleFetchUserPosts(this.userProfile.userId);
    }

    this.store.select('userState').subscribe((data) => {
      this.currentUser = data;

      if (!this.currentUser.userId || profileId) return;

      this.handleFetchUserPosts(this.currentUser.userId);
    });
  }

  ngOnDestroy() {
    this.unsubscribePosts?.();
  }

  async handleFetchUserProfile(userId: string) {
    try {
      const user = await this.userService.getBasicData(userId);

      this.userProfile = user;
      console.log(this.userProfile);
    } catch (error: any) {}
  }

  handleFetchUserPosts(userId: string) {
    const { unsubscribe, posts } = this.feedService.getPostsById(userId);
    this.posts = posts;
    this.unsubscribePosts = unsubscribe;
  }

  async handleSubmitPost(value: PostMakerValue) {
    const { userId, name, profileImg, faculty } = this.currentUser;

    await this.feedService.createPost({
      userId,
      userName: name,
      profileImg,
      faculty,
      body: value,
    });
  }

  async uploadProfileImg(ev: any) {
    try {
      const imageFile = ev.target.files[0];
      const base64Img = (await toBase64(imageFile)) as string;

      const newImage = await this.userService.updateProfileImg({
        userId: this.currentUser.userId,
        base64Img,
        hasAlreadyImage: !!this.currentUser.profileImg,
      });

      this.store.dispatch(setProfileImg({ img: newImage }));
    } catch (error) {
      this.currentUser.profileImg = '';
      console.error(error);
    }
  }
}
