export interface User {
  id: number;
  email: string;
  access_token: string;
  expires_in: number;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface Store {
  user: User;
  loginError: Boolean;
  makingNetworkRequest: Boolean;
}
