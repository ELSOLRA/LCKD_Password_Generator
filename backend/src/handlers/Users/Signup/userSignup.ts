import { APIGatewayProxyEventV2 } from "aws-lambda";
import { CreateUserInput } from "../../../interfaces/user.interface";
import { signupUser } from "../../../services/userService";
import { sendError, sendSuccessResponse } from "../../../utils/apiResponse";
import middy from "@middy/core";

const signupHandler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { username, password }: CreateUserInput = JSON.parse(
      event.body || "{}"
    );
    const newUser = await signupUser({ username, password });
    return sendSuccessResponse(201, {
      message: `User ${newUser.username} created successfully`,
      user: newUser,
    });
  } catch (error) {
    if (error.message === "Username already exists") {
      return sendError(409, "Username already exists");
    }
    if (error.message.includes("Database error")) {
      return sendError(500, "Failed to create user due to a database error");
    }
    return sendError(500, "Internal server error");
  }
};

export const handler = middy(signupHandler);
