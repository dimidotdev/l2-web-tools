import 'dotenv/config';

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
};

// Usuário hardcoded
const HARDCODED_USER: User = {
  id: '1',
  name: 'Admin',
  email: 'admin@l2tools.com',
  username: 'admin',
};

// Credenciais hardcoded
const VALID_CREDENTIALS = {
  username:  'admin',
  password: 'dimidotdev',
};

export function validateCredentials(username: string, password: string) {
  return username === VALID_CREDENTIALS.username && 
         password === VALID_CREDENTIALS.password;
}

export function getUser(): User {
  return HARDCODED_USER;
}