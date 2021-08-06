import { AuthenticationStrategy } from '../enums/user.enum';
import {
   IUserModel,
   IFindUserOptions,
   IFilterOptions,
} from '../interfacesAndTypes/user.interfaces';
import UserModel from '../models/user.model';

export const save = async (user: IUserModel): Promise<IUserModel> => {
   const newUser = new UserModel(user);
   return newUser.save();
};

export const findUser = async (
   filterBy: Partial<IFilterOptions>,
   options?: Partial<IFindUserOptions>,
): Promise<(IUserModel | null) | null> => {
   console.log('options : ', options);

   let select: string[] = [];
   if (options?.isIncludeJWTVersion) {
      select = [...select, '+jwtVersion'];
   }
   if (options?.isIncludePassword) {
      select = [...select, '+password'];
   }
   if (options?.isRequiredAuthAction) {
      select = [...select, '+requiredAuthAction'];
   }
   if (options?.isStrategy) {
      select = [...select, '+strategy'];
   }
   const { _id, identity } = filterBy;
   return UserModel.findOne(
      identity
         ? identity.includes('@')
            ? { email: identity, strategy: AuthenticationStrategy.default }
            : { username: identity, strategy: AuthenticationStrategy.default }
         : { _id },
   )
      .select(select.join(' '))
      .exec();
};

export const findUserByUsernameOrEmail = async (
   usernameOrEmail: string,
): Promise<IUserModel | null> => {
   return UserModel.findOne(
      usernameOrEmail.includes('@')
         ? { email: usernameOrEmail }
         : { username: usernameOrEmail },
   );
};

export const findUserById = async (
   userId: string,
): Promise<IUserModel | null> => {
   return UserModel.findById(userId);
};

export const findUserByIdAndUpdate = async (
   id: string,
   update: Partial<IUserModel>,
): Promise<IUserModel | null> => {
   return UserModel.findByIdAndUpdate(id, { ...update });
};
