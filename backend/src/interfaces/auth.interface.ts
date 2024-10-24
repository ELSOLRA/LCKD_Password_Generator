import { APIResponse } from "./api.interfaces";

export interface BaseEvent {
  headers: {
    Authorization?: string;
    authorization?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface AuthHandler {
  event: BaseEvent & {
    userId?: string;
  };
}

export interface AuthMiddleware {
  before: (handler: AuthHandler) => Promise<void | APIResponse>;
}

export interface AuthorizedEvent<RequestBody = any> {
  headers: {
    Authorization?: string;
    authorization?: string;
    [key: string]: any;
  };
  body: RequestBody;
  userId: string;
  [key: string]: any;
}
