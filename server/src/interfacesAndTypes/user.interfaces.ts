import { AuthenticationStrategy, RequiredAuthAction } from '../enums/user.enum';

export interface IUserModel {
   id: string;
   username: string;
   strategy: AuthenticationStrategy;
   email: string;
   password: string;
   requiredAuthAction: RequiredAuthAction;
   jwtVersion: string;
   role: string;
   // optional
   isActive?: boolean;
   isLogin?: boolean;
   isVerified?: boolean;
   // setup by mongoDB
   createdAt: Date;
   updatedAt: Date;
}

export interface IFindUserOptions {
   isIncludePassword: boolean;
   isIncludeJWTVersion: boolean;
   isRequiredAuthAction: boolean;
   isStrategy: boolean;
}

export interface IFilterOptions {
   _id: string;
   identity: string;
}
