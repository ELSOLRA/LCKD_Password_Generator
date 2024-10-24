export interface User {
  userId: string;
  username: string;
  password: string;
}

export interface CreateUserInput {
  username: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface UserResponse {
  user: Omit<User, "password">; // Excludes password field
  token: string;
}
