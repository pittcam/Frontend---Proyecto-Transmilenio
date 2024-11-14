import { Role } from './role';

export class Auth {
  accessToken: string;
  username: string;
  rol: Role;

  constructor(accessToken: string, username: string, role: Role) {
    this.accessToken = accessToken;
    this.username = username;
    this.rol = role;
  }
}
