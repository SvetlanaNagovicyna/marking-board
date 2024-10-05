export interface User {
  id?: string,
  email: string,
  password?: string,
  returnSecureToken?: boolean,
  name?: string,
  hasPerm?: boolean,
  idDb?: string,
}
