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

export interface DeviceType {
  Id: number;
  Description: string;
}

export interface ModelType {
  Id: string;
  BrandId: string;
  Name: string;
  TypeId: null;
  Comment: string | null;
  Description: string | null;
}

export interface DeviceMap {
  [id: number]: string;
}

export interface Store {
  user: User;
  loginError: Boolean;
  makingNetworkRequest: Boolean;
  typesMap: object;
}
