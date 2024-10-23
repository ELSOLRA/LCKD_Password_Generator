import { AuthHandler, AuthMiddleware } from "../interfaces/auth.interfaces";
import { sendError } from "../utils/apiResponse";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (): AuthMiddleware => ({
  before: async (handler: AuthHandler) => {
    try {
      const authHeader =
        handler.event.headers.Authorization ||
        handler.event.headers.authorization;
      if (!authHeader) {
        return sendError(401, "Authorization header is missing");
      }
      const token = authHeader.replace("Bearer ", "").trim();

      if (!token) {
        return sendError(401, "Token is missing");
      }
      try {
        const decodedData = verifyToken(token);
        handler.event.userId = decodedData.userId;
      } catch (error) {
        return sendError(401, "Invalid token");
      }
    } catch (error) {
      return sendError(500, "Authentication error");
    }
  },
});
