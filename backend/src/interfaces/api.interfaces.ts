import { JwtPayload } from "jsonwebtoken";

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
