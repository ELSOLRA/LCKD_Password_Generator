export interface Password {
  userId: string;
  website: string;
  username: string;
  password: string;
}

export interface CreatePasswordInput {
  website: string;
  username: string;
  password: string;
}

export interface UpdatePasswordInput {
  website: string;
  username?: string;
  password?: string;
}
