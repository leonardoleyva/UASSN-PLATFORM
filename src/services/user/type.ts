export interface Faculty {
  id: string;
  name: string;
}

export interface BasicUserData {
  userId: string;
  name: string;
  profileImg: string;
  faculty: Faculty;
}
