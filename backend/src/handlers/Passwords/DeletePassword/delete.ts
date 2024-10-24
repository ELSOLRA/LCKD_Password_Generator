import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { AuthorizedEvent } from "../../../interfaces/auth.interface";
import { DeletePasswordRequest } from "../../../interfaces/password.interface";
import { deletePassword } from "../../../services/passwordService";
import { sendError, sendSuccessResponse } from "../../../utils/apiResponse";
import { authMiddleware } from "../../../middleware/auth.middleware";

const deleteHandler = async (event: AuthorizedEvent<DeletePasswordRequest>) => {
  try {
    const userId = event.userId;
    const { website } = event.body;

    if (!website) {
      return sendError(400, "Website is required");
    }

    await deletePassword(userId, website);
    return sendSuccessResponse(200, {
      message: "Password deleted successfully",
    });
  } catch (error) {
    if (error.message.includes("not found")) {
      return sendError(404, "Password not found");
    }
    if (error.message.includes("Not authorized")) {
      return sendError(403, "Not authorized to delete this password");
    }
    return sendError(500, "Unable to delete password");
  }
};

export const handler = middy(deleteHandler, {
  timeoutEarlyInMillis: 0,
})
  .use(jsonBodyParser())
  .use(authMiddleware());
