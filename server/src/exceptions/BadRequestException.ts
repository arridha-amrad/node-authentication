import { HTTP_CODE } from '../enums/HTTP_CODE';
import { IFieldError } from '../interfacesAndTypes/authValidator.interfaces';
import { IBadRequest } from '../interfacesAndTypes/exception.types';

export class BadRequestException implements IBadRequest {
   public date: Date = new Date();
   public status: HTTP_CODE = HTTP_CODE.BAD_REQUEST;
   constructor(public messages: IFieldError[]) {}
}
