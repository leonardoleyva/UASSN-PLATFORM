import { Faculty } from '../user/type';

interface PostBody {
  text: string;
  image?: string
}

export interface Post {
  postId: string
  userId: string;
  userName: string;
  profileImg: string;
  faculty: Faculty;
  body: PostBody;
  likes: number;
  comments: number;
  createdAt: string
}
