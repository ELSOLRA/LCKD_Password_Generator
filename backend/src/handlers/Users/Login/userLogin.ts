import { APIGatewayProxyEventV2 } from "aws-lambda";
import { LoginInput } from "../../../interfaces/user.interface";
import { loginUser } from "../../../services/userService";
import { sendError, sendSuccessResponse } from "../../../utils/apiResponse";
import middy from "@middy/core";

const loginHandler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { username, password }: LoginInput = JSON.parse(event.body || "{}");
    const data = await loginUser({ username, password });
    return sendSuccessResponse(200, {
      token: data.token,
      userId: data.user.userId,
    });
  } catch (error) {
    if (
      error.message === "User not found" ||
      error.message === "Invalid password"
    ) {
      return sendError(401, "Invalid credentials");
    }
    return sendError(500, "Login failed");
  }
};

export const handler = middy(loginHandler);
