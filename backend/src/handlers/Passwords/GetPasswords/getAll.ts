import middy from "@middy/core";
import { AuthorizedEvent } from "../../../interfaces/auth.interface";
import { getAllWebsitesAndPasswords } from "../../../services/passwordService";
import { sendError, sendSuccessResponse } from "../../../utils/apiResponse";
import { authMiddleware } from "../../../middleware/auth.middleware";

const getAllHandler = async (event: AuthorizedEvent) => {
  try {
    const { userId } = event;

    const passwords = await getAllWebsitesAndPasswords(userId);
    return sendSuccessResponse(200, {
      passwords,
      count: passwords.length,
    });
  } catch (error) {
    console.error("Get passwords error:", error);
    return sendError(500, "Unable to retrieve passwords");
  }
};

export const handler = middy(getAllHandler, {
  timeoutEarlyInMillis: undefined,
}).use(authMiddleware());
