export interface IUser {
  _id: string;
  username: string;
  name: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserCount {
  all: number;
  active: number;
  deactive: number;
}
