import { Injectable } from '@angular/core';
import {
  doc,
  getDoc,
  Firestore,
  updateDoc,
  collection,
  query,
  getDocs,
  orderBy,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  deleteObject,
  StorageReference,
} from '@angular/fire/storage';
import { Unsubscribe } from '@firebase/util';
import { onSnapshot } from 'firebase/firestore';
import { BasicUserData, User } from './type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private serviceCollection: string = 'users';
  private folderStorage: string = 'users';

  constructor(private db: Firestore, private storageRef: Storage) {}

  async getBasicData(userId: string): Promise<BasicUserData> {
    try {
      const userRef = doc(this.db, this.serviceCollection, userId);
      const snap = await getDoc(userRef);
      const {
        name,
        faculty,
        userId: id,
        profileImg,
      } = snap.data() as BasicUserData;

      return {
        userId: id,
        name,
        profileImg,
        faculty,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProfileImg({
    userId,
    base64Img,
    hasAlreadyImage,
  }: {
    userId: string;
    base64Img: string;
    hasAlreadyImage: boolean;
  }): Promise<string> {
    try {
      const userImgRef = ref(
        this.storageRef,
        `${this.folderStorage}/${userId}.jpg`
      );

      if (hasAlreadyImage) {
        await deleteObject(userImgRef);
      }

      const imgURL = await this.uploadProfileImg(base64Img, userImgRef);
      const userRef = doc(this.db, this.serviceCollection, userId);

      updateDoc(userRef, {
        profileImg: imgURL,
      });

      return imgURL;
    } catch (error) {
      throw error;
    }
  }

  private async uploadProfileImg(file: string, ref: StorageReference) {
    const [, value] = file.split('base64,');
    await uploadString(ref, value, 'base64');
    return getDownloadURL(ref);
  }

  getUsers(userId: string): { users: User[]; unsubscribe: Unsubscribe } {
    const collectionRef = collection(this.db, this.serviceCollection);
    const q = query(collectionRef, orderBy('name'));

    const users: User[] = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      users.length = 0;
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data() as User;
        if (userId === data.userId) return;

        users.push(data);
      });
      console.log(users)
    });

    return { users, unsubscribe };
  }
}
