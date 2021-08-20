import { IUserModel } from '../interfacesAndTypes/UserInterfaces';

export type LoginRequest = Pick<IUserModel, 'password'> & {
  identity: string;
};

export type RegisterRequest = Pick<IUserModel, 'username' | 'email' | 'password'>;

export type LoginResponse = Pick<IUserModel, 'email' | 'username' | 'id'>;

export type FetchedUserResponse = Pick<IUserModel, 'username' | 'email' | 'createdAt' | 'isLogin'>;
