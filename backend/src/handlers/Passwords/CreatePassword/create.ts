import middy from "@middy/core";
import { CreatePasswordInput } from "../../../interfaces/password.interface";
import { AuthorizedEvent } from "../../../interfaces/auth.interface";
import { sendError, sendSuccessResponse } from "../../../utils/apiResponse";
import { createPassword } from "../../../services/passwordService";
import jsonBodyParser from "@middy/http-json-body-parser";
import { authMiddleware } from "../../../middleware/auth.middleware";

const createHandler = async (event: AuthorizedEvent<CreatePasswordInput>) => {
  try {
    const { userId, body } = event;
    if (!userId) {
      return sendError(401, "Unauthorized");
    }
    if (!body) {
      return sendError(400, "Missing request body");
    }

    const newPassword = await createPassword(userId, body);
    return sendSuccessResponse(201, {
      website: body.website,
      password: newPassword,
    });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return sendError(409, error.message);
    }
    return sendError(500, "Failed to create password");
  }
};

export const handler = middy(createHandler, { timeoutEarlyInMillis: 0 })
  .use(jsonBodyParser())
  .use(authMiddleware());
