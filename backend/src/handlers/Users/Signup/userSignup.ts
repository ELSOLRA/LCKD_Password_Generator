import { APIGatewayProxyEventV2 } from "aws-lambda";
import { CreateUserInput } from "../../../interfaces/user.interface";
import { signupUser } from "../../../services/userService";
import { sendError, sendSuccessResponse } from "../../../utils/apiResponse";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

const signupHandler = async (
  event: Omit<APIGatewayProxyEventV2, "body"> & { body: CreateUserInput }
) => {
  try {
    const { username, password } = event.body; /* JSON.parse(
      event.body || "{}"
    ); */
    if (!event.body) {
      return sendError(400, "Missing request body");
    }

    const newUser = await signupUser({ username, password });

    return sendSuccessResponse(201, {
      message: `User ${newUser.username} created successfully`,
      user: newUser,
    });
  } catch (error) {
    console.error("Handler error:", error);
    if (error.message === "Username already exists") {
      return sendError(409, "Username already exists");
    }
    if (error.message.includes("Database error")) {
      return sendError(500, "Failed to create user due to a database error");
    }

    return sendError(500, "Internal server error");
  }
};

const middleware = middy(signupHandler, {
  timeoutEarlyInMillis: 0, // disables middy timeout errors
});

export const handler = middleware.use(jsonBodyParser());
