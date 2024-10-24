import { APIResponse } from "../interfaces/api.interfaces";
import { ResponseData } from "../types/api.types";

export const sendResponse = <T>(
  statusCode: number,
  data: ResponseData<T>
): APIResponse => ({
  statusCode,
  body: JSON.stringify({ ...data }),
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendSuccessResponse = <T>(
  statusCode: number,
  data: ResponseData<T>
): APIResponse => ({
  statusCode,
  body: JSON.stringify({ success: true, ...data }),
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendError = (
  statusCode: number,
  message: string
): APIResponse => ({
  statusCode,
  body: JSON.stringify({ success: false, error: message }),
  headers: {
    "Content-Type": "application/json",
  },
});
