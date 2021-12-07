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
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadString,
  getDownloadURL,
} from '@angular/fire/storage';
import { Post } from './type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private serviceCollection: string = 'posts';

  constructor(private db: Firestore, private storageRef: Storage) {}

  async createOne({
    userId,
    userName,
    profileImg,
    faculty,
    body,
  }: Omit<Post, 'likes' | 'comments' | 'createdAt' | 'postId'>) {
    try {
      const { text: postText, image: postImage } = body
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

  async uploadPostImg(file: string, postId: string) {
    const postImgRef = ref(this.storageRef, `posts/${postId}.jpg`);
    const [, value] = file.split('base64,');
    await uploadString(postImgRef, value, 'base64');
    return getDownloadURL(postImgRef);
  }

  getAll() {
    let posts: Post[] = [];
    const collectionRef = collection(this.db, this.serviceCollection);
    const onSnapshotQuery = query(collectionRef, orderBy('createdAt'));
    const unsubscribe = onSnapshot(onSnapshotQuery, (querySnapshot) => {
      // Easier but maybe not better
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

  async getPostsById(id: string) {}
}
