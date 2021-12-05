import { Injectable } from '@angular/core';
import { doc, getDoc, Firestore } from '@angular/fire/firestore';
import { BasicUserData } from './type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Firestore) {}

  async getBasicData(userId: string): Promise<BasicUserData> {
    try {
      const userRef = doc(this.db, 'users', userId);
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
}
