import {IRole} from "./IRole";

export interface IUser {
  id: number;
  name: string;
  surname: string;
  username: string;
  points: number;
  address: object;
  roles: IRole[];
  isInitialized: boolean,
  isAuthenticated: boolean
}
