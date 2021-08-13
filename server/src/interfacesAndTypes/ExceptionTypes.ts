import { HTTP_CODE } from '../enums/HTTP_CODE';
import { IFieldError } from './AuthValidatorInterfaces';

export interface IException {
   status: HTTP_CODE;
   message: string;
   date?: Date;
}

export interface IBadRequest extends Omit<IException, 'message'> {
   messages: IFieldError[];
}

export type ExceptionType = IException | IBadRequest;
