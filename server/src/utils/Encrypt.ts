import NodeRSA from 'node-rsa';
import fs from 'fs';

const publicKey = fs.readFileSync('keys/jwt_enc_public.pem', 'utf-8');
const privateKey = fs.readFileSync('keys/jwt_dec_private.pem', 'utf-8');

const rsaPublicKey = new NodeRSA(publicKey);
const rsaPrivateKey = new NodeRSA(privateKey);

export const encrypt = (text: string): string => {
  return rsaPublicKey.encrypt(text, 'base64');
};

export const decrypt = (text: string): string => {
  return rsaPrivateKey.decrypt(text, 'utf8');
};
