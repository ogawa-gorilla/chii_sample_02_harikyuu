import { Role } from "./role";

export interface User {
  name: string;
  email: string;
  role: Role;
}