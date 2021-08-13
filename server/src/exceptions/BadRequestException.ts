import { HTTP_CODE } from '../enums/HTTP_CODE';
import { IFieldError } from '../interfacesAndTypes/AuthValidatorInterfaces';
import { IBadRequest } from '../interfacesAndTypes/ExceptionTypes';

export class BadRequestException implements IBadRequest {
   public date: Date = new Date();
   public status: HTTP_CODE = HTTP_CODE.BAD_REQUEST;
   constructor(public messages: IFieldError[]) {}
}
