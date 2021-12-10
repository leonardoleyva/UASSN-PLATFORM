import { Injectable } from '@angular/core';
import { doc, getDoc, Firestore, updateDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  deleteObject,
  StorageReference,
} from '@angular/fire/storage';
import { BasicUserData } from './type';

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

      const imgURL = await this.uploadPostImg(base64Img, userImgRef);
      const userRef = doc(this.db, this.serviceCollection, userId);

      updateDoc(userRef, {
        profileImg: imgURL,
      });

      return imgURL
    } catch (error) {
      throw error;
    }
  }

  private async uploadPostImg(file: string, ref: StorageReference) {
    const [, value] = file.split('base64,');
    await uploadString(ref, value, 'base64');
    return getDownloadURL(ref);
  }
}
