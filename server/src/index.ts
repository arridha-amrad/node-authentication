// must be placed on top
import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV.trim()}` });
import configEnv from './config';
import cors from 'cors';
import express, {
   Request,
   Response,
   NextFunction,
   Express,
   Application,
} from 'express';
import cookieParser from 'cookie-parser';
import { ExceptionType } from './interfacesAndTypes/exception.types';
import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';
import TestRoutes from './routes/test.routes';
import { errorMiddleware } from './middleware/error.middleware';
import { connect } from './database/mongoDBInitializer';

console.clear();
console.log(configEnv.dbURI);

export const runServer = (): Application => {
   console.log('env : ', process.env.NODE_ENV.trim());
   console.log('configEnv : ', configEnv);

   const app: Express = express();
   app.use([
      cookieParser(process.env.CLIENT_ORIGIN),
      cors({
         origin: process.env.CLIENT_ORIGIN,
         credentials: true,
      }),
      express.json(),
      express.urlencoded({ extended: false }),
   ]);
   ``;
   app.use('/api/auth', AuthRoutes);
   app.use('/api/user', UserRoutes);
   app.use('/api/test', TestRoutes);
   app.use(
      // eslint-disable-next-line
      (err: ExceptionType, req: Request, res: Response, _: NextFunction) => {
         return errorMiddleware(err, req, res);
      },
   );
   app.listen(configEnv.port, () => {
      console.log(`Server running on http://localhost:${configEnv.port} 🚀`);
   });

   return app;
};

connect(configEnv.dbURI)
   .then(() => {
      runServer();
   })
   .catch(() => console.log('failure on starting server'));
