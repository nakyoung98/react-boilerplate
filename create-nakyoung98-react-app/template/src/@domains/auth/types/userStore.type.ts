type User = {
  username: string;
  role?: string;
};

export type UserState = {
  user: User | null;
};

export type UserActions = {
  setUser: (user: User) => void;
};
