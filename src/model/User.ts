export interface Roles {
  subscriber?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  username: string;
  email: string;
  roles: Roles;
}
