import {
   IUserModel,
} from '../interfacesAndTypes/UserInterfaces';
import UserModel from '../models/UserModel';

export const save = async (user: IUserModel): Promise<IUserModel> => {
   const newUser = new UserModel(user);
   return newUser.save();
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
