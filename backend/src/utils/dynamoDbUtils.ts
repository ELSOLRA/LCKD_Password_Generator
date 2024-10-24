import {
  DeleteCommand,
  DeleteCommandInput,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import dynamoDb from "../services/dynamoDB";
import { DynamoDBRecord } from "../types/api.types";

export const putItem = async <T extends DynamoDBRecord>(
  tableName: string,
  item: T
): Promise<T> => {
  const command: PutCommandInput = {
    TableName: tableName,
    Item: item,
  };
  await dynamoDb.send(new PutCommand(command));
  return item;
};

export const getItem = async <T extends DynamoDBRecord>(
  tableName: string,
  key: Record<string, any>
): Promise<T | null> => {
  const command: GetCommandInput = {
    TableName: tableName,
    Key: key,
  };

  const { Item } = await dynamoDb.send(new GetCommand(command));
  return (Item as T) || null;
};

export const query = async <T extends Record<string, any>>(
  params: QueryCommandInput
): Promise<T[]> => {
  const command = new QueryCommand(params);
  const response = await dynamoDb.send(command);
  return (response.Items || []) as T[];
};

export const scan = async <T extends Record<string, any>>(
  params: ScanCommandInput
): Promise<T[]> => {
  const command = new ScanCommand(params);
  const response = await dynamoDb.send(command);
  return (response.Items || []) as T[];
};

export const updateItem = async <T extends DynamoDBRecord>(
  params: UpdateCommandInput
): Promise<T | null> => {
  const command = new UpdateCommand(params);
  const { Attributes } = await dynamoDb.send(command);
  return (Attributes as T) || null;
};

export const deleteItem = async <T extends DynamoDBRecord>(
  tableName: string,
  key: Record<string, any>
): Promise<T | null> => {
  const params: DeleteCommandInput = {
    TableName: tableName,
    Key: key,
    ReturnValues: "ALL_OLD",
  };

  const { Attributes } = await dynamoDb.send(new DeleteCommand(params));
  return (Attributes as T) || null;
};
