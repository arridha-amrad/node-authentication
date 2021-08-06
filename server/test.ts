/* cSpell:disable */
// import NodeRSA from 'node-rsa';
// const key = new NodeRSA({ b: 1024 });

// console.log(key.exportKey('private'));
// console.log(key.exportKey('public'));

import jwt from 'jsonwebtoken';
import fs from 'fs';
import { decrypt, encrypt } from './src/utils/encrypt';

const str = 'Hello World';
const privateKey = fs.readFileSync('private.pem', 'utf-8');
const publicKey = fs.readFileSync('public.pem', 'utf-8');

// const sign = (text: string): Promise<string | undefined> => {
//    return new Promise((resolve, reject) => {
//       jwt.sign(text, privateKey, { algorithm: 'RS256' }, (err, payload) => {
//          if (err) {
//             reject(err);
//          }
//          resolve(payload);
//       });
//    });
// };
// sign(str).then((res) => console.log(encrypt(res ?? '').replaceAll('/', '_')));

// const token = sign(str).then((data) => data as string);

// const token =
//    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyMTdAbWFpbC5jb20iLCJpYXQiOjE2MjgyNDY1OTV9.QgOskrdsaufublndhAtR-1fBZnItMGc/KIfiOEdOxvvIlyBIbpvTBGu7IQ26-1DRfwFLlNjpn88yHpAIJhpEwoYdO5PbArLCq4GutabBwU-Ild067lJuF1HjmbRtiGhA-zdyAMwbYj2iwmTrIVSSCki0bu725Li/9CCSJcIdefuwy4sP4hA2lFkbPi2YakYroPjfJKuPL8DLi6slm4Jfuw61hfyN0Mkk3fI/G5pj7EXO3juilWt38xnOYZECgGss9-XkTiFdangXSxFEegiqklp1SsCqlNjth6yMdGrkU-1HKnYjCsUM/jT7HVmncIx3gI/X6Api2e2yUVGt4MMvawdec2 eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyMTdAbWFpbC5jb20iLCJpYXQiOjE2MjgyNDY1OTV9.QgOskrdsaufublndhAtR-1fBZnItMGc/KIfiOEdOxvvIlyBIbpvTBGu7IQ26-1DRfwFLlNjpn88yHpAIJhpEwoYdO5PbArLCq4GutabBwU-Ild067lJuF1HjmbRtiGhA-zdyAMwbYj2iwmTrIVSSCki0bu725Li/9CCSJcIdefuwy4sP4hA2lFkbPi2YakYroPjfJKuPL8DLi6slm4Jfuw61hfyN0Mkk3fI/G5pj7EXO3juilWt38xnOYZECgGss9-XkTiFdangXSxFEegiqklp1SsCqlNjth6yMdGrkU-1HKnYjCsUM/jT7HVmncIx3gI/X6Api2e2yUVGt4MMvaw';

const a =
   'dATDUFdLN3Ha7Mx5lrsOSKIPG9qSgF1pCRdyhRASaoa6sIkzg2Mxs4dAsE0pTv73_4c5W_LIYZLZ8OyHGd+Wm5hw1pTPe10oSxeaMMljCfopmp5ufLoFqAemvvh4OtW+VFdBQyHH0OsFFDTkigaKRIx0I69Rk_CBm3iC5XwiCKR3VLaZgYX2tJvG3zXmUOYdsMLr53wzOJ_b3YschIPikZpdW128KkPJ2ZH9R2TJxrUg5RvXTvP3kN5kY0PawwXb3ijToAKZ_a28Ul2dDHgwPR+fbqzklGcaQNn2fRQ8d3T_fKwT6Lr6diqm2nrBgkoG5lgSIZiNmMgAWUa02grL9gR9uI7Ay5505orGAAOqPtOYIAAHqOvgSw6hgPFZFgonpP1_zZ9WbrrNZ3MJE+zFv2PfKlqkcgRQapgIF07iZp2aumxQC5HXgvR8AdytbLhrlGDDETu2Upeu5SBshNpE1cnCLmUw0mjwvymwSY_EcbUhQpL4JbP6HhxWd8YerneGcBW6vvL_urVemQFqVPqn97JHfbvlwXpayP5eEg+u_vN2h2xS8eLOAH9XsieCutvQYsKKtlycQqTe77n2Kikvlv7u4wAj_kIkOGliocoO+IZuSDEagbtZ4Jtt0dYcUu8biUOR6A0S9PH9O5sVNhSwiZLxFPuPDy+dkOlTeNwiGg9OTirSP_wrDz5Iwp7YAMq9AXf+SfdSs6DHuOUUGCxVAUgyqAktDYwj1xPbAKyCXCrp7L8bbaQeiWelMx93OiBB4UfM3IH6vcfkTC_LiQtmJ6A+ZtuXJH7CkbpbeTZ6HmCdUEapIbnO3PEPYmXqLOK3Xrsy1VCwpiWdXkDs5FseyQ==';

const b = a.replaceAll('/', '_');
const c = decrypt(b);

const verify = (token: string) => {
   return new Promise((resolve, reject) => {
      jwt.verify(
         token,
         publicKey,
         { algorithms: ['RS256'] },
         (err, payload) => {
            if (err) {
               reject(err);
            }
            resolve(payload);
         },
      );
   });
};

verify(c).then((res) => console.log(res));
