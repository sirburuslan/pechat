export interface BaseUser {
  email: string;
  password: string;
}

export interface UserPassword {
  password: string;
}

export interface CreateUser extends BaseUser {
  first_name: string;
  last_name: string;
}

export interface UpdateUser {
  first_name: string;
  last_name: string;
  role: number;
  phone: string;
}

export interface User extends CreateUser {
  id: number;
  role: number;
  phone: string;
  date_joined: string;
  token: string;
  sidebar: boolean;
}
