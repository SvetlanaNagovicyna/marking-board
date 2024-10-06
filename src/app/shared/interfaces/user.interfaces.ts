import { Theme } from '../types/theme.type';

export interface User {
  id: string,
  email: string,
  name: string,
  hasPerm: boolean,
  idDb: string,
  theme: Theme,
}
