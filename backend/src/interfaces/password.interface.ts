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
  password: string; // only password for the update
}

export interface UpdatePasswordRequest {
  website: string;
  password: string;
}
