import mongoose from 'mongoose';

export const connect = async (uri: string): Promise<typeof mongoose> => {
  return mongoose.connect(uri);
};

mongoose.connection.on('connected', () => console.log('mongoDB connected 🚀'));
mongoose.connection.on('error', () => console.log('Mongoose failed to connect to mongoDB'));
mongoose.connection.on('disconnected', () => console.log('mongoose is disconnected'));
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit();
});
