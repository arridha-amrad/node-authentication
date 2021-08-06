export interface IUser {
  isActive: boolean;
  isLogin: boolean;
  isVerified: boolean;
  _id: string | null;
  email: string | null;
  username: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
