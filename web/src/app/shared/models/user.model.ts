export interface BaseUser {
  email: string;
  password: string;
}

export interface CreateUser extends BaseUser {
  first_name: string;
  last_name: string;
}

export interface User extends CreateUser {
  id: number;
  role: number;
  date_joined: string;
  token: string;
  sidebar: boolean;
}
