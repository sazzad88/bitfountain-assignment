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
  Id: number;
  BrandId: string;
  Name: string;
  TypeId: number;
  Comment: string | null;
  Description: string | null;
}

export interface OverviewType {
  Id: number;
  DataType: string;
  Brand: string;
  Model: string;
  Name: string;
  DisplayName: string;
  Description: string;
  Status: string | null;
  GroupId: number;
  ProtocolOrder: number;
}

export interface DeviceTypeMap {
  [id: number]: string;
}

export interface Store {
  user: User;
  loginError: Boolean;
  makingNetworkRequest: Boolean;
  typesMap: DeviceTypeMap;
}
