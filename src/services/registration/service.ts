import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { handleErrorCreateUser } from './error';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';
import { RegistrationBaseUser } from './type';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private auth: Auth, private db: Firestore) {}

  async createBaseUser({
    name,
    email,
    password,
    studentID,
    faculty,
  }: RegistrationBaseUser) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await setDoc(doc(this.db, 'users', user.uid), {
        userId: user.uid,
        name,
        email,
        studentID,
        faculty,
        isOnline: false,
        isStudent: true,
        profileImg: '',
      });
    } catch (error) {
      throw handleErrorCreateUser(error);
    }
  }
}
