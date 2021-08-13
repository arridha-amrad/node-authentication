import { HTTP_CODE } from '../enums/HTTP_CODE';
import { IException } from '../interfacesAndTypes/ExceptionTypes';

class Exception implements IException {
   date: Date = new Date();
   constructor(public status: HTTP_CODE, public message: string) {}
}

export default Exception;
