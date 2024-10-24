import middy from "@middy/core";
import { AuthorizedEvent } from "../../../interfaces/auth.interface";
import {
  UpdatePasswordInput,
  UpdatePasswordRequest,
} from "../../../interfaces/password.interface";
import { updatePassword } from "../../../services/passwordService";
import { sendError, sendSuccessResponse } from "../../../utils/apiResponse";
import jsonBodyParser from "@middy/http-json-body-parser";
import { authMiddleware } from "../../../middleware/auth.middleware";

const updateHandler = async (event: AuthorizedEvent<UpdatePasswordRequest>) => {
  try {
    const userId = event.userId;
    const { password, website } = event.body;

    if (!website || !password) {
      return sendError(400, "Website and password are required");
    }

    const passwordData: UpdatePasswordInput = { password };
    await updatePassword(userId, website, passwordData);

    return sendSuccessResponse(200, { message: "password updated" });
  } catch (error) {
    if (error.message.includes("not found")) {
      return sendError(404, "Password not found");
    }
    if (error.message.includes("Not authorized")) {
      return sendError(403, "Not authorized to delete this password");
    }
    return sendError(500, "Failed to update password");
  }
};

export const handler = middy(updateHandler, { timeoutEarlyInMillis: 0 })
  .use(jsonBodyParser())
  .use(authMiddleware());
