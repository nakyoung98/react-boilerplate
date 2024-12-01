export type AuthState = {
  accessToken: string | null;
  tokenPayload: TokenPayload | null;
};

export type AuthActions = {
  setAccessToken: (accessToken: string) => void;
  setTokenPayload: (accessToken: string) => void;
};

export type TokenPayload = {
  sub: string;
  role: string;
  exp: number;
  lat: number;
};
