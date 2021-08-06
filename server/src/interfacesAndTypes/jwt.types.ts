interface IToken {
   email: string;
   userId: string;
   iat: number;
   exp: number;
   iss: string;
   jwtVersion: string;
}

export type LinkPayloadType = Omit<IToken, 'userId' | 'jwtVersion'>;

export type RefreshTokenPayloadType = Omit<IToken, 'email'>;

export type AccessTokenPayloadType = Pick<IToken, 'userId'>;
