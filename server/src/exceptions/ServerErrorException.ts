import { HTTP_CODE } from '../enums/HTTP_CODE';
import Exception from './Exception';

class ServerErrorException extends Exception {
   constructor() {
      super(HTTP_CODE.SERVER_ERROR, 'Server Error');
   }
}

export default ServerErrorException;
