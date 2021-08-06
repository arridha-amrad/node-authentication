import { IUserModel } from '../interfacesAndTypes/user.interfaces';

export type LoginRequest = Pick<IUserModel, 'password'> & {
   identity: string;
};

export type RegisterRequest = Pick<
   IUserModel,
   'username' | 'email' | 'password'
>;

export type LoginResponse = Pick<IUserModel, 'email' | 'username'>;

export type FetchedUserResponse = Pick<
   IUserModel,
   'username' | 'email' | 'createdAt'
>;
