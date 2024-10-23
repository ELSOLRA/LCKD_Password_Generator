import { APIResponse } from "./api.interfaces";

export interface AuthHandler {
  event: {
    headers: {
      Authorization?: string;
      authorization?: string;
      [key: string]: any;
    };
    userId?: string;
    [key: string]: any;
  };
}

export interface AuthMiddleware {
  before: (handler: AuthHandler) => Promise<void | APIResponse>;
}
