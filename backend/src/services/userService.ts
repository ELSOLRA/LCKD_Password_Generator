import { v4 as uuid } from "uuid";
import CryptoJs from "crypto-js";
import * as dynamoDbUtils from "../utils/dynamoDbUtils";
import {
  User,
  CreateUserInput,
  LoginInput,
  UserResponse,
} from "../interfaces/user.interface";
import { generateToken } from "../utils/jwt";

const usersTable = process.env.USERS_TABLE as string;
const encryptionKey = process.env.ENCRYPTION_KEY as string;

const encryptPsw = (password: string): string => {
  return CryptoJs.AES.encrypt(password, encryptionKey).toString();
};

const decryptPsw = (encryptedPsw: string): string => {
  const bytes = CryptoJs.AES.decrypt(encryptedPsw, encryptionKey);
  return bytes.toString(CryptoJs.enc.Utf8);
};

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const params = {
      TableName: usersTable,
      IndexName: "UsernameIndex",
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
    };

    const user = await dynamoDbUtils.query<User>(params);
    return user[0] || null;
  } catch (error) {
    throw new Error("Error fetching user by username");
  }
};

export const signupUser = async ({
  username,
  password,
}: CreateUserInput): Promise<Omit<User, "password">> => {
  try {
    const userId = uuid();
    const existingUsername = await getUserByUsername(username);
    if (existingUsername) {
      throw new Error("Username already exists");
    }
    const encryptedPsw = encryptPsw(password);

    const user: User = {
      userId,
      username,
      password: encryptedPsw,
    };

    await dynamoDbUtils.putItem<User>(usersTable, user);
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error("Database error: failed to create user");
  }
};

export const loginUser = async ({
  username,
  password,
}: LoginInput): Promise<UserResponse> => {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    const decryptedPsw = decryptPsw(user.password);

    if (password !== decryptedPsw) {
      throw new Error("Invalid password");
    }

    const token = generateToken(user.userId);
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    throw new Error("Login error");
  }
};
