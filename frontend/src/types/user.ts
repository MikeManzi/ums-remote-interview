export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  status?: string;
  nationality: string;
  profile?: string;
  email: string;
  password?: string;
  role?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
}
