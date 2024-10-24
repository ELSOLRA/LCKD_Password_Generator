import * as dynamoDbUtils from "../utils/dynamoDbUtils";
import {
  CreatePasswordInput,
  Password,
  UpdatePasswordInput,
} from "../interfaces/password.interface";
import { decryptData, encryptData } from "../utils/encryptionUtils";

const passwordsTable = process.env.PASSWORDS_TABLE as string;

export const getPasswordByWebsite = async (
  userId: string,
  website: string
): Promise<Password | null> => {
  try {
    const password = await dynamoDbUtils.getItem<Password>(passwordsTable, {
      userId,
      website,
    });

    if (password) {
      password.password = decryptData(password.password);
    }

    return password;
  } catch (error) {
    throw new Error("Failed to get password");
  }
};

export const createPassword = async (
  userId: string,
  { website, username, password }: CreatePasswordInput
): Promise<Password> => {
  try {
    const existingPassword = await getPasswordByWebsite(userId, website);
    if (existingPassword) {
      throw new Error("Password for this website already exists");
    }
    const encryptedPassword = encryptData(password);

    const newPassword: Password = {
      userId,
      website,
      username,
      password: encryptedPassword,
    };

    await dynamoDbUtils.putItem<Password>(passwordsTable, newPassword);
    return newPassword;
  } catch (error) {
    throw new Error("Failed to create password");
  }
};

export const getAllWebsitesAndPasswords = async (
  userId: string
): Promise<{ website: string; password: string }[]> => {
  try {
    const params = {
      TableName: passwordsTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const passwords = await dynamoDbUtils.query<Password>(params);

    return passwords
      .map(({ website, password }) => ({
        website,
        password: decryptData(password),
      }))
      .sort((a, b) => a.website.localeCompare(b.website));
  } catch (error) {
    throw new Error("Failed to fetch passwords:");
  }
};

export const updatePassword = async (
  userId: string,
  website: string,
  updates: UpdatePasswordInput
): Promise<Password> => {
  try {
    const existingPassword = await getPasswordByWebsite(userId, website);
    if (!existingPassword) {
      throw new Error("Password not found");
    }

    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    if (updates.username) {
      updateExpressions.push("#username = :username");
      expressionAttributeNames["#username"] = "username";
      expressionAttributeValues[":username"] = updates.username;
    }

    if (updates.password) {
      updateExpressions.push("#password = :password");
      expressionAttributeNames["#password"] = "password";
      expressionAttributeValues[":password"] = encryptData(updates.password);
    }

    const params = {
      TableName: passwordsTable,
      Key: {
        userId,
        website,
      },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const updated = await dynamoDbUtils.updateItem<Password>(params);
    if (!updated) {
      throw new Error("Failed to update password");
    }
    updated.password = decryptData(updated.password);
    return updated;
  } catch (error) {
    throw new Error("Failed to update password");
  }
};

export const deletePassword = async (
  userId: string,
  website: string
): Promise<void> => {
  try {
    await dynamoDbUtils.deleteItem(passwordsTable, { userId, website });
  } catch (error) {
    throw new Error(`Failed to delete password: ${error.message}`);
  }
};
