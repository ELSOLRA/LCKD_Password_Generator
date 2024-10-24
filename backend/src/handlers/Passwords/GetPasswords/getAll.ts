import middy from "@middy/core";
import { AuthorizedEvent } from "../../../interfaces/auth.interface";
import { getAllWebsitesAndPasswords } from "../../../services/passwordService";
import {
  sendError,
  sendResponse,
  sendSuccessResponse,
} from "../../../utils/apiResponse";
import { authMiddleware } from "../../../middleware/auth.middleware";

const getAllHandler = async (event: AuthorizedEvent) => {
  try {
    const { userId } = event;

    const passwords = await getAllWebsitesAndPasswords(userId);

    if (passwords.length <= 0) {
      return sendResponse(200, {
        message: "There are no passwords found in database",
      });
    }
    return sendSuccessResponse(200, {
      passwords,
    });
  } catch (error) {
    console.error("Get passwords error:", error);
    return sendError(500, "Unable to retrieve passwords");
  }
};

export const handler = middy(getAllHandler, {
  timeoutEarlyInMillis: undefined,
}).use(authMiddleware());
