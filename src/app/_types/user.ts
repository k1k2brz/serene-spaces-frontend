import { userRole } from '../_configs';

export type UserRole = (typeof userRole)[keyof typeof userRole];

export interface User {
  id: number;
  email: string;
  role: UserRole;
  isActive: boolean;
  companyName: string;
  logoUrl: any;
  tokenVersion: number;
}
