export interface User {
  id: number;
  email: string;
}

export interface Token {
  access_token: string;
  expires_in: number;
}

export interface UserState {
  loggedIn: boolean;
}

export interface Store {
  user: User;
  token: Token;
  state: UserState;
}
