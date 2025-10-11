export interface User {
  userId: number;
  name: string;
  email: string;
  roles: { roleId: number; roleName: string }[];
  token: string;
}
