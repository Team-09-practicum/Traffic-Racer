export type Theme = 'light' | 'dark';

export interface IUser {
  id?: number;
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
  avatar?: string;
  theme?: Theme | null;
}
