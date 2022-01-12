export interface Faculty {
  id: string;
  name: string;
}

export interface User {
  userId: string;
  name: string;
  profileImg: string;
  faculty: Faculty;
  isOnline: boolean;
  isStudent: boolean;
  email: string;
  studentID: string;
}

export interface BasicUserData extends Omit<User, 'isOnline' | 'isStudent' | 'email' | 'studentID'> {}
