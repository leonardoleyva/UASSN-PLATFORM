import { Injectable } from '@angular/core';
import {
  collection,
  query,
  Firestore,
  orderBy,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadString,
  getDownloadURL,
} from '@angular/fire/storage';
import { Unsubscribe } from '@firebase/util';
import { Post } from './type';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private serviceCollection: string = 'posts';

  constructor(private db: Firestore, private storageRef: Storage) {}

  async createPost({
    userId,
    userName,
    profileImg,
    faculty,
    body,
  }: Omit<Post, 'likes' | 'comments' | 'createdAt' | 'postId'>) {
    try {
      const { text: postText, image: postImage } = body;
      const collectionRef = collection(this.db, this.serviceCollection);
      const post = await addDoc(collectionRef, {
        postId: '',
        userId,
        userName,
        profileImg,
        faculty,
        likes: 0,
        comments: 0,
        body: {
          text: postText,
          image: '',
        },
        createdAt: new Date().toISOString(),
      });

      if (postImage) {
        const imgURL = await this.uploadPostImg(postImage, post.id);
        const postRef = doc(this.db, this.serviceCollection, post.id);
        updateDoc(postRef, {
          'body.image': imgURL,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  private async uploadPostImg(file: string, postId: string) {
    const postImgRef = ref(this.storageRef, `posts/${postId}.jpg`);
    const [, value] = file.split('base64,');
    await uploadString(postImgRef, value, 'base64');
    return getDownloadURL(postImgRef);
  }

  getAllPosts(): { posts: Post[]; unsubscribe: Unsubscribe } {
    let posts: Post[] = [];
    const collectionRef = collection(this.db, this.serviceCollection);
    const onSnapshotQuery = query(collectionRef, orderBy('createdAt'));
    const unsubscribe = onSnapshot(onSnapshotQuery, (querySnapshot) => {
      posts.length = 0;
      querySnapshot.docs.forEach((doc) => {
        posts.unshift({ ...doc.data(), postId: doc.id } as Post);
      });
    });

    return {
      posts,
      unsubscribe,
    };
  }

  /**
   * `id` param can be an userId or groupId
   */
  getPostsById(id: string): { posts: Post[]; unsubscribe: Unsubscribe } {
    let posts: Post[] = [];
    const collectionRef = collection(this.db, this.serviceCollection);
    const onSnapshotQuery = query(
      collectionRef,
      where('userId', '==', id),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(onSnapshotQuery, (querySnapshot) => {
      posts.length = 0;
      querySnapshot.docs.forEach((doc) => {
        posts.unshift({ ...doc.data(), postId: doc.id } as Post);
      });
    });

    return {
      posts,
      unsubscribe,
    };
  }
}
