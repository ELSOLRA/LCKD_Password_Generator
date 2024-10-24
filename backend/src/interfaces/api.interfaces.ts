import { JwtPayload } from "jsonwebtoken";

export interface Password {
  userId: string;
  website: string;
  username: string;
  password: string;
}

export interface APIResponse {
  statusCode: number;
  body: string;
  headers?: {
    "Content-Type": string;
    [key: string]: string;
  };
}

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
}
