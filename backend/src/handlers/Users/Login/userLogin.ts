import { APIGatewayProxyEventV2 } from "aws-lambda";
import { LoginInput } from "../../../interfaces/user.interface";
import { loginUser } from "../../../services/userService";
import { sendError, sendSuccessResponse } from "../../../utils/apiResponse";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

const loginHandler = async (
  event: Omit<APIGatewayProxyEventV2, "body"> & { body: LoginInput }
) => {
  try {
    const { username, password } = event.body;

    if (!event.body) {
      return sendError(400, "Missing request body");
    }

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

const middleware = middy(loginHandler, {
  timeoutEarlyInMillis: 0, // disables middy timeout errors
});

export const handler = middleware.use(jsonBodyParser());
