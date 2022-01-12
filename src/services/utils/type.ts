export type Error<EC> = {
  code: EC;
  message: string;
};

export type BucketPath = '/posts' | '/users';
