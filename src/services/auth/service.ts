import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { AuthUser } from './type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth, private db: Firestore) {}

  async signIn({ email, password }: AuthUser): Promise<string> {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const userRef = doc(this.db, 'users', user.uid);
      await updateDoc(userRef, {
        isOnline: true,
      });
      const token = await user.getIdToken();
      return token + 'tokenBridge' + user.uid;
    } catch (error: any) {
      throw error;
    }
  }

  async logout(userId: string): Promise<void> {
    try {
      await signOut(this.auth);
      const userRef = doc(this.db, 'users', userId);
      await updateDoc(userRef, {
        isOnline: false,
      });
    } catch (error) {
      throw error;
    }
  }
}
